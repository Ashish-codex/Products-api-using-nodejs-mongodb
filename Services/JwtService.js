import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../Config/dotenv-config";
import { jwt } from "../Config/import-config";

class JwtService {

    // For Access token usage
    static signToken(payload, secret = JWT_ACCESS_SECRET, expiry = '1y'){
        return jwt.sign(payload, secret, { expiresIn: expiry })
    }

    static verifyToken(token, secret = JWT_ACCESS_SECRET){
        return jwt.verify(token, secret)
    }


    // For Refresh token usage
    static signRefreshToken(payload, secret = JWT_REFRESH_SECRET, expiry = '1y'){
        return jwt.sign(payload, secret, { expiresIn: expiry })
    }

    static verifyRefreshToken(refreshToken, secret = JWT_REFRESH_SECRET){
        return jwt.verify(refreshToken, secret)
    }
}


export default JwtService