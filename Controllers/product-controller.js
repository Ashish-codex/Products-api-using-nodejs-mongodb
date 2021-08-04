import { fs, multer, path } from '../Config/import-config'
import { productSchema } from '../Helpers/validation-schema'
import { Product } from '../Model'
import CustomErrorHandler from '../Services/CustomErrorHandler'

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${file.originalname}-${Date.now()}-${path.extname(file.originalname)}`
        cb(null, uniqueName)
    }
})


const handleFormData = multer({ storage, limits: { fileSize: 1000000 * 5 } }).single('image')


const productController = {
    
    async addProduct(req, res, next){

        handleFormData(req, res, async (err) => {    
            if(err){
                return next(CustomErrorHandler.serverError(err.message))
            }
            

            // console.log(req.file)

            //-> getting file path
            const filePath = req.file.path
            // console.log(filePath)
            

            // -> validate the request using Joi
            const { error } = productSchema.validate(req.body)
            if(error){

                //-> delete the current image fiel
                fs.unlink(`${appRoot}/${filePath}`, (err) => {
                    if(err){
                        return next(CustomErrorHandler.serverError(err.message))
                    }
                })

                return next(error)
            }


            try {
                //-> create a productDocument to add into database
                const { name, description, price } = req.body
                const productDocument = await Product.create({name, description, price, image: filePath}) 

                res.status(201).json({
                    message: 'product added successfuly',
                    productDocument
                })

            } catch (err) {
                return next(err)
            }

        })


    },




    async updateProduct(req, res, next){
        
        handleFormData(req, res, async (err) => {    
            if(err){
                return next(CustomErrorHandler.serverError(err.message))
            }
            
            //-> getting file path
            let filePath
            if(req.file){
                filePath = req.file.path
            }
            

            // -> validate the request using Joi
            const { error } = productSchema.validate(req.body)
            if(error){
                //-> delete the current image fiel
                if(req.file){
                    fs.unlink(`${appRoot}/${filePath}`, (err) => {
                        if(err){
                            return next(CustomErrorHandler.serverError(err.message))
                        }
                    })
                }
                return next(error)
            }


            try {
                //-> create a productDocument to add into database
                const { name, description, price } = req.body
                const productDocument = await Product.findOneAndUpdate(
                { _id: req.params.id }, 
                {
                    name,
                    description, 
                    price, 
                    ...(req.file && { image: filePath })
                }, 
                { new: true }) 

                res.status(201).json({
                    message: 'product updated successfuly',
                    productDocument
                })

            } catch (err) {
                return next(err)
            }

        })

    },





    async deleteProduct(req, res, next){

        try {
            const isProductExist = await Product.exists({_id: req.params.id})
            console.log(isProductExist)
            if(isProductExist){
                const productDocument = await Product.findOneAndRemove({_id: req.params.id})
                console.log(productDocument)


                const filePath = productDocument._doc.image
                fs.unlink(`${appRoot}/${filePath}`, (err) => {
                    if(err){
                        return next(CustomErrorHandler.serverError(err.message))
                    }
                })
    
                res.status(202).json({
                    message: 'product deleted successfuly',
                    productDocument
                })
            }else{
                return next(CustomErrorHandler.notFound('this product already deleted'))
            }
          
            
        } catch (error) {
            return next(error)
        }
        
        
    },





    async getAllProduct(req, res, next){
        try {
            const products = await Product.find().select('-updatedAt -__v').sort({_id: -1})
            if(products.length === 0){
                return res.json({
                    status: 404,
                    message: 'there is no products availabe',
                    products
                })
            }
            
            res.status(200).json({
                status: 200,
                message: 'getting list of products',
                size: products.length,
                products
            })
            
        } catch (error) {
            return next(error)
        }
    },





    async getSingleProduct(req, res, next){
        try {
            const isProductExist = await Product.exists({_id: req.params.id})
            if(isProductExist){
                const products = await Product.findOne({_id: req.params.id}).select('-updatedAt -__v')
                res.status(200).json({
                    status: 200,
                    message: 'successfully get product',
                    products
                })
            }else{
               return next(CustomErrorHandler.notFound('this product not found'))
            }
            
            
        } catch (error) {
            return next(error)
        }
    }

}


export default productController