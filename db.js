require("dotenv").config(); 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

mongoose.connect(process.env.MONGOOSE_URI);

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    firstName: String,
    lastName: String,
})

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
})

const adminSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    firstName: String,
    lastName: String,

})

const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId,
    purchaseDate: Date
})

const userModal = mongoose.model("User", userSchema)
const courseModal = mongoose.model("Course", courseSchema)
const adminModal = mongoose.model("Admin", adminSchema)
const purchaseModal = mongoose.model("Purchase", purchaseSchema)

module.exports= {
    userModal: userModal,
    courseModal: courseModal,
    adminModal: adminModal,
    purchaseModal: purchaseModal
} 