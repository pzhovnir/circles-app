const jwt = require('jsonwebtoken');

const { successResponse, failedResponse } = require('../utils/response');

const SignUp = async ({ body, Models }, res) => {
    const { username, email, password } = body;
    const { User } = Models;

    try {
        const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: {
                username,
                email,
                password,
            }
        });

        if (created) return res.send(successResponse(user));
        else return res.send(failedResponse({ message: 'the user with such an email is already registered' }))
    } catch (err) {
        return res.status(500).send(failedResponse({ message: err.message }));
    }
}

const SignIn = async ({ body, Models, jwtConfig }, res) => {
    const { secret, expiresIn } = jwtConfig;
    const { email, password } = body;
    const { User } = Models;

    try {
        const user = await User.findOne({ where: { email, password }});

        if (user) {
            const { id, email } = user;

            const accessToken = jwt.sign({ id, email }, secret, { expiresIn });

            console.log(user);
            return res.send(successResponse({ accessToken }));
        } else {
            throw new Error('there is no user with such email');
        }
    } catch (err) {
        return res.send(failedResponse({ message: err.message }));
    }
}

module.exports = {
    SignUp,
    SignIn,
};
