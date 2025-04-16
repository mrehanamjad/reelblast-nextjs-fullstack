import VideoFeedSM from "../../components/VideoComps/VideoFeedSM";

const SavedReelsPage = () => {

  return (
    <div className="bg-gray-50 dark:bg-black/95 min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white sticky top-0 z-10 border-b border-gray-200 dark:border-gray-600 dark:bg-black dark:text-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Saved Reels</h1>
          </div>
        </div>
      </header>

      <VideoFeedSM apiName="save" />
    </div>
  );
};

export default SavedReelsPage;
