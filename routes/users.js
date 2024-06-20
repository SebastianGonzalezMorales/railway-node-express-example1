const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const { Router } = require('express');


router.get(`/`, (req,res) => {
    res.status(200).send({ message: `Hola sebastian `});
});

router.post(`/`, async (req, res) =>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,

    })
    user = await user.save();
    if (!user) 
        return res.status(400).send('the user cannot be created!')   
    res.send(user);
})


router.post('/register', async (req, res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,

    })
    console.log(req.body);

    user = await user.save();
    if (!user)
        return res.status(400).send('The user cannot be created !')
    res.send(user);
})


module.exports = router;