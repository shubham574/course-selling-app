const {Router} = require("express");
const userRouter = Router();

userRouter.post('/signup', (req, res) => {
    res.json({
        message: 'User signup endpoint'
    })
})

userRouter.post('/signin', (req, res) => {
    res.json({
        message: 'User signin endpoint'
    })
})

userRouter.get('/purchases', (req, res) => {

})



module.exports = {
    userRouter: userRouter
}