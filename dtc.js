const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
mongoose.connect('mongodb://127.0.0.1:27017/proj',{
 useNewUrlParser:true,
 useCreateIndex:true,
 useUnifiedTopology:true
})
const UserSchema = new mongoose.Schema({
 name: {
 type:String
 },
 email:{
 type:String,
 unique:true
 },
 password:{
 type:String
 }
})
UserSchema.methods.authToken = async function(){
 const user = this
 const token = jwt.sign({ _id:user._id.toString() }, 'secretkey' )
 return token
}
UserSchema.statics.findUser = async (email,password)=>{
 const user = await User.findOne({email})
 if(!user){
 return null
 }
 const compare = await bcrypt.compare(password,user.password)
 if(!compare){
 return null
 }
 return user
}
UserSchema.pre('save', async function(next){
 const user = this
 user.email = user.email.toLowerCase()
 const hashedPassword = await bcrypt.hash(user.password,8)
 user.password = hashedPassword
 next()
})
const User = new mongoose.model('users',UserSchema)
module.exports = User
