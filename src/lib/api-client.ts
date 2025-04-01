import { VideoI } from "@/models/Video";

export type VideoFormData = Omit<VideoI,"_id"> 

type FetchOpts = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body: any;
    headers?: Record<string, string>;
}

class ApiClient {
    private async myFetch<T>(
        endpoint: string,
        options: FetchOpts = {} as FetchOpts,
    ):Promise<T> {
        const {method = "GET", body, headers={}} = options;
        const defaultHeaders = {
            'Content-Type': 'application/json',
            ...headers
        } 

        const response = await fetch(`/api${endpoint}`,{
            method,
            headers: defaultHeaders,
            body: body ? JSON.stringify(body) : undefined,
        })

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return response.json();
    }

    async getVideos(){
        return await this.myFetch<VideoI[]>('/videos');
    }

    async getAVideo(id: string){
        return await this.myFetch<VideoI>(`/videos/${id}`);
    }

    async createVideo(video: VideoFormData){
        return await this.myFetch('/videos', {method: 'POST', body: video});
    }
}

export const apiClient = new ApiClient();
