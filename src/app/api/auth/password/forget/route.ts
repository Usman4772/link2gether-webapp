import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import {
    connectToDatabase
} from "@/utils/backend/modules/auth/services/authServices";
import { NextRequest } from "next/server";
import {forgotPasswordSchema} from "@/utils/backend/validation-schema/auth.schema";
import apiErrors from "@/utils/backend/helpers/apiErrors";
export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const { user } = await validateToken(req);

        return SUCCESS_RESPONSE([], 200, "A password reset link has been sent to your email.");
    } catch (error) {
        return errorHandler(error);
    }
}





async function sendPasswordResetLink(email:string) {
    validateEmail(email);

//create reset token.
    //add token and username + email in that reset token
    // store in database
    // send user email with that reset link combining with frontend URL
}


function validateEmail(email:string){
    const result = forgotPasswordSchema.safeParse(email);
    if (!result.success) {
        const errors = result.error?.errors.map((err) => {
            return {
                [err?.path.toString()]: err?.message,
            };
        });
        throw new apiErrors(errors, "Validation errors found", 400);
    }
}


function createResetToken(email:string) {


}


function sendEmail(){

}