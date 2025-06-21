"use client"
import { useEffect, useState } from "react"
import { Card, CardContent } from "../ui/card";

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { YT_REGEX } from "@/app/lib/utils";
import { AppBar } from "@/app/components/Appbar";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";


interface Video {
    "id": string,
    "type": string,
    "url": string,
    "extractedId": string,
    "title": string,
    "smallImg": string,
    "bigImg": string,
    "active": boolean,
    "upvotes": number,
    "userId": string,
    "haveUpvoted": boolean
}


const REFRESh_INTERVAL_MS = 10 * 1000;

export default function StreamView({ creatorId, playVideo = false, spaceId }: {
    creatorId: string,
    playVideo: boolean,
    spaceId: string
}) {

    const [playNextLoader, setPlayNextLoader] = useState(false);
    const [spaceName, setSapceName] = useState("");
    // to be continued here also
    // const { socket, sendMessage } = useSocket();
    const [inputLink, setInputLink] = useState("");
    const [queue, setQueue] = useState<Video[]>([]);
    const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
    const [loading, setLoading] = useState(false);

    async function refreshStreams() {
        const res = await fetch(`/api/streams/?creatorid=-${creatorId}`, {
            credentials: "include"
        });
        const json = await res.json();
        setQueue(json.streams.sort((a: any, b: any) => a.upvotes < b.upvotes ? 1 : -1));
    }

    useEffect(() => {
        refreshStreams();
        const interval = setInterval(() => {
            // refreshStreams();
        }, REFRESh_INTERVAL_MS)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch("/api/streams/", {
            method: "POST",
            body: JSON.stringify({
                creatorId,
                url: inputLink
            })
        });
        setQueue([...queue, await res.json()]);
        setLoading(false);
        setInputLink('');
    }



    const handleVote = (id: String, isUpvote: boolean) => {
        setQueue(queue.map((video) =>
            video.id === id ? {
                ...video,
                upvotes: isUpvote ? video.upvotes + 1 : video.upvotes - 1,
                haveUpvoted: !video.haveUpvoted
            } : video
        ).sort((a, b) => (b.upvotes) - (a.upvotes)));

        fetch(`/api/streams/${isUpvote ? "upvote" : "downvote"}`, {
            method: "POST",
            body: JSON.stringify({
                streamId: id
            })
        })
    }

    return (
        <div className="flex flex-col min-h-screen bg=[rgb(10,10,10)] text-gray-200">
            <AppBar />
            <div className="flex justify-cneter">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-5 max-w-screen-xl pt-8 ">
                    <div className="col-span-3">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">Upcoming Songs</h2>
                            {queue.map((video) => (
                                <Card key={video.id} className="bg-gray-900 border-gray-800">
                                    <CardContent className="p-4 flex items-center space-x-4">
                                        <img
                                            src={video.smallImg}
                                            alt={`Thumbnail for ${video.title}`}
                                            className="w-30 h-20 object-cover rounded"
                                        />
                                        <div className="flex-grow">
                                            <h3 className="font-semibold text-white">{video.title}</h3>
                                            <div className="flex items-center space-x-2 mt-2">
                                                <Button
                                                    variant="outline"
                                                    size='sm'
                                                    onClick={() => handleVote(video.id, video.haveUpvoted ? false : true)}
                                                    className="flex items-center space-x-1 bg-gray-800 text-white border-gray-700
                                        hover:bg-gray-700"
                                                >
                                                    {video.haveUpvoted ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                                                    <span>{video.upvotes}</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>

            {inputLink && inputLink.match(YT_REGEX) && !loading && (
                <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-4">
                        <LiteYouTubeEmbed id={inputLink.split("?v=")[1]} title="" />
                    </CardContent>
                </Card>
            )}
        </div>
    );
}