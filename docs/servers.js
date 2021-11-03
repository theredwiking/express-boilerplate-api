const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    servers:[
        {
            url: `http://localhost:${process.env.PORT}/`,
            description: "Local server",
        },
    ],
};
