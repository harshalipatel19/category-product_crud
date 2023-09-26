module.exports = (sequelize,DataTypes)=>{
    const category = sequelize.define('category',{
        Category_Name:{
            type : DataTypes.STRING,
        },
        Image:{
            type : DataTypes.STRING,
        },
        IsActive :{
            type : DataTypes.INTEGER,
        }
    },{
        modelName: 'Category',
        timestamps: false
    });
    return category;
}