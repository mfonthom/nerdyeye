const express = require('express')
// const router = require('./expressRouter')
const mongoose = require('mongoose')
const Product = require('./productSchema')


const connectDB = ()=>{
    mongoose.connect(`mongodb+srv://mfon:admin@cluster.ajdpg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
    console.log(`connected to mongoose`)
}
connectDB()

const app = express()

app.use(express.json());

//write to data base
app.post('/add',async (req,res) =>{
    try{
        const {name,price,description} = req.body
        const newProduct = await Product.create({name,price,description})
        const saveProduct = await newProduct.save()
            res.status(201).json({
                success:true,
                msg:`you have added new data`,
                data:saveProduct
            })
    }catch(error){
            res.status(500).json({
                success:false,
                data:error
            })
        }
    
})

//Read from database
app.get('/all',async (req,res) =>{
    const products = await Product.find({})
    res.status(200).json({
        success:true,
        msg:`you have gotten all data`,
        data:products
    })
})

//Read One Record
app.get('/one/:id',async (req,res) =>{
    const id = req.params.id
    const oneProduct= await Product.findOne({_id : id})
    res.status(200).json({
        success:true,
        msg:`you have gotten requested data`,
        data:oneProduct
    })
})

//Update Record
app.put('/edit/:id',async (req,res)=>{
    const id = req.params.id
    const payload = req.body
    const updateProduct = await Product.findOneAndUpdate({_id : id},payload,{new:true})
    res.status(200).json({
        success:true,
        msg:`you have successfully updated the data`,
        data:updateProduct
    })
})

//Delete
app.delete('/remove/:id', async (req,res) =>{
    const id = req.params.id
     await Product.findByIdAndDelete(id)

    res.status(200).json({
        success:true,
        msg:`you have successfully deleted the data`,
    })
})




app.listen(5000, () =>{
    console.log(`server is listening on 5000`)
})