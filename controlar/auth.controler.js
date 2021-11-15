const User=require('../models/employ')
const Joi=require('joi')

const createEmp=async(req,res)=>{
    const schema=Joi.object({
        name:Joi.string().max(20).min(3).required(),
        email:Joi.string().email().required()
    })
    let validateSchema = schema.validate(req.body);
    let empload;
    if (validateSchema.error) {
        return res.status(400).json({
            message: validateSchema.error.message || "Bad Request",
            code: 400
        })
    } 
    else {
        empload = validateSchema.value;
    }


    const condition = {
        where :{email: empload.email},
    }
    try {
        const exists = await User.findOne(condition);
        console.log(exists)

        
        if (exists) {
            return res.status(200).send({
                message: "user alreay exist",
                status: 422,
            })
        } else {
            const result1 = await User.create(empload)
            return res.status(200).send({
                message: "user added successfully!",
                status: 200,
                data: result1
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 500
        })
    }


};



const getallEmp=async(req,res)=>{
    
    try{
        let alldata=await User.findAll();
        
        if (alldata.length>0){
            return res.status(200).send({
                message: "show all",
                status: 200,
                data: alldata
            })
        }else{
            return res.status(400).send({
                massage:"there is no data to show",
                status:400,
            })

        }
       
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 500
        })
    }
}



const emptyEmpTable=async(req,res)=>{
    try{
        let emptydata=await User.destroy({truncate:true});
        if (emptydata==0){
            return res.status(200).send({
                message: "user Table alreay empty",
                status: 422,
            })
        }else{
            return res.status(200).send({
                message: "table becames empty",
                status: 200,
                data: emptydata
            })

        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 500
        })
    }
}


const updateById=async(req,res)=>{
    const schema=Joi.object({
        id:Joi.number().required(),
        name:Joi.string().max(20).min(3).required()
    })
    let validateSchema = schema.validate(req.body);
    let empload;
    if (validateSchema.error) {
        return res.status(400).json({
            message: validateSchema.error.message || "Bad Request",
            code: 400
        })
    } 
    else {
        empload = validateSchema.value;
    }


    const condition = {
        where :{id: empload.id},
    }
    try {
        const exist=await User.findOne(condition);
        if (exist){
            const updated = await User.update(empload,condition);
            return res.status(200).send({
                        message: "user updated successfully!",
                        status: 200,
                    
                })  
        }else{
            return res.status(400).send({
                massage:"employe data not exist ",
                status:400
            })
        }
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 500
        })
    }


};


module.exports = {
    createEmp,
    getallEmp,
    emptyEmpTable,
    updateById
    
}