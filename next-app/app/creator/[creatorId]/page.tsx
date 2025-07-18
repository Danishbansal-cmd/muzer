import StreamView from "@/components/StreamView"


export default function Creator({
    params: {
        creatorId
    }
}: {
    params: {
        creatorId: string
    }
}) {
    return <div>
        <StreamView creatorId={creatorId} playVideo={false} spaceId="adsf" />
    </div> 
}