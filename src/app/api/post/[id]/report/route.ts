import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { validateCommunityAndPost, validateReportPostPayload } from "@/utils/backend/helpers/post.helpers";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { reportPost } from "@/utils/backend/modules/auth/services/post.services";
import { ReportPostPayload } from "@/utils/backend/modules/auth/types/community.types";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const postId = req.nextUrl.pathname.split("/")[3];
    const data: ReportPostPayload = await validateReportPostPayload(req);
    await validateCommunityAndPost(data.community_id, postId);
    await reportPost({ data, postId, userId });
    return SUCCESS_RESPONSE(
      [],
      200,
      "This Post has been reported to community admin soon they will take action"
    );
  } catch (error) {
    return errorHandler(error);
  }
}




