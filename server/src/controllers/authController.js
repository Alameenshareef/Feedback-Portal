const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const User = require('../models/user')


const createToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '3d' }
    )
}


exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role })
        const token = createToken(user)
        res.status(201).json({ user: { id: user._id, name, role }, token });
    } catch (error) {
        res.status(400).json({ error: 'Email already in use or invalid data' });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email });
        if (!user) throw Error('Incorrect email');
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw Error('Incorrect password');
        const token = createToken(user);
        res.status(200).json({ user: { id: user._id, name: user.name, role: user.role }, token });

    } catch (error) {

        res.status(401).json({ error: error.message });
    }
}



