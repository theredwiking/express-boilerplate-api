# express-boilerplate-api
## Description
express-boilerplate-api is a quick way to get started on a api project.

## Get started
```bash
npx express-boilerplate-api express-api
```

This will create a project folder called express-api.

Code structur is:
* express-api
	* controllers
	* routes
	* mysql.js
	* server.js
	* .env

To start in developer mode type:
```bash
npm run dev
```
This is based on nodemon and will reload when a file is saved

## Routes
A routes file shout look like this:
```js
const express = require('express');
const example = require('../controllers/example');

const router = express.Router();

router.post('/post', (req, res) => {
	example.post(req, res);
});

router.get('/get', (req, res) => {
    example.get(req, res);
});

module.exports = router;
```

## Controllers
A components file shout look like this:
```js
const db = require('../mysql');

const Example = {
    post: function(req, res){
		let body = req.body;
        try {
            await db.query('INSERT INTO test(name, email) VALUES (?, ?)', [
                body.name,
                body.email
            ]);
            res.status(201).send({Message: 'Successfully created new user'});
        } catch (e) {
            res.status(500).send({Error: 'A error occurred'});
        }
    },
    get: function(req, res){
        db.query('SELECT * FROM test', (err, result) => {
            if (err) res.status(500).send({Error: err});
            res.status(200).send(result);
        });
    }
}

module.exports = Example;

```

## Server.js
Adding a routes file to server.js
```js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const test = require('./routes/example.routes');

app.get('/', (req, res) => {
    res.send({Obi_Wan: "Hello there", Grievous: "General Kenobi"});
});

app.use('/example', test);

app.listen(port, () => {
    console.log('port: 3000');
});
```
