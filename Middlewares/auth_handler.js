import CustomErrorHandler from "../Services/CustomErrorHandler"
import JwtService from "../Services/JwtService"

const authHandler = async (req, res, next) => {
    try {
        const authHandler = req.headers.authorization
        const token = authHandler.split(' ')[1]
        const { _id, role} = await JwtService.verifyToken(token)

        const user = { _id , role }
        req.user = user
        next()

    } catch (error) {
        return next(error)
    }
}




export default authHandler