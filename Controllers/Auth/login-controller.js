import { bcrypt } from "../../Config/import-config"
import { loginSchema, refreshTokenSchema } from "../../Helpers/validation-schema"
import { RefreshToken, User } from "../../Model"
import CustomErrorHandler from "../../Services/CustomErrorHandler"
import JwtService from "../../Services/JwtService"

const loginController = {
    
    async login(req, res, next){
        
        //-> validate the request
        const {error} = loginSchema.validate(req.body)
        if(error){
            
            return next(error)
        }


        try {
            const{ email, password } = req.body
        
            
            //-> check wheter the user is register
            const registedUser = await User.findOne({email})
            if(!registedUser){
                return next(CustomErrorHandler.wrongCredentials('invalid email.'))
            }


            //-> check whether the password is match or not
            const passwordMatch = await bcrypt.compare(password, registedUser.password)
            if(!passwordMatch){
                return next(CustomErrorHandler.wrongCredentials('invalid password.'))
            }


            //-> generate jwt tokens
            const accessToken = JwtService.signToken({ _id: registedUser._id, role: registedUser.role })
            const refreshToken = JwtService.signRefreshToken({ _id: registedUser._id, role: registedUser.role  })


            // Saving refreshToken into database
            await RefreshToken.create({ token: refreshToken })


            //-> send those tokens as response
            res.json({ accessToken, refreshToken })  


        } catch (error) {
            return next(error)
        }

    },


    async logout(req, res, next){

        //-> validate the request
        const {error} = refreshTokenSchema.validate(req.body)
         if(error){
            return next(error)
        }


        // -> find that request as refreshToken into database using deleteone and delete it
        try {
              
            const result = await RefreshToken.findOne({token: req.body.refresh_token})
            if(!result){
                return next(CustomErrorHandler.notFound())
            }

            await RefreshToken.deleteOne({ token: result.token})

            res.json({message: "succefuly logout"})
        } catch (error) {
            return next(error)
        }
  
        
    }
    
}

export default loginController
