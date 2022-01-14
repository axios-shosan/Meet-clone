const Student = require('./student.model');
const jwt = require("jsonwebtoken")

exports.createStudent = function(req, res){
    console.log(req.body);
    const {matricule, firstName, secondName, password} = req.body
    Student.create({matricule, firstName, secondName, password}, function(err, Student){
        if(err){
            return res.json({
                error : err
            })
        }
        return res.json({
            message : "user created !",
            Student : Student
        })
    }) 
}

exports.login =async function(req, res){
    const {matricule, password} = req.body
    const student = await Student.findOne({matricule})

    if(await student.comparePasswords(password)){
        console.log("everything is fine");
        student.token = jwt.sign(
            {
                id : student._id,
                matricule : student.matricule
            },
            'secret key',
            {
                expiresIn : '3h'
            }
        )
        return res.json({
            message : "user is logged in",
            token : student.token,
            id : student._id,
            firstname : student.firstName,
            secondname : student.secondName,
        })
    }
    else
        res.status(401).json({
            message : "wrong password",
        })
}

exports.getAllstudents = function(req, res){
    Student.get({}, function(err, Students){
        if (err)
            res.status(400).json({
                message : err
            })
        res.json({
            Students : Students
        })
    })
}

exports.getstudentBymatricule = function(req, res){
    const matricule = req.query.matricule
    Student.get({matricule}, function(err, Student){
        if (err)
            res.status(400).json({
                message : err
            })
        res.json({
            message : "success",
            Student : Student
        })
    })
}

exports.deleteOneStudent = function (req, res){
    const matricule = req.body.matricule
    Student.delete({matricule}, function(err, Student){
        if (err)
            res.status(400).json({
                message : err
            })
        res.json({
            message : "user deleted successfully, check the users list !"
        })
    })
}

