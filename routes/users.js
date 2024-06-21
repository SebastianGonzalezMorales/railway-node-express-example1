const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const { Router } = require('express');


router.get(`/`, (req,res) => {
    res.status(200).send({ message: `Hola sebastian `});
});

router.post('/register', async (req, res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
        userType: req.body.userType,
    })
    console.log(req.body);

    try {
        user = await user.save();
        if (!user) {
            return res.status(400).send('The user cannot be created!');
        }
        res.send(user);
    } catch (error) {
        if (error.code === 11000) {
            // Este código de error indica una violación del índice único
            res.status(400).send({ message: 'El correo electrónico ya está en uso' });
        } else {
            res.status(500).send({ message: 'Error del servidor', error });
        }
    }
})


module.exports = router;