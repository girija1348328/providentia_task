const express = require("express")
const router = express.Router()
const taskController = require("../controllers/taskController")
const userController = require("../controllers/userController")
const auth = require("../middleware/auth")


//user
router.post("/user",userController.createUser)
router.get("/user/login",userController.login)


//task 
router.post("/",auth.authentication,taskController.createTask)
router.get("/:id",taskController.findOneTask)
router.put("/:id",auth.authentication,taskController.updateTask)
router.delete("/:id",taskController.deleteTask)
router.get("/",taskController.findAllTask)





module.exports = router;