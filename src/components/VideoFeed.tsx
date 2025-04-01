// import { VideoI } from "@/models/Video";
// import VideoComponent from "./VideoComponent";
// import { useState, useEffect } from "react";

// interface VideoFeedProps {
//   videos: VideoI[];
//   title?: string;
// }

// export default function VideoFeed({ videos, title }: VideoFeedProps) {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading state for demonstration
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 800);

//     return () => clearTimeout(timer);
//   }, [videos]);

//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 py-6">
//       {title && (
//         <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
//           {title}
//         </h2>
//       )}

//       {isLoading ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {[...Array(8)].map((_, index) => (
//             <div 
//               key={`skeleton-${index}`} 
//               className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm animate-pulse h-64"
//             />
//           ))}
//         </div>
//       ) : videos.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {videos.map((video) => (
//             <div 
//               key={video._id?.toString()} 
//               className="transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
//             >
//               <VideoComponent video={video} />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
//           <svg 
//             className="w-16 h-16 text-gray-400 mb-4" 
//             fill="none" 
//             stroke="currentColor" 
//             viewBox="0 0 24 24" 
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path 
//               strokeLinecap="round" 
//               strokeLinejoin="round" 
//               strokeWidth={1.5} 
//               d="M7 4v16M17 4v16M3 8h18M3 16h18"
//             />
//           </svg>
//           <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No videos found</p>
//           <p className="text-gray-400 dark:text-gray-500 mt-2 text-center">
//             Videos you add will appear here
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }



// Insta UI =================================================================================================

// "use client"

// import { VideoI } from "@/models/Video";
// import InstagramVideoComponent from "./VideoComponent"; // Use the new Instagram-style component
// import { useState, useEffect, useRef } from "react";
// import { ArrowUp } from "lucide-react";

// interface VideoFeedProps {
//   videos: VideoI[];
//   title?: string;
// }

// export default function VideoFeed({ videos, title }: VideoFeedProps) {
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//   const [showScrollTop, setShowScrollTop] = useState(false);
//   const feedRef = useRef<HTMLDivElement>(null);

//   // Handle scroll events for showing/hiding scroll-to-top button
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 500) {
//         setShowScrollTop(true);
//       } else {
//         setShowScrollTop(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Simulate loading state
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 800);

//     return () => clearTimeout(timer);
//   }, [videos]);

//   // Scroll to top function
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });
//   };

//   // Handle keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'ArrowDown' && currentVideoIndex < videos.length - 1) {
//         setCurrentVideoIndex(prev => prev + 1);
//         const nextVideo = document.getElementById(`video-${currentVideoIndex + 1}`);
//         nextVideo?.scrollIntoView({ behavior: 'smooth' });
//       } else if (e.key === 'ArrowUp' && currentVideoIndex > 0) {
//         setCurrentVideoIndex(prev => prev - 1);
//         const prevVideo = document.getElementById(`video-${currentVideoIndex - 1}`);
//         prevVideo?.scrollIntoView({ behavior: 'smooth' });
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [currentVideoIndex, videos.length]);

//   return (
//     <div className="w-full max-w-lg mx-auto px-4 py-6" ref={feedRef}>
//       {title && (
//         <div className="flex items-center justify-between mb-6 sticky top-0 z-10 bg-white dark:bg-gray-900 py-2 border-b border-gray-200 dark:border-gray-800">
//           <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
//             {title}
//           </h2>
//           <div className="flex space-x-2">
//             {/* Instagram-style camera icon */}
//             <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//             </button>
//             {/* Instagram-style messages icon */}
//             <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       )}

//       {isLoading ? (
//         <div className="space-y-6">
//           {[...Array(3)].map((_, index) => (
//             <div 
//               key={`skeleton-${index}`} 
//               className="rounded-lg overflow-hidden shadow animate-pulse"
//             >
//               {/* Header skeleton */}
//               <div className="p-3 flex items-center">
//                 <div className="rounded-full bg-gray-300 dark:bg-gray-700 h-8 w-8"></div>
//                 <div className="ml-3 w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
//               </div>
//               {/* Video skeleton */}
//               <div className="bg-gray-300 dark:bg-gray-700 w-full" style={{ aspectRatio: "9/16" }}></div>
//               {/* Action bar skeleton */}
//               <div className="p-3">
//                 <div className="flex space-x-4 mb-2">
//                   <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
//                   <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
//                   <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
//                 </div>
//                 <div className="w-20 h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
//                 <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : videos.length > 0 ? (
//         <div className="space-y-4">
//           {videos.map((video, index) => (
//             <div 
//               id={`video-${index}`}
//               key={video._id?.toString()} 
//               className={`snap-start ${index === currentVideoIndex ? 'ring-2 ring-blue-500 rounded-lg' : ''}`}
//             >
//               <InstagramVideoComponent video={video} />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
//           <svg 
//             className="w-16 h-16 text-gray-400 mb-4" 
//             fill="none" 
//             stroke="currentColor" 
//             viewBox="0 0 24 24" 
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path 
//               strokeLinecap="round" 
//               strokeLinejoin="round" 
//               strokeWidth={1.5} 
//               d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
//             />
//           </svg>
//           <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No videos found</p>
//           <p className="text-gray-400 dark:text-gray-500 mt-2 text-center">
//             Videos you add will appear here
//           </p>
//         </div>
//       )}

//       {/* Scroll to top button - Instagram style */}
//       {showScrollTop && (
//         <button 
//           onClick={scrollToTop}
//           className="fixed bottom-6 right-6 bg-gray-800 text-white dark:bg-white dark:text-gray-800 rounded-full p-3 shadow-lg hover:bg-gray-700 dark:hover:bg-gray-200 transition-all duration-300"
//         >
//           <ArrowUp size={20} />
//         </button>
//       )}

//       {/* Instagram-style bottom navigation bar */}
//       <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-3 px-6 flex justify-between items-center">
//         <button className="focus:outline-none">
//           <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//             <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
//           </svg>
//         </button>
//         <button className="focus:outline-none">
//           <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//         </button>
//         <button className="focus:outline-none">
//           <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//         </button>
//         <button className="focus:outline-none">
//           <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//           </svg>
//         </button>
//         <button className="focus:outline-none">
//           <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-gray-300">
//             <img src="/api/placeholder/28/28" alt="Profile" className="w-full h-full object-cover" />
//           </div>
//         </button>
//       </div>
//     </div>
//   );
// }


// new ui =======================================================
"use client"

import { VideoI } from "@/models/Video";
import VideoComponent from "./VideoComponent"; // Assuming this is the base video component
import { useState, useEffect, useRef } from "react";
import { ArrowUp, Search, Home, PlusCircle, Heart, Menu, Grid, List, Play, Settings, ChevronUp, ChevronDown } from "lucide-react";

interface VideoFeedProps {
  videos: VideoI[];
  title?: string;
}

export default function VideoFeed({ videos, title }: VideoFeedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const feedRef = useRef<HTMLDivElement>(null);

  // Handle scroll events for showing/hiding scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [videos]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Navigate to next video
  const goToNextVideo = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(prevIndex => prevIndex + 1);
      const nextVideo = document.getElementById(`video-${currentVideoIndex + 1}`);
      if (nextVideo) {
        nextVideo.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Navigate to previous video
  const goToPrevVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(prevIndex => prevIndex - 1);
      const prevVideo = document.getElementById(`video-${currentVideoIndex - 1}`);
      if (prevVideo) {
        prevVideo.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'j') {
        goToNextVideo();
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        goToPrevVideo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentVideoIndex, videos.length]);

  // Only show navigation buttons when in list view and we have videos
  const showNavButtons = viewMode === 'list' && videos.length > 0 && !isLoading;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden md:flex flex-col w-16 lg:w-64 fixed left-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4 lg:p-6">
          <h1 className="hidden lg:block text-xl font-bold text-indigo-600 dark:text-indigo-400">VideoVault</h1>
          <div className="lg:hidden flex justify-center">
            <Play className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
        
        <nav className="mt-6 flex flex-col flex-1 space-y-2 px-3">
          <button className="flex items-center p-2 lg:px-4 lg:py-3 rounded-lg text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 font-medium">
            <Home className="h-5 w-5 lg:mr-3" />
            <span className="hidden lg:inline">Home</span>
          </button>
          
          <button className="flex items-center p-2 lg:px-4 lg:py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Search className="h-5 w-5 lg:mr-3" />
            <span className="hidden lg:inline">Discover</span>
          </button>
          
          <button className="flex items-center p-2 lg:px-4 lg:py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Heart className="h-5 w-5 lg:mr-3" />
            <span className="hidden lg:inline">Favorites</span>
          </button>
          
          <button className="flex items-center p-2 lg:px-4 lg:py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Settings className="h-5 w-5 lg:mr-3" />
            <span className="hidden lg:inline">Settings</span>
          </button>
        </nav>
        
        <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-100 dark:bg-indigo-900">
              <img src="/api/placeholder/32/32" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="hidden lg:block ml-3">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Profile</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full md:ml-16 lg:ml-64 min-h-screen">
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 py-3 px-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            {/* Mobile Logo - hidden on desktop */}
            <div className="flex md:hidden items-center">
              <Play className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <span className="ml-2 font-bold text-gray-800 dark:text-gray-100">VideoVault</span>
            </div>
            
            <div className="hidden md:block">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {title || "Discover Videos"}
              </h2>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* View mode toggles */}
              <div className="hidden md:flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
                >
                  <List className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
              </div>
              
              {/* Action buttons */}
              <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors">
                <PlusCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        <main ref={feedRef} className="max-w-6xl mx-auto px-4 py-6 relative">
          {isLoading ? (
            <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-6'}`}>
              {[...Array(6)].map((_, index) => (
                <div 
                  key={`skeleton-${index}`} 
                  className="rounded-xl overflow-hidden shadow-md bg-white dark:bg-gray-800 animate-pulse"
                >
                  {/* Header skeleton */}
                  <div className="p-3 flex items-center">
                    <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-8 w-8"></div>
                    <div className="ml-3 w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  {/* Video skeleton */}
                  <div className="bg-gray-200 dark:bg-gray-700 w-full" style={{ aspectRatio: viewMode === 'grid' ? "1" : "16/9" }}></div>
                  {/* Action bar skeleton */}
                  <div className="p-3">
                    <div className="flex space-x-4 mb-2">
                      <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                      <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                      <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    </div>
                    <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : videos.length > 0 ? (
            <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}`}>
              {videos.map((video, index) => (
                <div 
                  id={`video-${index}`}
                  key={video._id?.toString()} 
                  className={`rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow ${
                    index === currentVideoIndex ? 'ring-2 ring-indigo-500 dark:ring-indigo-400' : ''
                  }`}
                >
                  <VideoComponent 
                    video={video} 
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
              <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4">
                <Play className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
              </div>
              <p className="text-gray-800 dark:text-gray-200 text-lg font-medium">No videos found</p>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
                Start creating or discover new content
              </p>
              <button className="mt-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                Explore videos
              </button>
            </div>
          )}

          {/* Video Navigation Buttons - only visible in list view */}
          {showNavButtons && (
            <>
              {/* Previous Video Button - disabled if at first video */}
              <button 
                onClick={goToPrevVideo}
                disabled={currentVideoIndex === 0}
                className={`fixed z-40 left-4 md:left-24 lg:left-72 top-1/2 transform -translate-y-16 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg 
                  ${currentVideoIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'} 
                  transition-all duration-300`}
                aria-label="Previous video"
              >
                <ChevronUp size={24} className="text-gray-800 dark:text-gray-200" />
              </button>
              
              {/* Next Video Button - disabled if at last video */}
              <button 
                onClick={goToNextVideo}
                disabled={currentVideoIndex === videos.length - 1}
                className={`fixed z-40 left-4 md:left-24 lg:left-72 top-1/2 transform translate-y-16 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg 
                  ${currentVideoIndex === videos.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'} 
                  transition-all duration-300`}
                aria-label="Next video"
              >
                <ChevronDown size={24} className="text-gray-800 dark:text-gray-200" />
              </button>
            </>
          )}
        </main>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-20 md:bottom-6 right-6 bg-indigo-600 text-white dark:bg-indigo-500 rounded-full p-3 shadow-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Mobile Navigation Bar - hidden on desktop */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-3 px-4 flex justify-between items-center z-50">
        <button className="flex flex-col items-center justify-center">
          <Home className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs mt-1 text-gray-600 dark:text-gray-300">Home</span>
        </button>
        
        <button className="flex flex-col items-center justify-center">
          <Search className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">Search</span>
        </button>
        
        <button className="flex flex-col items-center justify-center bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full -mt-8 border-4 border-white dark:border-gray-800">
          <PlusCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </button>
        
        <button className="flex flex-col items-center justify-center">
          <Heart className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">Favorites</span>
        </button>
        
        <button className="flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img src="/api/placeholder/24/24" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
          <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">Profile</span>
        </button>
      </div>
    </div>
  );
}