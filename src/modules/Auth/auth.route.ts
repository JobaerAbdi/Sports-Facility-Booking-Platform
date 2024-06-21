import express from "express";
import { authValidation } from "./auth.validation";
import validateRequest from "../../middleware/validateRequest";
import { userValidation } from "../User/user.validation";
import { authControllers } from "./auth.controller";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidation.createUserValidation),
  authControllers.signUp,
);


router.post(
  "/login",
  validateRequest(authValidation.loginValidation),
  authControllers.login,
);

export const AuthRoutes = router;
