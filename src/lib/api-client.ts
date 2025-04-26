import { VideoI } from "@/models/Video";
import mongoose from "mongoose";

export type VideoFormData = Omit<VideoI, "_id">;

export interface VidI extends VideoI {
  user: {
    userName: string;
    profilePic: {
        url?: string;
        id?: string;
    }
  };
}

type FetchOpts = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
};

export interface UserProfileInfoI {
  userId: string;
  userName: string;
  name: string;
  bio?: string;
  createdAt: string | Date;
  phone?: string;
  profilePic: {
    url: string;
    id: string;
  };
  followers: string[]; // Assuming array of user IDs
  followings: string[]; // Assuming array of user IDs
  savedReels: string[];
  socialLinks?: string[];
}

interface saveVideoI {
  success: boolean;
  message: string;
  savedVideos: number;
}

export interface UserInfoI {
  userId: string;
  name?: string;
  username?: string;
  bio?: string;
  profilePicUrl?: string;
  profilePicId?: string;
  phone?: string;
  socialLinks?: string[];
}

export interface SearchUserI {
  name: string;
  userName: string;
  bio?: string;
  _id: string;
  profilePic: {
    id?: string;
    url: string;
  };
}

export interface SearchVideoI {
  _id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoIdImagekit: string;
  videoUrl: string;
  userId: {
    _id: string;
    userName: string;
    profilePic: {
      id?: string;
      url: string;
    };
  };
}

export interface SearchResponse {
    users: SearchUserI[];
    videos: SearchVideoI[];
  }

class ApiClient {
  private async myFetch<T>(
    endpoint: string,
    options: FetchOpts = {} as FetchOpts
  ): Promise<T> {
    const { method = "GET", body, headers = {} } = options;
    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    const response = await fetch(`/api${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }

  //user Methods
  async getUser(username: string) {
    return await this.myFetch<UserProfileInfoI>(`/user/${username}`);
  }

  async updateUser(data: UserInfoI) {
    return await this.myFetch("/user/update", { method: "PATCH", body: data });
  }

  async getVideos() {
    return await this.myFetch<VidI[]>("/videos");
  }

  async follow(bothUser: { followerId: string; followingId: string }) {
    return await this.myFetch("/user/follow", {
      method: "POST",
      body: bothUser,
    });
  }

  async getAVideo(id: string) {
    return await this.myFetch<VidI>(`/videos/${id}`);
  }

  async getUserVideos(username: string) {
    return await this.myFetch<VidI[]>(`/user/${username}/videos`);
  }

  async getSavedVideos() {
    return await this.myFetch<VidI[]>("/videos/feed/save");
  }

  async createVideo(video: VideoFormData) {
    return await this.myFetch("/videos", { method: "POST", body: video });
  }

  async saveVideo(videoId: string | mongoose.Types.ObjectId) {
    return await this.myFetch<saveVideoI>(`/videos/${videoId}/save`, {
      method: "PATCH",
    });
  }

  async editVideo(id: string, data: { title?: string; description?: string }) {
    return await this.myFetch(`/videos/${id}/edit`, {
      method: "PATCH",
      body: data,
    });
  }

  async deleteVideo(id: string) {
    return await this.myFetch(`/videos/${id}/delete`, { method: "DELETE" });
  }

  async delFile(id: string, fileType: "video" | "profilePic" | "thumbnail") {
    return await this.myFetch(`/imagekit/delete-file`, {
      method: "DELETE",
      body: { id, fileType },
    });
  }

  async search(query: string) {
    return await this.myFetch<SearchResponse>(`/search?q=${query}`);
  }
}

export const apiClient = new ApiClient();
