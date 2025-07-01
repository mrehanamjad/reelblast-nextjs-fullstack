import VideoComponent from "@/components/VideoComps/VideoComponent";

type Params = Promise<{ id: string }>

export default async function SingleVideoPage(props: { params: Params }) {
   const params = await props.params;
    const id = params.id;


  async function fetchVideoData(videoId: string) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/videos/${videoId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch video data");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching video data:", error);
      return null;
    }
  }

  const videoData = id ? await fetchVideoData(id) : null;

  if (!videoData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            Video not found or failed to load. (ID: {id})
          </h1>
        </div>
      </div>
    );
  }

  return (
    <VideoComponent video={videoData} />
  );
}
