import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { NotFound } from "./error/NotFoundError";
import cookieParser from "cookie-parser";
import { AuthRoutes } from "./modules/Auth/auth.route";
import { FacilityRoutes } from "./modules/Facility/facility.route";
import { BookingRoutes } from "./modules/Booking/booking.route";
import { BookingControllers } from "./modules/Booking/booking.controller";


const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use("/api/auth", AuthRoutes);
app.use("/api/facility", FacilityRoutes);
app.use("/api/bookings", BookingRoutes);
app.use("/api/check-availability", BookingControllers.checkAvailability);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Sports Facility Booking Platform Project!");
});

app.use("*", NotFound);
app.use(globalErrorHandler)
export default app;
