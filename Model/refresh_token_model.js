import { mongoose } from "../Config/import-config"

const Schema = mongoose.Schema

const refreshTokenSchema = new Schema({
    token: { type: String, unique: true }
}, { timestamps: false })


const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema, 'refreshTokens')

export default RefreshToken

