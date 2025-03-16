// import Community from "@/models/community";
// import User from "@/models/user";
// import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
// import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
// import { NextRequest } from "next/server";
// import moment from "moment";

// export async function GET(req: NextRequest, { params }) {
//   try {
//     await connectToDatabase();
//     const { userId } = await validateToken(req);
//     const { communityId } = params;
//     const filter = req.nextUrl.searchParams.get("filter"); // "week", "month", "year"

//     const community = await Community.findById(communityId);
//     if (!community || community.createdBy.toString() !== userId) {
//       return new Response(
//         JSON.stringify({ message: "Community not found or access denied" }),
//         { status: 403 }
//       );
//     }

//     // Define time ranges for week, month, and year
//     const now = moment();
//     const startOfWeek = now.startOf("isoWeek").toDate();
//     const startOfMonth = now.startOf("month").toDate();
//     const startOfYear = now.startOf("year").toDate();

//     let growthData;
//     if (filter === "week") {
//       growthData = await getGrowthData(communityId, startOfWeek, "day");
//     } else if (filter === "month") {
//       growthData = await getGrowthData(communityId, startOfMonth, "day");
//     } else if (filter === "year") {
//       growthData = await getGrowthData(communityId, startOfYear, "month");
//     } else {
//       return new Response(JSON.stringify({ message: "Invalid filter" }), {
//         status: 400,
//       });
//     }

//     return new Response(JSON.stringify(growthData), { status: 200 });
//   } catch (error) {
//     return errorHandler(error);
//   }
// }

// // 🔹 Helper function to fetch members count grouped by day/month
// async function getGrowthData(communityId, startDate, type) {
//   const groupBy =
//     type === "day" ? { $dayOfMonth: "$created_at" } : { $month: "$created_at" };

//   const memberGrowth = await User.aggregate([
//     {
//       $match: {
//         communityMemberships: communityId,
//         created_at: { $gte: startDate },
//       },
//     },
//     { $group: { _id: groupBy, count: { $sum: 1 } } },
//     { $sort: { _id: 1 } },
//   ]);

//   return formatGrowthData(memberGrowth, type);
// }

// // 🔹 Format data for chart
// function formatGrowthData(data, type) {
//   const labels =
//     type === "day"
//       ? Array.from({ length: 31 }, (_, i) =>
//           (i + 1).toString().padStart(2, "0")
//         ) // Days of the month
//       : [
//           "Jan",
//           "Feb",
//           "Mar",
//           "Apr",
//           "May",
//           "Jun",
//           "Jul",
//           "Aug",
//           "Sep",
//           "Oct",
//           "Nov",
//           "Dec",
//         ];

//   return labels.map((label, index) => ({
//     [type]: label,
//     membersJoined: data.find((d) => d._id === index + 1)?.count || 0,
//   }));
// }



//!Note this is temporary implementation.