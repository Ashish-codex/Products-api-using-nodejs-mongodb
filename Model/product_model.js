import { APP_URL,  HOST_URL } from "../Config/dotenv-config";
import { mongoose } from "../Config/import-config";

const Schema = mongoose.Schema

const productSchema = Schema({
    
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    image: {type: String, required: true, get: (image) => {
        return `${APP_URL}/${image}`
    }}

}, { timestamps: true, toJSON: { getters: true }, id: false })

const Product = mongoose.model('product', productSchema)


export default Product