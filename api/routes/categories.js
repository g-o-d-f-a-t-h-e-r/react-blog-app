const router = require("express").Router();
const Category = require('../models/Category');


router.post('/', async(req, res) => {
    const newCat = new Category(req.body);

    try {
        
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
        
    } catch (error) {
        res.status(500).json(error);
    }

})

router.put('/', async(req, res) => {
    try {
        const clicks = await Category.updateMany(
            {"name" : req.body.name},
            {$inc : {"clicks" : req.body.inc}},
            {upsert: true}
        )

        res.status(200).json(clicks)
        
    } catch (error) {
        res.status(500).json(error);
    }
})


router.get('/', async(req, res) => {

    try {
        
        const cats = await Category.find().sort({clicks : -1, createdAt : -1}).limit(14);
        res.status(200).json(cats);

    } catch (error) {
        res.status(500).json(error);
    }

})

module.exports = router;