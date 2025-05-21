import BannedUser from "@/models/bannedUsers";

export async function transformAdminCommunityDetails(community: any) {
    return {
        id: community._id,
        community_name: community.community_name,
        description: community.description,
        visibility: community.visibility,
        created_at: community.created_at,
    };
}

export function getReportedPostsPayload(posts: any) {
    return posts.map((post: any) => {
        return {
            id: post._id,
            post_id: post?.post_id?._id,
            posted_by: post?.post_id?.author,
            last_reported_by: post.reported_by[0],
            community_id: post.community_id,
            report_count: post.report_count,
            reason: post.reason,
            status: post.status,
            reported_at: post.created_at,
        };
    });
}


export async function getCommunityMembersPayload(data: any) {
    // Filter members that are not the creator
    const filteredMembers = data.members.filter(
        (member: any) => member?._id.toString() !== data?.createdBy?.toString()
    );

    // Create an array of promises
    const memberPromises = filteredMembers.map(async (member: any) => {
        const bannedUser = await BannedUser.findOne({
            user: member?._id,
            community: data?._id
        });
        const isBanned = bannedUser ?
            data?.bannedUsers?.some((banned: any) => banned.user.toString() === member._id.toString()) :
            false;

        return {
            id: member._id,
            username: member.username,
            profileImage: member.profileImage,
            email: member.email,
            created_at: member.created_at,
            isBanned: isBanned,
            role: data.moderators?.toString().includes(member?._id?.toString())
                ? "moderator"
                : "user",
        };
    });

    // Wait for all promises to resolve
    return await Promise.all(memberPromises);
}