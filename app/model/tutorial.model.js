module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
        studentID: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        univercity: {
            type: Sequelize.STRING
        },
        education: {
            type: Sequelize.BOOLEAN
        },
    });

    return Student;
};