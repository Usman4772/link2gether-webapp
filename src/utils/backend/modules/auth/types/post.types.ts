import { CommunityDetailPageProps, CommunityPostsProps } from "./community.types";

export interface PostProps{
  data: CommunityPostsProps;
  isAdmin?: boolean;
  isMode?: boolean;
  communityId?: string | number;
  communityDetails:CommunityDetailPageProps | undefined | null;
}