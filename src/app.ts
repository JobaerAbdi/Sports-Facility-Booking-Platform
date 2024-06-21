import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { NotFound } from "./error/NotFoundError";
import cookieParser from "cookie-parser";


const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());


// app.use("/api/auth", UserRoutes)
// app.use("/api/auth", AuthRoutes)


app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Sports Facility Booking Platform Project!",
  });
});

app.use((req:Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.use("*", NotFound);
app.use(globalErrorHandler)
export default app;
