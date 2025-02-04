import { NextResponse } from "next/server";

interface SuccessResponse {
  message: string;
  success: boolean;
  data: any;
}
interface ErrorResponse {
  message: string;
  success: boolean;
  errors: any;
}

export function SUCCESS_RESPONSE(
  data: any,
  status: number,
  message: string
): NextResponse<SuccessResponse> {
  return NextResponse.json(
    {
      message,
      success: true,
      data: data,
    },
    { status: status }
  );
}
