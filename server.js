const express = require("express");
const dotenv = require("dotenv");
const app = express();
const port = 8000;
const connectDb = require("./config/db");

dotenv.config();
connectDb();
app.use(express.json());

app.use("/", require("./routes/book.routes"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});