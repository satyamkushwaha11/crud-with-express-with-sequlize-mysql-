const db=require("../connection/db")
const Sequelize=require('sequelize')
const User=db.define('employ',{
    id:{ type: Sequelize.INTEGER ,primaryKey:true,autoIncrement:true},
    name:{type:Sequelize.STRING},
    email:{type:Sequelize.STRING,unique:true},
    createdAt: {
        type: Sequelize.DATE,
        default: Date.now()},
    updatedAt: {
        type: Sequelize.DATE,
        default: Date.now()},
});


module.exports=User