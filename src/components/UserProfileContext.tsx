"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useSession } from "next-auth/react";
import { apiClient, UserProfileInfoI } from "@/lib/api-client";


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

      const data = await apiClient.getUser(session.user.username);
      setUser(data);
    } catch (err) {
      console.error("User not found",err);
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
