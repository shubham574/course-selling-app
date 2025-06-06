const {Router} = require("express");
const userRouter = Router();
const userModal = require("../db");
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require("zod");
const {JWT_USER_SECRET} = require("../config");


const signupSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    firstName: z.string().min(2, "First name must be at least 2 characters long"),
    lastName: z.string().min(2, "Last name must be at least 2 characters long")
})

userRouter.post('/signup', async(req, res) => {
   const validation = signupSchema.safeParse(req.body);
       if (!validation.success) {
           return res.json({
               message: validation.error.errors[0].message
           });
       }
   
       const { email, password, firstName, lastName } = validation.data;
       let errorThrown = false;
   
       try{
           const hashedPassword = await bcrypt.hash(password, 5);
   
           await userModal.userModal.create({
               email: email,
               password: hashedPassword,
               firstName: firstName,
               lastName: lastName
           });
       }catch (error) {
           errorThrown = true;
           return res.json({
               message: "User already exists"
           });
       }
       if (!errorThrown) {
           res.json({
               message: "User created successfully",
           });
       }
   })


userRouter.post('/signin', async(req, res) => {
   const email = req.body.email;
       const password = req.body.password;
   
       const response = await userModal.userModal.findOne({
            email: email
       });
       if (!response) {
           return res.status(403).json({
               message: "User does not exist"
           });
       }
       const passwordMatch = await bcrypt.compare(password, response.password);
       if (passwordMatch) {
           const token = jwt.sign({
               id: response._id.toString()
           }, JWT_USER_SECRET);
           res.json({
               message: "User signed in successfully",
               token: token
           });
       } else {
           res.status(403).json({
               message: "Invalid password"
           });
       }
   })


userRouter.get('/purchases', async(req, res) => {
    const userId = req.userId;
    const purchases = await userModal.purchaseModal.find({
        userId
    })

    res.json({
        purchases
    })
})



module.exports = {
    userRouter: userRouter
}