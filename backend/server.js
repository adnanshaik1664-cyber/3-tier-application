const express = require("express");
const cors = require("cors");

const app = express();

const taskRoutes = require("./routes/tasks");

app.use(cors());

app.use(express.json());

app.use("/tasks", taskRoutes);

const PORT = 5000;

app.listen(PORT, () => {

    console.log(`Server Running on Port ${PORT}`);

});    