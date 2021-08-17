import {express, HttpError, mongoose, path} from './Config/import-config'
import {APP_PORT, DB_NAME, DB_PASSWORD, DB_URL, DB_USER} from './Config/dotenv-config'
import router from './Routers'
import errorHandler from './Middlewares/error-handler'
import { urlencoded } from 'express'
import crypto from 'crypto'
const app = express()



global.appRoot = path.resolve(__dirname)

//// Middleware for json post request
app.use(express.json());

//// Middleware for urlencoded post request
app.use(express.urlencoded({extended: false}));


// MongoDB connection
mongoose.connect(DB_URL, 
    {
        dbName: DB_NAME,
        user: DB_USER,
        pass: DB_PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() => {
    console.log('Mongodb connected...')
});

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
    console.log('Mongodb is open ')
})



// const accessSecret = crypto.randomBytes(32).toString('hex')
// const refreshSecret = crypto.randomBytes(32).toString('hex')
// console.table({accessSecret, refreshSecret})




//Serving satict file i.e images
app.use('/uploads', express.static('uploads'))


//Routes starts with /api
app.use('/api', router)


app.use('/books', router)

app.use('/', (req, res, next) => {
    res.send('This product api')
})


// If there is no route match 
app.use( (req, res, next) => {
    next(HttpError(404, 'Page not found'))
})


//Error handaling middleware
app.use(errorHandler) 


//Server listing on port
app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port ${APP_PORT}`);
})