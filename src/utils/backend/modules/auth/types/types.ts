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
  avatar?: Blob | null;
}

export interface CommunitiesDataType {
  id: string;
  community_name: string;
  description?: string;
  avatar: string | null;
  memberCount: number;
}

export interface RecommendedCommunityType {
  id: string;
  community_name: string;
  membersCount: number;
  avatar: string | null;
  content?: string;
}
