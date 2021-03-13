// const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios');

module.exports.register = (req, res, next) => {
    const { email, password } = req.body;
    console.log('authenticate is hit', email, '', password);
    bcrypt.hash(password, 10, function(err, hash) {
        if(err)
        {
            res.status(401).json({message:'user didnot added'})
        }
        let payload = { email: email, password: hash };
        axios.post('http://localhost:3000/Users', payload)
        .then(async function (response) {
            console.log('added user to db')
            response.status(200).json({message:'user added successfully'})
        })
        .catch(function (error) {
            // handle error
            // console.log(error);
        })
    }); 
}

module.exports.authenticate = async (req, res, next) => {
    // call for passport authentication
    // passport.authenticate('local', (err, user, info) => {       
    //     // error from passport middleware
    //     if (err) return res.status(400).json(err);
    //     // registered user
    //     else if (user) return res.status(200).json({ "token": user.generateJwt() });
    //     // unknown user or wrong password
    //     else return res.status(404).json(info);
    // })(req, res);
    const { email, password } = req.body;
    console.log('authenticate is hit', email, '', password);

    if (!email || !password) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }


    axios.get('http://localhost:3000/Users')
        .then(async function (response) {
            // handle success
            console.log(response.data);
            const isMatch = await bcrypt.compare(password.toString(), response.data[0].password.toString());

            if (!isMatch) {
                return res.status(400).json({ msg: 'password did not match' });
            }
            else {
                const payload = {
                    user: {
                        email,
                        password
                    },
                };

                jwt.sign(
                    payload,
                    process.env.SECRET_KEY,
                    {
                        expiresIn: 360000,
                    },
                    (err, token) => {
                        if (err) throw err;
                        console.log('token is ', token)
                        res.json({ "loggedin-token": token });
                    },
                );
            }

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

}

module.exports.userProfile = (req, res, next) => {
    console.log('userProfile is hit', req.query);
    axios.get(`http://localhost:3000/medicaldata?patientid=demo`) // we can here use req.query.userId
        .then(async function (response) {
            // handle success
            console.log(response.data);
            res.status(200).json(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            res.status(400).json({message: 'error happened', details: error});
        })
}