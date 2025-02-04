import Tokens from "@/models/tokens";
import { errorHandler } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import {
  checkUserExistence,
  connectToDatabase,
  createToken,
  createUser,
  getTokenExpiration,
  handleMediaUpload,
  hashPassword,
  parseRegisterFormData,
  userPayload,
  validateUserData,
} from "@/utils/backend/modules/auth/services/authServices";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const userData = await parseRegisterFormData(req);
    validateUserData(userData, "register");
    await checkUserExistence(userData.email);
    const hashedPassword = await hashPassword(userData.password);
    const imageUrl = await handleMediaUpload(userData.profileImage);
    const user = await createUser({
      ...userData,
      password: hashedPassword,
      profileImage: imageUrl,
    });
    const token = createToken(user._id);
    const expires_at = getTokenExpiration(false);
    await Tokens.create({ token, userId: user?._id, expires_at });
    user.remember = false;
    await user.save();
    const payload = userPayload(user, token);
    return SUCCESS_RESPONSE(payload, 201, "User  created successfully");
  } catch (error: any) {
    return errorHandler(error);
  }
}
