const mongoose = require('mongoose');
const crypto = require('node:crypto');
const { v4: uuidv4 } = require('uuid');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    lastname:{
        type:String,
        maxlength:15,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        require:true,
        unique:true
    },
    userinfo:{
        type:String,
        trim:true
    },
    //TODO: comback here
    encry_password:{
        type:String,
        required:true
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    purchases:{
        type:Array,
        default:[]
    }
},{timestamps:true}
);
userSchema.virtual('password')
    .set(function(password){
        this._password = password,
        this.salt = uuidv4(),
        this.encry_password = this.securePassword(password)
    })
    .get(function(){
        return this._password
    })
userSchema.method = {
    authenticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password
    },
    securePassword:function(plainpassword){
        if(!password) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
                               .update(plainpassword)
                               .digest('hex');
            
        } catch (err) {
            
        }

    }
}
module.exports = mongoose.model("User",userSchema);