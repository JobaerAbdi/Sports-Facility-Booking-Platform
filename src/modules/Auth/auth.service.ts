import httpStatus from "http-status";
import { TUser } from "../User/user.interface";
import bcrypt from "bcrypt";
import AppError from "../../error/AppErrors";
import { User } from "../User/user.model";
import config from "../../config";
import { createToken } from "./auth.utils";

const signUp = async (payload: TUser) => {
  const user = await User.isUserExistsByEmail(payload.email);
  if (user) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This email is already registered",
    );
  }

  const result = await User.create(payload);
  return result;
};

const login = async (payload: { email: string; password: string }) => {
  const user = await User.isUserExistsByEmail(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }

  const passwordMatch = await bcrypt.compare(payload.password, user.password);
  if (!passwordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Wrong password");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  
  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    "365d",
  );

  return { 
    token, 
    user 
  };
  
};

export const authServices = {
  signUp,
  login,
};
