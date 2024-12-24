export interface userValidationError {
  error: any;
  message?: string;
}
export interface LoginProps {
  email: string;
  password: string;
  remember?: boolean;
}
