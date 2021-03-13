const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports.verifyJwtToken = (req, res, next) => {
    var token;
    if ('authorization' in req.headers)
    {
        console.log('autorization exists')
        token = req.headers['authorization'].split(' ')[1];
        console.log('autorization exists', token)

    }

    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    else {
        jwt.verify(token, process.env.SECRET_KEY,
            (err, decoded) => {
                if (err)
                {
                    console.log(err)
                    return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
                }
                else {
                    console.log("decoded header =", decoded)
                    req._id = decoded._id;
                    next();
                }
            }
        )
    }
}