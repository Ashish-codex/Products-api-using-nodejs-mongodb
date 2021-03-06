import dotenv from 'dotenv'
dotenv.config()

export const {
    APP_PORT,
    DEBUG_MODE,
    DB_URL,
    DB_NAME, 
    DB_USER,
    DB_PASSWORD,
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    APP_URL,
    HOST_URL
} = process.env