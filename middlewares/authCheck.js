const jwt = require('jsonwebtoken');
const { failedResponse } = require('../utils/response');

module.exports = (fieldName = 'Session') => {
    return (req, res, next) => {
        const { headers, jwtConfig } = req;

        if (headers.authorization) {
            jwt.verify(headers.authorization, jwtConfig.secret, (err, user) => {
                if (err) {
                    return res.sendStatus(403).json(failedResponse(err.message));
                }

                req[fieldName] = user;
                next();
            });
        } else {
            res.sendStatus(401).json(failedResponse('You are unauthorized'));
        }
    }
}