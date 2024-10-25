const express = require('express');
const router = express.Router();
const { UserLike } = require('../db/models');
const { User } = require('../db/models');


router.post('/likes', async (req, res) => {
    const { userId, cocktailId, cocktailName, cocktailImageUrl } = req.body;

    try {
        const [like, created] = await UserLike.findOrCreate({
            where: { userId, cocktailId },
            defaults: { cocktailName, cocktailImageUrl },
        });

        if (created) {
            res.status(201).json({ message: 'Cocktail liked!' });
        } else {
            res.status(200).json({ message: 'Cocktail already liked!' });
        }
    } catch (err) {
        console.error('Error details:', err); 
        res.status(500).json({ message: 'Error liking cocktail', error: err.message });
    }
});


router.delete('/likes/:cocktailId', async (req, res) => {
    const { userId } = req.body; 
    const { cocktailId } = req.params;

    try {
        const deleted = await UserLike.destroy({
            where: { userId, cocktailId },
        });

        if (deleted) {
            res.status(200).json({ message: 'Cocktail unliked!' });
        } else {
            res.status(404).json({ message: 'Cocktail not found in likes' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error unliking cocktail' });
    }
});

module.exports = router;
