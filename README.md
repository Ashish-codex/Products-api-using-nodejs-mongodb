# Products-api-using-nodejs-mongodb



## Description :

Products api is an resful api through which admin can Create, Upade and Deletes the product. 
This api also provides the list of products as shown in below. Basically this api is divided into two parts i.e 
1. Authentication: In order to authenticate the users i have used JWT Authentication 
2. Products: To access the products i have used different http methods like GET, POST, PUT, DELETE



### API Routes:
- Register a user
- Login a user
- Who am I
- Refresh token
- Logout the user
- Add new products
- Update products
- Get all products 
- Get single product
- Delete a product



## OutPut :
``` JSON

{
  "status": 200,
  "message": "getting list of products",
  "size": 5,
  "products": [
    {
      "_id": "6107ee21ad1b993520c3a003",
      "name": "boAt Rockerz 450 Bluetooth Headse",
      "description": "With Mic:Yes\nConnector type: 3.5 mm\nBattery life: 15 hr | Charging time: 3 Hours\n40mm Drivers: HD Sound\nAdjustable Earcups",
      "price": "₹1,099",
      "image": "http://localhost:5000/uploads\\boat-rockerz-450-.jpeg-1627909665378-.jpeg",
      "createdAt": "2021-08-02T13:07:45.385Z"
    },
    {
      "_id": "6107ec3aad1b993520c39ff6",
      "name": "DELL Inspiron Core i7 11th Gen - (16 GB/512 GB SSD/Windows 10)",
      "description": "Carry It Along 2 in 1 Laptop\n14 Inch Full HD LED Backlit, WVA Display (Touch with Active Pen)\nFinger Print Sensor for Faster System Access\nLight Laptop without Optical Disk Drive",
      "price": "₹85,550",
      "image": "http://localhost:5000/uploads\\dell-laptop-inspiron.jpeg-1627909178802-.jpeg",
      "createdAt": "2021-08-02T12:59:38.808Z"
    },
    {
      "_id": "6107eb04ad1b993520c39feb",
      "name": "POCO X3 Pro (Graphite Black, 128 GB)  (6 GB RAM)",
      "description": "6 GB RAM | 128 GB ROM | Expandable Upto 1 TB\n16.94 cm (6.67 inch) Full HD+ Display\n48MP + 8MP + 2MP + 2MP | 20MP Front Camera\n5160 mAh Lithium-ion Polymer Battery\nQualcomm Snapdragon 860 Processor\nMultiple Hands-free Voice Assistants",
      "price": "₹18,999",
      "image": "http://localhost:5000/uploads\\x3-pro.jpeg-1627908868829-.jpeg",
      "createdAt": "2021-08-02T12:54:28.836Z"
    },
    {
      "_id": "6107e9d9ad1b993520c39fdf",
      "name": "APPLE iPhone 11 (Black, 64 GB)",
      "description": "64 GB ROM\r15.49 cm (6.1 inch) Liquid Retina HD Display\r12MP + 12MP | 12MP Front Camera\rA13 Bionic Chip Processor",
      "price": "₹51,999",
      "image": "http://localhost:5000/uploads\\apple-iphone-11.jpeg-1627908569256-.jpeg",
      "createdAt": "2021-08-02T12:49:29.274Z"
    },
    {
      "_id": "6107e950ad1b993520c39fdc",
      "name": "Realme X7",
      "description": "realme X7 (Space Silver, 6GB RAM, 128GB Storage) with No Cost EMI/Additional Exchange Offers",
      "price": "₹19,999",
      "image": "http://localhost:5000/uploads\\realme X7.jpg-1627908432312-.jpg",
      "createdAt": "2021-08-02T12:47:12.347Z"
    }
  ]
}

```




## Used Tech :

- VSCode: https://code.visualstudio.com/
- NodeJS: https://nodejs.org/
- ExpressJS: https://expressjs.com/
- MongoDB: https://www.mongodb.com/
- Mongoose: https://mongoosejs.com/
- Nodemon: https://www.npmjs.com/package/nodemon
- Dotenv: https://www.npmjs.com/package/dotenv
- JWT: https://jwt.io/
- JOI: https://www.npmjs.com/package/joi
- ESM: https://www.npmjs.com/package/esm



## Project setup
``` JSON
npm install

```


### Run
``` JSON
npm run start

```


### API Url
``` JSON
https://product-node-rest-api.herokuapp.com/api/products

```



## Refrence :
https://www.youtube.com/watch?v=iM8h8-LcJPk
