export async function transformAdminCommunityDetails(community: any) {
  return {
    id: community._id,
    community_name: community.name,
    description: community.description,
    visibility: community.visibility,
    created_at: community.created_at,
  };
}
