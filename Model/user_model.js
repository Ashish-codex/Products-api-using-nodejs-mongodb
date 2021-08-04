import { mongoose } from "../Config/import-config";

const Schema = mongoose.Schema

const userSchema = Schema({
    
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {type: String, default: 'customer'}
}, { timestamps: true} )

const User = mongoose.model('user', userSchema)




export default User