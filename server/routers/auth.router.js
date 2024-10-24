const authRouter = require('express').Router();
const { User } = require('../db/models/');
const bcrypt = require('bcrypt');
const generateToken = require('../src/utils/generateToken');
const cookieConfig = require('../configs/cookieConfig');

authRouter.post('/signup', async (req, res) => {

    const { username, email, password } = req.body;

    try {
        const [user, isCreated] = await User.findOrCreate({
            where: {
                email,
            },
            defaults: {
                username,
                email,
                password: await bcrypt.hash(password, 10),
            },
        });

        if (!isCreated) {
            res.status(400).json({ message: 'User already exist' });
        } else {
            const plainUser = user.get();
            delete plainUser.password;

            const { accessToken, refreshToken } = generateToken({ user: plainUser });

            res
                .cookie('refreshToken', refreshToken, cookieConfig.refresh)
                .json({ user: plainUser, accessToken });
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
});

authRouter.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Найти пользователя по email
        const user = await User.findOne({ where: { email } });

        // Проверка, существует ли пользователь
        if (!user) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        // Сравнить введенный пароль с паролем из базы данных
        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        const plainUser = user.get();
        delete plainUser.password;

        const { accessToken, refreshToken } = generateToken({ user: plainUser });

        return res
            .cookie('refreshToken', refreshToken, cookieConfig.refresh)
            .json({ user: plainUser, accessToken });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

authRouter.get('/logout', (req, res) => {
    try {
        res.clearCookie('refreshToken').sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
});

module.exports = authRouter;