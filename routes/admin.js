const{Router} = require("express");
const adminRouter = Router();
const adminModal = require("../db");
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require("zod");
const {JWT_ADMIN_SECRET} = require("../config");
const { adminMiddleware } = require("../middleware/admin");


const signupSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    firstName: z.string().min(2, "First name must be at least 2 characters long"),
    lastName: z.string().min(2, "Last name must be at least 2 characters long")
})
adminRouter.post('/signup', async (req, res) => {
    
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

        await adminModal.adminModal.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });
    }catch (error) {
        errorThrown = true;
        return res.json({
            message: "Admin already exists"
        });
    }
    if (!errorThrown) {
        res.json({
            message: "Admin created successfully",
        });
    }
})

adminRouter.post('/signin', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const response = await adminModal.adminModal.findOne({
         email: email
    });
    if (!response) {
        return res.status(403).json({
            message: "Admin does not exist"
        });
    }
    const passwordMatch = await bcrypt.compare(password, response.password);
    if (passwordMatch) {
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_ADMIN_SECRET);
        res.json({
            message: "Admin signed in successfully",
            token: token
        });
    } else {
        res.status(403).json({
            message: "Invalid password"
        });
    }
})

adminRouter.post('/course', adminMiddleware,async(req, res) => {
    const adminId = req.userId;
    const { title, description, imageUrl, price } = req.body;
    const course = await courseModal.create({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId: adminId
    });

    res.json({
        message: "Course created successfully",
        courseId: course._id
    });

})
adminRouter.put('/course', adminMiddleware,async(req, res) => {
     const adminId = req.userId;
    const { title, description, imageUrl, price } = req.body;
    const course = await courseModal.updateOne({
        _id:courseId,
        creatorId: adminId
    },{
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price
    });

    res.json({
        message: "Course updated successfully",
        courseId: course._id
    });

})


adminRouter.get('/course/bulk', async(req, res) => {
    const adminId = req.userId;

    const course = await courseModal.find({
        creatorId: adminId
    });
    res.json({
        message: "Courses fetched successfully",
        courses: course
})
})

module.exports ={
    adminRouter:adminRouter
}