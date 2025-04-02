import { Users } from 'lucide-react';
import React from 'react'

function NoCommunitiesCreated() {
  return (
    <div className="py-6">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-gray-100 rounded-lg">
          <Users className="h-5 w-5 text-gray-500" />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-1">Your Communities</h3>
          <p className="text-gray-500">Follow communities to see them here</p>
        </div>
      </div>
    </div>
  );
}

export default NoCommunitiesCreated