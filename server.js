import express from "express";
import ContactsRoutes from "./Routes/contacts.routes.js";
import connectDB from "./config/db.js";

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// // connect to db
connectDB();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Routes
app.use("/api/contacts", ContactsRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
