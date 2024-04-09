const cors = require('cors');

app.use(cors()); // for now all are welcome to make requests
/*
app.use(cors({
    origin: 'https://www.trustworthypeople.com', // only this domain can make requests
    methods: ['GET', 'POST'], // put, patch, etc are not permitter , just get and post // pretty cool :)
    allowedHeaders: ['Content-Type', 'Authorization'] // alloww only these headers
}));

*/