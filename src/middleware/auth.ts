import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/asyncHandler";
import AppError from "../error/AppErrors";
import { TUserRole } from "../modules/User/user.interface";
import { User } from "../modules/User/user.model";
import config from "../config";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const authToken = req.headers.authorization;
    if (!authToken) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route",
      );
    }
    const token = authToken.replace("Bearer ", "");

    const decode = jwt.verify(token, 
      config.jwt_access_secret as string
    );

    const { email, role } = decode as JwtPayload;

    const user = await User.isUserExistsByEmail(email);
    if (!user) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route",
      );
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route",
      );
    }

    req.user = decode as JwtPayload;
    next();
  });
};
export default auth;
