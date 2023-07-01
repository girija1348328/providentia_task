const userModel = require("../models/userModel")
const validate = require("../validator/validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const createUser = async function (req, res, next) {
    try {
        const data = req.body;

        // Create a new user
        const user = await userModel.create(data);
        // Save the user to the database
        res.status(201).json(user);
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });

    }
}

const login = async function (req, res){
    try {
        const data = req.body;
        if (validate.isEmptyVar(data)) {
            return res.status(400).send({
                status: false,
                message: "Login BODY must be required!",
            });
        }
        let { email, password } = data;
      
        // Basic validations
        if (validate.isEmptyVar(email)) {
            return res.status(400).send({
                status: false,
                message: "email must be required!",
            });
        }
        if (validate.isEmptyVar(password)) {
            return res.status(400).send({
                status: false,
                message: "Password must be required!",
            });
        }

        // DB call for login and validation
        const user = await userModel.findOne({ email });


        if (!user) {
            return res
                .status(404)
                .send({ status: false, message: `Wrong email or Password!` });
        }
      

        // Verify the password
        const verify = await bcrypt.compare(password, user.password);
        console.log(verify)
        if (!verify) {
            return res
                .status(401)
                .send({ status: false, message: `Wrong email or Password!` });
        }

        // Generate token (expires in 10 hours)
        const Token = jwt.sign(
            {
                userId: user._id,
            },
            'secret',
            {
                expiresIn: '10h',
            }
        );
       
        // All good
        res.status(200).send({
            status: true,
            message: `User Logged-in Successfully!`,
            data: {
                userId: user._id,
                token: Token,
            },
        });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};

module.exports = { createUser,login }