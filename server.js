const express = require('express');
const orm = require('./orm');

const app = express();

app.use(function(req, res, next) {
    req.requestId = Date.now();
    next();
})

app.get('/', function(req, res, next) {
    orm.selectBurgers()
        .then(() => {
            //should never get here
        })
        .catch((err) => {
            next(err);
        });
});

app.get('/another', (req, res, next) => {
    next(new Error('error 2'))
});

// my error middleware
app.use(function(err, req, res, next) {
    console.error('We had an error.', err);
    res.status(500).json({
        requestId: req.requestId,
        message: err.message
    });
});

app.listen(8080, () => {
    console.log('server running on http://localhost:8080');
});