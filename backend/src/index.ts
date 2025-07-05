import express , {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import hotelRoutes from './routes/my-hotels'
import cookieParser from "cookie-parser";
import path from "path";
import {v2 as cloudinary} from 'cloudinary'

//cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
mongoose.connect(process.env.MONGODB_CONNECTION_STRING!)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.error("Failed to connect MongoDB", err);
    process.exit(1);
  });



const app = express();
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
// app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
  res.send("Hello! Your backend is working 🎉");
});

app.delete("/api/my-hotels/:id", (req: Request, res: Response) => {
  console.log("##########");
  res.send("OK");
});

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/my-hotels",hotelRoutes)

// app.get("*", (req: Request, re: Response) => {
//   res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
// })

app.listen(7000, () => {
    console.log("server running on localhost:7000");
});