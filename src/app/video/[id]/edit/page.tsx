import VideoComponent from "@/components/VideoComps/VideoComponent";
import VideoUploadForm from "@/components/VideoComps/VideoUploadForm";


export default async function VideoEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params; 

  async function fetchVideoData(videoId: string) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/videos/${videoId}`)
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


  const videoData = id ? await fetchVideoData(id): null;


  if (!videoData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            Video not found or failed to load.
            {id}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Reel</h1>
        <div className="w-full flex h-full -space-x-24">
        <VideoComponent video={videoData} />
        <VideoUploadForm
          mode="edit"
          editData={{
            title: videoData.title,
            description: videoData.description,
            videoUrl: videoData.videoUrl,
            videoIdImagekit: videoData.videoIdImagekit!,
            videoId: videoData._id.toString(),
          }}
        />
      </div>
      </div>
    </div>
  );
}
