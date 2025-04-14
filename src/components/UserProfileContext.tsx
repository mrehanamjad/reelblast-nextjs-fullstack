"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useSession } from "next-auth/react";
import { UserProfileInfoI } from "./UserComps/UserProfileInfo";

interface UserProfileContextType {
  user: UserProfileInfoI | null;
  loading: boolean;
  refetchUser: () => Promise<void>;
  addOrRemoveToSavedReels: (id:string) => void;
}

const UserProfileContext = createContext<UserProfileContextType>({
  user: null,
  loading: true,
  refetchUser: async () => {},
  addOrRemoveToSavedReels: () => {},
});

export const useUserProfile = () => useContext(UserProfileContext);

function UserProfileProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserProfileInfoI | null>(null);
  const [loading, setLoading] = useState(true);

  const addOrRemoveToSavedReels = (id: string) => {
    if (!user) return;

    setUser((prevUser) => {
      const updatedSavedReels = prevUser!.savedReels.includes(id)
        ? prevUser!.savedReels.filter((reelId) => reelId !== id) 
        : [...prevUser!.savedReels, id]; 

      return {
        ...prevUser!,
        savedReels: updatedSavedReels,
      };
    });
  };

  const fetchUser = useCallback(async () => {
    if (!session?.user?.username) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/user/${session.user.username}`);
      if (!res.ok) throw new Error("User not found");

      const data = await res.json();
      setUser(data);
      console.log("I am saved  to context api");
    } catch (err) {
      console.error(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.username]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserProfileContext.Provider
      value={{ user, loading, refetchUser: fetchUser, addOrRemoveToSavedReels }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export default UserProfileProvider;
