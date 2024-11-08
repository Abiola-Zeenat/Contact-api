import express from "express";
import ContactsRoutes from "./Routes/contacts.routes.js";
import UsersRoutes from "./Routes/users.routes.js";
import connectDB from "./config/db.js";
import responseTimeLogger from "./middleware/responseTimeLogger.js";
import logger from "./middleware/logger.js";

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger Middleware
app.use(responseTimeLogger);
app.use(logger);

// // connect to db
connectDB();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Routes
app.use("/api/users", UsersRoutes);
app.use("/api/contacts", ContactsRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
