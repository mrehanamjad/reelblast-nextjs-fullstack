import { SearchUserI } from "@/lib/api-client";
import React from "react";
import UserCard from "./UserCard";
import NotFound, { NotFoundI } from "../NotFound"; 
import ScreenLoader from "../ScreenLoader";


function UserFeed({ users, notFound, isLoading=false }: { users: SearchUserI[]; notFound: NotFoundI; isLoading?: boolean }) {


    if (isLoading) {
        return (
          <main className="container mx-auto px-4 py-6 mb-4">
            <ScreenLoader />
          </main>
        );
      }

  if (!users || users.length === 0) {
    return (
     <NotFound NotFound={notFound}  />
    );
  }

  return (
    <div className="flex flex-col gap-2 py-10">
      {users.map((user, i) => (
        <UserCard key={i} ProfilePicUrl={user.profilePic.url} {...user} />
      ))}
    </div>
  );
}

export default UserFeed;
