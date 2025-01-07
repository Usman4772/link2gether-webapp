export interface userValidationError {
  error: any;
  message?: string;
}
export interface LoginProps {
  email: string;
  password: string;
  remember?: boolean;
}

export interface CommunityProps {
  community_name: string;
  category: string;
  description?: string;
  displayPIc?: Blob | null;
}
