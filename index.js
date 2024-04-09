const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const gameRoutes = require('./routes/games');
const playerRoutes = require('./routes/players');
const userRoutes = require('./routes/users');
const errorHandler = require('./middlewares/errorHandler');
const config = require('./config/config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

mongoose.connect(config.db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.use('/api/games', gameRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});

const PORT = config.port || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
