
import { bcrypt, HttpError } from "../../Config/import-config"
import { registerSchema } from "../../Helpers/validation-schema"
import {RefreshToken, User} from '../../Model'
import CustomErrorHandler from "../../Services/CustomErrorHandler"
import JwtService from "../../Services/JwtService"

const registerConroller = {

    async register(req, res, next){

        //validate the request
        const {error} = registerSchema.validate(req.body)
        if(error){
            return next(error)
        }


        //autherise the request
        try {
            const { name, email, password, repeat_password } = req.body

            //check wheter the user is already egister
            const isUserExist = await User.exists({email})
            // console.log(isUserExist)
            if(isUserExist){
                return next(CustomErrorHandler.alreadyExistEmail(`${email} is already exists`))
            }


            // always hash the user password before storing into DB
            const hashedPassword = await bcrypt.hash(password, 10)

            
            // saving user data
            const user = new User({ name, email, password: hashedPassword })
            const result = await user.save()

            if(result){
                res.json({ 
                    status: 200,
                    message: 'successfully register, please login'
                 })  
            
            }


            // Creating two tokens 
            // const accessToken = await JwtService.signToken({ _id: result._id, role: result.role })
            // const refreshToken = await JwtService.signRefreshToken({ _id: result._id, role: result.role })

            
            // Saving refreshToken into database
            // await RefreshToken.create({ token: refreshToken })
    

            // res.json({ accessToken, refreshToken })  
           
            
        } catch (error) {
           return next(error)
        }
        
   }

}


export default registerConroller