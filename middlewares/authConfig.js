
module.exports = (config, fieldName = 'jwtConfig') => {
    return (req, res, next) => {
        req[fieldName] = config;
        next();
    };
};