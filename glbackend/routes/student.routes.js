const express = require("express"),
    studentControllers = require('../database/models/student.controller'),
    {isLoggedIn} = require("../middleware/auth"),
    router = express.Router();


    router.post('/signup',studentControllers.createStudent);
    router.post('/login', studentControllers.login);
    // router.get('/users',isLoggedIn ,getAllusers)
    // router.get('/user', getUserByUsername)
    // router.delete('/deleteUser', deleteOneUser)
    // router.put('/updateUser',updateUser)
module.exports = router;