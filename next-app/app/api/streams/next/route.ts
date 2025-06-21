import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Stream from "stream";

export async function GET(req: NextRequest){
    const session = await getServerSession();

    const user = await prismaClient.user.findFirst({
        where: {
            email: session?.user?.email ?? ""
        }
    });

    if(!user){
        return NextResponse.json({
            message: "Unautenticated"
        },{
            status: 403
        })
    }

    const mostUpvotedStream = await prismaClient.stream.findFirst({
        where: {
            userId: user.id
        },
        orderBy: {
            upvotes: {
                _count: 'desc'
            }
        }
    });

    // to be continued here also
    // await Promise.all([prismaClient.currentStream.upsert({
    //     where: {
    //         userId: user.id
    //     },
    //     update: {
    //         streamId: mostUpvotedStream?.id
    //     },
    //     create: {
    //         userId: user.id,
    //         streamId: mostUpvotedStream?.id
    //     }
    // }), prismaClient.currentStream.delete({
    //     where: {
    //         streamId: mostUpvotedStream?.id ?? ""
    //     },
    // })])

    return NextResponse.json({
        stream: mostUpvotedStream
    })
}