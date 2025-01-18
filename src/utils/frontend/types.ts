import { Mongoose, ObjectId } from "mongoose";

export interface FormInputProps {
  placeholder: string;
  name?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface UserPayload {
  id: any;
  username: string;
  email: string;
  onboardingStatus: string;
  profileImage: string | null;
  remember: boolean;
  token: string;
}
