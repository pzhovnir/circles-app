const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const Post = sequelize.define('posts', {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
    });

    Post.associate = ({ User }) => {
        Post.belongsTo(User);
    };

    return Post;
};
