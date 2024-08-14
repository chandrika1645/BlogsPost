const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");
const commentRouter = require("./routes/comment")
const blogRouter = require("./routes/blogPost")

require('dotenv').config();
connectDB();

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use(cors());
app.use("/admin", adminRouter)
app.use("/user", userRouter)
app.use('/comments', commentRouter);
app.use('/blogs', blogRouter );

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
