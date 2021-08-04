import { User } from "../Model"
import CustomErrorHandler from "../Services/CustomErrorHandler"


const adminHandler = async (req, res, next) => {

    try {
        const user = await User.findOne({_id: req.user._id})
        
        if(user.role === 'admin'){
            next()
        }else{
            return next(CustomErrorHandler.unAuthorized('only admin are allowed'))
        }

    } catch (error) {
        return next(error)
    }
}


export default adminHandler