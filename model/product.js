module.exports = (sequelize,DataTypes)=>{
    const product = sequelize.define('product',{
       Product_Name:{
            type : DataTypes.STRING,
        },
        Image:{
            type : DataTypes.STRING
        },
        Price:{
            type : DataTypes.INTEGER
        },
        Description:{
            type : DataTypes.STRING
        },
        IsActive :{
            type : DataTypes.INTEGER,
        }
    },{
        modelName: 'product',
        timestamps: false
    });
    return product;
}