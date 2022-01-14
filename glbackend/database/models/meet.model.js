const mongoose = require("mongoose"),

    meetSchema = new mongoose.Schema({
        module : {
            type : String,
            required : true,
        },
        date : {
            type : Date,
            required : true,
        },

        student : { type : mongoose.Types.ObjectId, ref : "student"},
    })



    meetSchema.statics = {
        create : function(data, callback){
            try{
                var user = new this(data)
                user.save(callback)
            }catch(e){
                console.log("could not create a user in user.model !!!\nERROR :")
                console.error(e);
            }
        },

        get : async function(data, callback){
            try{
                await this.find(data).populate("tasks")
                .exec(callback)
            }catch(e){
                console.log("could not get a user in user.model !!!\nEROOR :");
                console.error(e);
            }
        },

        update : async function(data, newData, callback){
            try{
                await this.findOneAndUpdate(data, {$set : newData},{new : true, omitUndefined : true}, callback)
            }catch(e){
                console.log("could not update the user in user.model !!!\n ERROR : ");
                console.error(e);
            }
        },

        delete : async function(data, callback){
            try{
                await this.deleteOne(data, callback)
            }catch(e){
                console.log("could not delete the user in user.model !!!\n ERROR : ");
                console.error(e);
            }
        },
    }



    module.exports = mongoose.model('meet', meetSchema)