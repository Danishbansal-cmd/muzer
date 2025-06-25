"use client"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "../ui/card";
import { Play } from "lucide-react";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { YT_REGEX } from "@/lib/utils";
import { AppBar } from "@/components/Appbar";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
//@ts-ignore
import YoutubePlayer from 'youtube-player';


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
    // to be continued here
    // const { socket, sendMessage } = useSocket();
    const [inputLink, setInputLink] = useState("");
    const [queue, setQueue] = useState<Video[]>([]);
    const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
    const [loading, setLoading] = useState(false);
    const videoPlayerRef = useRef<HTMLDivElement>(null);

    async function refreshStreams() {
        const res = await fetch(`/api/streams/?creatorid=-${creatorId}`, {
            credentials: "include"
        });
        const json = await res.json();
        setQueue(json.streams.sort((a: any, b: any) => a.upvotes < b.upvotes ? 1 : -1));
        setCurrentVideo(video => {
            if(video?.id === json.activeStream?.stream?.id){
                return video;
            }
            return json.activeStream.stream;
        });
    }

    useEffect(() => {
        refreshStreams();
        const interval = setInterval(() => {
            refreshStreams();
        }, REFRESh_INTERVAL_MS)
    }, []);

    useEffect(() => {
        // in actuall videoPlayerRef should refer to the dom element and if it
        // is empty or undefined or null then simply return
        if(!videoPlayerRef.current || !currentVideo){
            return;
        }
        // here we are using the videoPlayerRef.current which store the dom element
        // and passing to the YoutubePlayer function, which then creates the player 
        // inside that videoPlayerRef.current element or value
        let player = YoutubePlayer(videoPlayerRef.current);
        player.loadVideoById(currentVideo?.extractedId);
        player.playVideo();

        // handles the event when a change occur in the player
        function eventHandler(event: any) {
            console.log(event);
            console.log(event.data);
            // when the video has reached the end, it prints 0
            // and when it ended we just called the function to play the
            // next video
            if(event.data === 0){
                playNext();
            }
        }
        player.on('stateChange', eventHandler);
        
        // 🚩
        // may need to debug here
        return () => {
            player = null;
        }
    },[currentVideo, videoPlayerRef]);

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

    const playNext =  async () => {
        if(queue.length > 0){
            setPlayNextLoader(true);
            try{
                const data = await fetch("/api/streams/next", {
                    method : "POST"
                })
                const json = await data.json();
                setCurrentVideo(json.stream);
                setQueue(q => q.filter(x => x.id !== json.stream?.id));
            } catch(e){

            }
            setPlayNextLoader(false);
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg=[rgb(10,10,10)] text-gray-200">
            <AppBar showThemeSwitch={false}/>
            <div className="flex justify-cneter">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-5 w-screen max-w-screen-xl pt-8 ">
                    <div className="col-span-3">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">Upcoming Songs</h2>
                            {queue.length == 0 && <Card className="bg-gray-900 border-gray-800 w-full">
                                <CardContent  className="p-4">
                                    <p className="text-center py-8 text-gray-400">No Videos in Queue</p>
                                </CardContent>
                            </Card>}
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
                    <div>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">Now Playing</h2>
                            <Card className="bg-gray-900 border-gray-800">
                                <CardContent className="p-4">
                                    {currentVideo ? 
                                    (
                                        <div>
                                            {playVideo ? 
                                                <>
                                                <div ref={videoPlayerRef} className="w-full"/>  
                                                {/* <iframe width={"100%"} height={300} src={`https://www.youtube.com/embed/${currentVideo.extractedId}?autoplay=1`}
                                                allow="autoplay"></iframe>  */}
                                                </>
                                                :
                                                <>
                                                <img src={currentVideo.bigImg}
                                                alt="Current Video"
                                                className="w-full h-72 object-cover rounded"/>
                                                <p className="mt-2 text-center font-semibold text-white">{currentVideo.title}</p>
                                                </> 
                                            }
                                        </div>
                                    )
                                    : (
                                        <p className="text-center py-8 text-gray-400">No video playing</p>
                                    )}
                                </CardContent>
                            </Card>
                            {
                                playVideo && <Button disabled={playNextLoader} onClick={playNext} className="w-full bg-purple-700 hover:bg-purple-800 text-white">
                                    <Play className="mr-2 h-4 w-4"/> {playNextLoader ? "Loading..." : "Play Next"}
                                </Button>
                            }
                        </div>
                    </div>
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