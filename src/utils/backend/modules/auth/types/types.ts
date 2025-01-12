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

export interface CommunitiesDataType {
  community_name: string;
  description?: string;
  displayPic: string | null;
  memberCount: number;
}

export interface RecommendedCommunityType {
  id: string;
  community_name: string;
  membersCount: number;
  displayPic: string | null;
  content?: string;
}
