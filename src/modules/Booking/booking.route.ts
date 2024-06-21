import express from "express";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../User/user.constant";
import { BookingValidation } from "./booking.validation";
import { BookingControllers } from "./booking.controller";

const router = express.Router();

router.get(
    "/", 
    auth(USER_ROLE.admin), 
    BookingControllers.getAllBooking
);

router.get("/user", 
    auth(USER_ROLE.user), 
    BookingControllers.getUserBooking
);

router.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(BookingValidation.createBooking),
  BookingControllers.createBooking,
);

router.delete("/:id", 
    auth(USER_ROLE.user), 
    BookingControllers.cancelBooking
);

export const BookingRoutes = router;
