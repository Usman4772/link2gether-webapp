import { validateChangePasswordPayload } from "@/utils/backend/helpers/auth.helpers";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import {
    changePassword,
    connectToDatabase
} from "@/utils/backend/modules/auth/services/authServices";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const { user } = await validateToken(req);
        const data = await validateChangePasswordPayload(req);
        await changePassword(data, user);
        return SUCCESS_RESPONSE(data, 200, "Password changed successfully");
    } catch (error) {
        return errorHandler(error);
    }
}


