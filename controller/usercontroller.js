const db = require('../model');
 
const category = db.category
const product = db.product


const get_category_data = async(req,res)=>{
    const data = await category.findAll({
        attributes:['Category_Name','Image'],
        include:[{
            model:product,
            attributes:['Product_Name','Price','Description','Image'],
            as:'productInfo'
        }]})
        res.status(200).json({
       categorydata:data
    })
}

const get_category = async(req,res)=>{
    var id = req.params.id
    const data = await category.findOne({where:{id:id},
        attributes:['Category_Name','Image'],
        include:[{
            model:product,
            attributes:['Product_Name','Price','Description'],
            as:'productInfo'
        }]})
    //     const {Category_Name,Image,Product_Name,Price,Description} = data
    //     const singleresult ={
    //         Category_Name,
    //         Image :`http://localhost:4000/profile/${Image}`,
    //         Product_Name,
    //         Price,
    //         Description
    //     }
    // console.log("data isss",singleresult)
    res.status(200).json({categorydata:data})
}

const get_product_data = async(req,res)=>{
    const data = await product.findAll({
        attributes:['Product_Name','Price','Description','Image'],
        include:[{
            model:category,
            attributes:['Category_Name','Image'],
            as:'categoryInfo'
        }]
    })
    res.status(200).json({productdata:data})
}
const get_product = async(req,res)=>{
    var id = req.params.id
    const data = await product.findOne({where:{id:id},
        attributes:['Product_Name','Price','Description','Image'],
        include:[{
            model:category,
            attributes:['Category_Name','Image'],
            as:'categoryInfo'
        }]
    })
    res.status(200).json({productdata:data})
}
const add_category = async (req,res)=>{
    const { Category_Name,IsActive}  = req.body
        var data = await category.create({Category_Name,IsActive,Image: req.file.filename}); 
        console.log("created data is : ",data.Category_Name); 
    res.status(200).json({
        message:"category inserted",
        Category_Name:data.Category_Name,
        Image:`http://localhost:4000/profile/${req.file.filename}`
    });
 }
const add_product = async(req,res)=>{
        const { Product_Name,Price,Description,IsActive,CategoryId,}  = req.body
         const data =  await product.create({Product_Name, Price,Description,IsActive,CategoryId,Image: req.file.filename});
        res.status(200).json({
        message:"sucess  product inserted",
        Product_Name:data.Product_Name,
        Price:data.Price,
        Description:data.Description,
        Image:`http://localhost:4000/profile/${req.file.filename}`
        })
}
const update_category = async (req,res)=>{
    const {Category_Name,IsActive}  = req.body
    var id = req.params.id 
    var img =req.file.filename
   // console.log("img is",img)
    var data = await category.update(req.body,{where:{id:id}})
    res.status(200).json({categorydata:data})
}
const update_product = async(req,res)=>{
    var id = req.params.id;
   const {Category_Name,IsActive, Product_Name,Price,Description}  = req.body
    var data = await product.update(req.body,{where:{id:id}})
    res.status(200).json({productdata:data})
}

const delete_category = async (req,res)=>{
    var id = req.params.id;
    const data = await category.destroy({where:{id:id}})
    res.status(200).json({categorydata:data})
}

const delete_product = async (req,res)=>{
    var id = req.params.id;
    const data = await product.destroy({where:{id:id}})
    res.status(200).json({productdata:data})
}

module.exports = {
    add_category,
    add_product,
    get_category_data,
    get_product_data,
    get_product,
    get_category,
    update_category,
    update_product,
    delete_category,
    delete_product
     
}



