import {
  CommunityDetailPageProps,
  CommunityPostsProps,
} from "./community.types";

export interface PostProps {
  data: CommunityPostsProps;
  isAdmin?: boolean;
  isMode?: boolean;
  isPublicPage?: boolean;
  communityId?: string | number;
  communityDetails?: any,
  className?: string;
  
}
