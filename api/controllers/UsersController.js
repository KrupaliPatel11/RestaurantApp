const uuid = require('uuid-random')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
module.exports = {
    // User signup
    signup: async (req, res) => {
        const { UserName, email, password, address, mobile, role } = req.body
        if (!UserName || !email || !password || !address || !mobile) {
            return res.send({ Error: "Please fill in the required field" })
        }
        if (!(/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/).test(String(req.body.email))) {
            return res.send({ Error: 'Please Enter Valid Email' });
        }
        if(mobile.length !== 10) {
            return res.send({Error  :"Mobile number must be 10 character long"})
        }
        else {
            const users = await Users.find({ email: email })
            // console.log(users);
            if (users.length >= 1) {
                return res.send({ Error: "Email Is Already Exists" })
            }
            else if (password.length < 6) {
                return res.send({ Error: "Password length should be SIX character" })
            }
            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                if (err) {
                    return res.serverError(err)
                } else try {
                    const user = await Users.create({
                        id: uuid(),
                        UserName: UserName,
                        email: email,
                        password: hash,
                        address: address,
                        mobile: mobile,
                        role: role
                    })
                        .fetch()
                    return res.send({
                        Success: "User Created",
                        user: user
                    })
                } catch (err) {
                    return res.send(err)
                }
            })
        }
    },

    // User login
    login: async (req, res) => {
        const { email, password } = req.body

        const user = await Users.findOne({ email: email })

        if (!user) {
            return res.send({ Error: "Email is invalid" })
        }
        if (user) {
            bcrypt.compare(password, user.password, (err, results) => {
                if (err) {
                    return res.send({ FAILED: "Auth Failed" })
                }
                if (results) {
                    const token = jwt.sign({
                        uuid: user.id,
                        role : user.role
                    },
                        process.env.JWT_KEY
                        ,
                        {
                            expiresIn: "4h"
                        });
                    Users.update({ email: req.body.email }, { token: token }).exec(() => { })
                    return res.send({ Success: "Auth Successful", token: token })
                }
                res.send({ Error: "User Not Found " })
            })
        }
    },

    //  User logout
    logout: async (req, res) => {
        let user = req.userData.uuid;
        await Users.update(user, { token: "" }).exec(() => { })
        res.send({ Success: "User Logout" })
    },
}