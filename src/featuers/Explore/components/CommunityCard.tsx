import Image from "next/image";
import { CommunityCardProps } from "./Explore";

export const CommunityCard = ({
  community_name,
  avatar,
  onClick,
}: CommunityCardProps) => {
  return (
    <div
      className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
      onClick={onClick}
    >
      <div className="w-full aspect-square bg-[#e8dfd3] rounded-xl flex items-center justify-center mb-2">
        <div className="w-full h-full relative">
          <Image
            src={avatar || "/default-avatar.jpeg"}
            alt={community_name}
            fill
            className="object-contain"
          />
        </div>
      </div>
      <span className="text-sm font-medium text-center">{community_name}</span>
    </div>
  );
};