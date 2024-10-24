const tokensRouter = require('express').Router();
const cookieConfig = require('../configs/cookieConfig');
const { verifyRefreshToken } = require('../middleware/verifyToken');
const generateToken = require('../src/utils/generateToken');



tokensRouter.get('/refresh', verifyRefreshToken, (req, res) => {
    try {
        const { user } = res.locals;
        const { accessToken, refreshToken } = generateToken({ user });

        res
            .cookie('refreshToken', refreshToken, cookieConfig.refresh)
            .json({ user: user, accessToken });
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
});

module.exports = tokensRouter;