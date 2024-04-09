const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (await User.findOne({ email })) {
            return res.status(409).json({ message: 'Email already in use, please chose another email' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role: 'user'  // all users get user as defaukt
        });
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ token, userId: newUser._id, username: newUser.username, role: newUser.role });
    } catch (error) {
        res.status(500).json({ message: 'an error occured: ', error: error.toString() });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'user non existing, sign up maybe ;)' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'wrong password, try again :)' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, userId: user._id, username: user.username, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'login error :(', error: error.toString() });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'error fetching users :(', error: error.toString() });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'user non existing' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'error fetching user', error: error.toString() });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'user non existing' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'error updating user :(', error: error.toString() });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'user already  not here with us :)' });
        }
        res.status(204).json({ message: 'deleted ;) hihi' });
    } catch (error) {
        res.status(500).json({ message: 'error deleting user', error: error.toString() });
    }
};
