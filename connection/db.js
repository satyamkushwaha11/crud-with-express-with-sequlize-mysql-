
const {Sequelize}=require('sequelize');
require('dotenv').config()

const sequelize=new Sequelize(
    process.env.database,
    process.env.user,
    process.env.password,
    {
    host:process.env.host,
    dialect:'mysql',
    
    pool: {
        max: 5,
        min: 0,
        idle: "10000"
    }
});

module.exports=sequelize;