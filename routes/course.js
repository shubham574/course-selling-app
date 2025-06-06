const {Router} = require ("express");
const { userMiddleware } = require("../middleware/user");
const {  purchaseModal } = require("../db");
const courseRouter = Router();


courseRouter.post('/purchase',userMiddleware, async(req, res) => {

    const userId = req.userId;
    const courseId = req.body.courseId;

    await purchaseModal.create({
        userId,
        courseId
    })

    res.json({
        message: "Course purchased successfully"
    })

})

courseRouter.get('/preview', async(req, res) => {

    const courses = await courseModal.find({});

    res.json({
        courses
    })
})


module.exports={
    courseRouter: courseRouter
}