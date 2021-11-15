const express = require("express")
const router = express.Router()
const userControllers = require("../controlar/auth.controler")

router.post("/", userControllers.createEmp)
router.get("/",userControllers.getallEmp)
router.delete("/del",userControllers.emptyEmpTable)
router.put("/update",userControllers.updateById)

module.exports = router