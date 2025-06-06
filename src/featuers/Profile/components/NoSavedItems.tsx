import { Bookmark } from "lucide-react";
import React from "react";

function NoSavedItems({
  title = "Saved Posts",
  subTitle = "You haven't saved any posts yet.",
}: {
  title?: string;
  subTitle?: string;
}) {
  return (
    <div className="py-6">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-gray-100 rounded-lg">
          <Bookmark className="h-5 w-5 text-gray-500" />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-1">{title}</h3>
          <p className="text-gray-500">{subTitle}</p>
        </div>
      </div>
    </div>
  );
}

export default NoSavedItems;
