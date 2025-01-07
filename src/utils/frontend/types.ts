import { Mongoose, ObjectId } from "mongoose";

export interface FormInputProps {
  placeholder: string;
  name?: string;
}

export interface UserPayload {
  id: any;
  username: string;
  email: string;
  profileImage: string | null;
  remember: boolean;
  token: string;
}
