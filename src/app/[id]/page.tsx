"use client"
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import UserProfileInfo from '@/components/UserProfileInfo';

export default function UserProfile({ params }: { params: { id: string } }) {

  const { id } = params;

  // This would come from your API in a real app
  const [userData] = useState({
    username: 'creativecreator',
    displayName: 'Creative Creator',
    avatar: '/api/placeholder/150/150',
    bio: 'Digital creator | Making awesome reels daily | Follow for more content',
    stats: {
      followers: 3,
      following: 325,
      likes: 15732084,
    },
    isVerified: true,
    isFollowing: false,
    reels: [
      { id: 1, thumbnail: '/api/placeholder/300/500', views: '1.2M', likes: '89K' },
      { id: 2, thumbnail: '/api/placeholder/300/500', views: '3.5M', likes: '267K' },
      { id: 3, thumbnail: '/api/placeholder/300/500', views: '756K', likes: '42K' },
      { id: 4, thumbnail: '/api/placeholder/300/500', views: '2.1M', likes: '155K' },
      { id: 5, thumbnail: '/api/placeholder/300/500', views: '543K', likes: '37K' },
      { id: 6, thumbnail: '/api/placeholder/300/500', views: '1.8M', likes: '122K' },
      { id: 7, thumbnail: '/api/placeholder/300/500', views: '980K', likes: '78K' },
      { id: 8, thumbnail: '/api/placeholder/300/500', views: '1.5M', likes: '103K' },
      { id: 9, thumbnail: '/api/placeholder/300/500', views: '2.7M', likes: '189K' },
    ]
  });

  const [activeTab, setActiveTab] = useState('reels');

  

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>{userData.displayName} (@{userData.username}) | Reels</title>
        <meta name="description" content={userData.bio} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">{userData.username}</div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Profile Section */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <UserProfileInfo id={id} />

        {/* Tabs */}
        <div className="border-b dark:border-gray-700 mb-4">
          <div className="flex justify-around">
            <button 
              onClick={() => setActiveTab('reels')}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'reels' 
                  ? 'border-b-2 border-pink-500 text-pink-500' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Reels
            </button>
            <button 
              onClick={() => setActiveTab('liked')}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'liked' 
                  ? 'border-b-2 border-pink-500 text-pink-500' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Liked
            </button>
            <button 
              onClick={() => setActiveTab('tagged')}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'tagged' 
                  ? 'border-b-2 border-pink-500 text-pink-500' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Tagged
            </button>
          </div>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-3 gap-1 md:gap-3">
          {userData.reels.map(reel => (
            <div key={reel.id} className="aspect-[3/5] relative group cursor-pointer">
              <Image 
                src={reel.thumbnail} 
                alt={`Reel ${reel.id}`} 
                layout="fill" 
                objectFit="cover" 
                className="rounded"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 text-white flex items-center space-x-3">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    {reel.views}
                  </span>
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                    {reel.likes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="sticky bottom-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 py-2">
        <div className="container mx-auto">
          <div className="flex justify-around">
            <button className="p-2 text-gray-700 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
            <button className="p-2 text-gray-700 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 text-pink-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button className="p-2 text-gray-700 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="p-2 text-gray-700 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// // In a real app, you would fetch this data from your API
// export async function getServerSideProps(context) {
//   const { username } = context.params;
  
//   // Here you would normally fetch user data from your API
//   // const user = await fetchUserData(username);
  
//   return {
//     props: {
//       // user
//     }
//   };
// }