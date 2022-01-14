const mongoose = require("mongoose"),
    bcrypt = require("bcrypt"),

    studentSchema = new mongoose.Schema({
        firstName : {
            type : String,
            required : true,
        },
        secondName : {
            type : String,
            required : true,
        },
        password : {
            type : String,
            required : true
        },

        meets : [{ type : mongoose.Types.ObjectId, ref : "meet"}],
        messages : [{type : mongoose.Types.ObjectId, ref : "message"}]
    })

    studentSchema.pre('save', async function (next){
        try{
            if(this.isNew)
                this.password = await bcrypt.hash(this.password, 10)
            next()
        }catch(err){
            next(err)
        }
    })

    studentSchema.methods.comparePasswords = async function(password, next){
        try{
            return await bcrypt.compare(password, this.password)
        }catch(e){
            console.log(`error in comparing passwords !!! ${e}`);
            next(e)
        }

    }

    studentSchema.statics = {
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



    module.exports = mongoose.model('student', studentSchema)