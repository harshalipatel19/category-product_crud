
const dbconfig = require('../config/config.js')
const {Sequelize,DataTypes, HasMany} = require('sequelize')

const sequelize = new Sequelize(
    dbconfig.db,
    dbconfig.user,
    dbconfig.password,{
        host : dbconfig.host,
        dialect :dbconfig. dialcet,
        operatorsAliases: false,   
    },{
        pool:{
            max : dbconfig.pool.max, 
            min: dbconfig.pool.min,
           acquire : dbconfig.pool.acquire,
           idle : dbconfig.pool.idle,
        }
    }
    );

sequelize.authenticate()
.then(() => {
    console.log("connected");
}).catch(err =>{
    console.log("error",err);
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.category  = require('./category.js')(sequelize,DataTypes);
db.product  = require('./product.js')(sequelize,DataTypes);

db.category.hasMany(db.product,{foreignKey:'CategoryId',as:'productInfo'},{ onDelete: 'CASCADE' });
db.product.belongsTo(db.category,{foreignKey:'CategoryId',as:'categoryInfo'});


db.sequelize.sync({force :false})
.then(()=>{
    console.log("yess re-sync");
})

module.exports = db;