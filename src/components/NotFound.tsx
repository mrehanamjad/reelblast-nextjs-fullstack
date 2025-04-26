import React from 'react'

export interface NotFoundI {
    icon: React.ReactNode;
    message: string;
    subMessage: string;
  }

function NotFound({NotFound}: { NotFound: NotFoundI }) {


  return (
    <main className="container mx-auto px-4 py-6 mb-4">
    <div className="flex flex-col items-center justify-center h-64">
      {NotFound.icon}
      <h2 className="text-xl font-medium text-gray-600">
        {NotFound.message}
      </h2>
      <p className="text-gray-500 mt-2">{NotFound.subMessage}</p>
    </div>
  </main>   
  )
}

export default NotFound