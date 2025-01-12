class apiErrors extends Error {
  status: number;
  errors: any[];
  success: boolean;

  constructor(
    errors: any[] = [],
    message: string = "Something went wrong",
    status: number = 500
  ) {
    super(message);
    (this.message = message), (this.status = status), (this.success = false);
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default apiErrors;
