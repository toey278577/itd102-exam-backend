const db = require("../model");
const Student = db.students;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body.name){
        res.status(400).send({
            message: "Content cannot be empty!"
        })
        return;
    }

    const tutorial = {
        id: req.body.id,
        studentsID: req.body.studentsID,
        name: req.body.name,
        lastname: req.body.lastname,
        univercity: req.body.univercity,
        education: req.body.education ? req.body.education : false
    }

    Student.create(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message: "Error 500!"
            });
        });
};

exports.findAll = (req, res) => {
    const name = req.body.name;
    var condition = name ? {name: {[Op.like]: `%${name}%`}} : null;

    Student.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred!"
            });
        });

};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Student.findByPk(id)
        .then(data => {
            if(data){
                res.send(data);
            }else{
                res.status(404).send({
                    //message: `Error 404 ${id}`
                    message: "Error 404" + id
                });
            }
        })
        .catch(error => {
            res.status(500).send({
                message: "Error 500" + id
            });
        });
};

exports.findAllPublished = (req, res) => {
    Student.findAll({ where: { published: true }})
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message: "Error 500"
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;
    Student.update(req.body, {where: {id:id}})
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Updated successfully."
                });
            }else{
                res.send({
                    message: "Updated failed!"
                });
            }
        })
        .catch(error => {
            res.status(500).send({
                message: "Error update!"
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Student.destroy({ where: {id:id}})
    .then(num => {
        if(num == 1){
            res.send({
                message: "Deleted successfully."
            })
        }else{
            res.send({
                message: "Delete failed!"
            })
        }
    })
    .catch(error => {
        res.status(500).send({
            message: "Error deleted 500"
        });
    });
};

exports.deleteAll = (req, res) => {
    Student.destroy({
        where:{},
        truncate: false
    })
    .then(num => {
        res.send({ message: "Deleted succesfully."});
    })
    .catch(error => {
        res.status(500).send({
            message: "Error 500!"
        })
    });
};