const mongoose = require('mongoose');
exports.connect = () => {
mongoose.connect(
    'mongodb://localhost:27017/gl_db',
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