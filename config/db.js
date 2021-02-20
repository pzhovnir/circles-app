module.exports = {
    host: "localhost",
    user: "circles-app",
    password: "123456",
    database: "circles_db",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};