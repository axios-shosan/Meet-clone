const mongoose = require('mongoose');
exports.connect = () => {
mongoose.connect(
    process.env.mongodburl,
    {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(()=>{
        console.log("database has connected successfully");
    })
    .catch(err => {
        console.log('database failed to connect !!!\nERR : ');
        console.error(err)
    })

    mongoose.connection.on('disconnected', ()=> console.log('the database has disconnected') )

}