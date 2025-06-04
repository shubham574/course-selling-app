const express = require('express')
const {userRouter} = require("./routes/user");
const {adminRouter} = require("./routes/admin");
const {courseRouter }= require("./routes/course");

const app = express()
const port = 3000

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
