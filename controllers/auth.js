const bcrypt = require("bcryptjs");
const { successResponse, failedResponse } = require('../utils/response');

const SignUp = async (req, res) => {
    const { username, email, password } = req.body;
    const { User } = req.models;

    try {
        const newUser = await User.create({
            username,
            email,
            password: bcrypt.hashSync(password, 8)
        });
        return res.send(successResponse(newUser));
    } catch (err) {
        return res.status(500).send(failedResponse({ message: err.message }));
    }
}


const SignIn = async (req, res) => {

}

module.exports = {
    SignUp,
    SignIn,
};