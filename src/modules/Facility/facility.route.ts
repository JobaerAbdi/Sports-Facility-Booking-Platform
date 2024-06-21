import express from "express";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../User/user.constant";
import { FacilityValidation } from "./facility.validation";
import { FacilityControllers } from "./facility.controller";

const router = express.Router();


router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(FacilityValidation.createFacilityValidation),
  FacilityControllers.createFacility,
);


router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(FacilityValidation.updateFacilityValidation),
  FacilityControllers.updateFacility,
);

router.delete(
  "/:id",
  auth(USER_ROLE.admin),
  FacilityControllers.deleteFacility,
);


router.get(
    "/", 
    FacilityControllers.getAllFacilities
);

export const FacilityRoutes = router;
