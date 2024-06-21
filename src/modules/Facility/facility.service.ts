import httpStatus from "http-status";

import { Facility } from "./facility.model";
import { TFacility } from "./facility.interface";
import AppError from "../../error/AppErrors";

const createFacility = async (payload: TFacility) => {
  const result = await Facility.create(payload);
  return result;
};

const getAllFacilities = async () => {
  const result = await Facility.find({});
  return result;
};

const updateFacility = async (id: string, payload: Partial<TFacility>) => {
  const facility = await Facility.findById(id);

  if (!facility) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }

  const result = await Facility.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteFacility = async (id: string) => {
  const facility = await Facility.findById(id);

  if (!facility) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }

  const result = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const FacilityServices = {
  createFacility,
  getAllFacilities,
  updateFacility,
  deleteFacility,
};