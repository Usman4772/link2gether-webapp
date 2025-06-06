import {errorHandler, validateToken} from "@/utils/backend/helpers/globals";
import {NextRequest} from "next/server";
import {connectToDatabase} from "@/utils/backend/modules/auth/services/authServices";
import {SUCCESS_RESPONSE} from "@/utils/backend/helpers/responseHelpers";
import User from "@/models/user";
import Community from "@/models/community";
import Posts from "@/models/posts";


export async function GET(req: NextRequest) {
    try {
        await connectToDatabase()
        await validateToken(req)
        const query = req.nextUrl.searchParams.get("query") as string;
        const results = await search(query)
        return SUCCESS_RESPONSE(results, 200, "Search results fetched successfully")
    } catch (error) {
        return errorHandler(error)
    }
}


async function search(query: string) {
    console.log(query, 'query')
    if (!query || query.trim() === "") return [];

    const users = await User.find({
        username: {$regex: query, $options: "i"},
    }).select("_id username profileImage");

    const communities = await Community.find({
        community_name: {$regex: query, $options: "i"},
    }).select("_id community_name avatar members description");

    const posts = await Posts.find({
        description: {$regex: query, $options: "i"},
    }).select("_id description");


    return {
        users:[...users.map((user) => ({
            ...user.toObject(),
            type: "user",
        }))],
        communities:[...communities.map((community) => ({
            ...community.toObject(),
            type: "community",
        }))],
        posts:[...posts.map((post) => ({
            ...post.toObject(),
            type: "post",
        }))]
    }
}
