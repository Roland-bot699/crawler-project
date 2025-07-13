const express = require("express");
const app = express();
const cors = require("cors");
const searchRoute = require("./routes/search");

app.use(cors());
app.use(express.json());
app.use("/search", searchRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});