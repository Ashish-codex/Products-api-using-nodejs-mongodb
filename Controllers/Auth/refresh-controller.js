import { refreshTokenSchema } from "../../Helpers/validation-schema"
import { RefreshToken, User } from "../../Model"
import CustomErrorHandler from "../../Services/CustomErrorHandler"
import JwtService from "../../Services/JwtService"

const refreshController = {
    async refresh(req, res, next){

        //-> validate the request
        const {error} = refreshTokenSchema.validate(req.body)
        if(error){
            return next(error)
        }



        try {

            // -> check wheter the token is already exists in database or not 
            const refreshTokenExists = await RefreshToken.findOne({ token: req.body.refresh_token})
            if(!refreshTokenExists){
                return next(CustomErrorHandler.unAuthorized('invalid refresh token'))
            }

            // -> extract id form verified token
            const { _id } = await JwtService.verifyRefreshToken(refreshTokenExists.token)

            
            // -> find the user into database using that id 
            const user = await User.findOne({ _id })
            if(!user){
                return next(CustomErrorHandler.unAuthorized('User not found'))
            }


            // -> generate jwt accessToken and refreshToken
            const accessToken = await JwtService.signToken({ _id: user._id, role: user.role})
            const refreshToken = await JwtService.signRefreshToken({ _id: user._id, role: user.role})

            
            // Saving refreshToken into database
            await RefreshToken.create({ token: refreshToken })

            //-> send those tokens as response
            res.json({ accessToken, refreshToken })  

        } catch (error) {
            return next(error)
        }
    }
}


export default refreshController