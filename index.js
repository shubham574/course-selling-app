const express = require('express')
const {userRouter} = require("./routes/user");
const {adminRouter} = require("./routes/admin");
const {courseRouter }= require("./routes/course");
const mongoose = require("mongoose");
require("dotenv").config(); 

const app = express()
const port = 3000

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);


async function main(){
 await mongoose.connect(process.env.MONGOOSE_URI)
 app.listen(port, () => {
   console.log(`App listening on port ${port}`)
 })
}

main()