import { GeneralCommunityTypes } from "@/utils/enums/enums";

export interface CommunityDetailPageProps {
  id: string | number;
  community_name: string;
  description: string | null;
  visibility: "public" | "private";
  rules: Array<{
    rule: string;
  }>;
  category: GeneralCommunityTypes;
  cover: string | null;
  avatar: string | null;
  isMode: boolean;
  moderators: number;
  isMember: boolean;
  memberCount: number;
  isBanned: boolean;
  created_at: string;
  createdBy: {
    id: string | number;
    username: string;
  };
  memberShipStatus: "joined" | "not_requested" | "requested";
  isAdmin: boolean;
}

export interface CommunityPostsProps {
  id: string | number;
  description: string | null;
  media: null | string;
  type: "text" | "image" | "video";
  created_at: string;
  author: {
    id: string | number;
    username: string;
    profileImage: string | null;
  };
  community?: {
    id: string | number | undefined;
    community_name: string | undefined;
    avatar: string | null | undefined;
    createdBy?: string | number | null | undefined;
  };
  likes: number;
  comments: number;
  isLiked: boolean;
  isSaved: boolean;
}


export interface BanUserProps{
  reason: string;
  duration: string;
}



export interface ReportPostPayload {
  community_id: string;
  reason: string;
}

export interface ReportPostProps {
  data: ReportPostPayload;
  postId: string;
  userId: any;
}