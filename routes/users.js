const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const { Router } = require('express');

router.get(`/`, (req,res) => {
    res.status(200).send({ message: `Hola sebastian `});
});

router.post('/register', async (req, res)=>{
    const { name, email, mobile, password, userType } = req.body;
    let user = new User({
        name,
        email,
        mobile,
        password,
        userType,
    });
    console.log(req.body);

    try {
        user = await user.save();
        res.status(201).send(user);
    } catch (error) {
        if (error.code === 11000) {
            // Este código de error indica una violación del índice único
            res.status(400).send({ message: 'El correo electrónico ya está en uso' });
        } else {
            console.error('Error al crear el usuario:', error);
            res.status(500).send({ message: 'Error del servidor', error });
        }
    }
})

module.exports = router;