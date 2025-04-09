
import { useQuery } from "@tanstack/react-query";
import { SearchParams, VideosResponse } from "@/types/video";
import { MOCK_VIDEOS } from "@/hooks/useVideos";

const searchVideos = async (params: SearchParams): Promise<VideosResponse> => {
  // Try to fetch from the API first
  try {
    const response = await fetch("/api/videos/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (response.ok) {
      return response.json();
    }
    
    // If API fails, return mock data
    console.log("Falling back to mock search data");
    throw new Error("API search failed, using mock data");
  } catch (error) {
    console.log("Using mock search data", error);
    
    // Filter videos by search text
    const searchText = params.searchText.toLowerCase();
    const filteredVideos = MOCK_VIDEOS.filter(video => 
      video.title.toLowerCase().includes(searchText) || 
      video.tags?.some(tag => tag.toLowerCase().includes(searchText)) ||
      video.category?.toLowerCase().includes(searchText)
    );
    
    // Calculate pagination
    const startIdx = (params.page - 1) * params.limit;
    const endIdx = startIdx + params.limit;
    const paginatedVideos = filteredVideos.slice(startIdx, endIdx);
    
    // Simulate API response delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      videos: paginatedVideos,
      total: filteredVideos.length,
    };
  }
};

export function useSearch(searchText: string, page: number = 1, limit: number = 24) {
  return useQuery({
    queryKey: ["search", searchText, page, limit],
    queryFn: () => searchVideos({ searchText, page, limit }),
    enabled: searchText.length > 0,
    keepPreviousData: true,
  });
}

// For SSR
export async function performSearch(searchText: string, page: number = 1, limit: number = 24): Promise<VideosResponse> {
  try {
    // In a real environment, you'd use the full URL
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const host = process.env.VERCEL_URL || "localhost:8080";
    
    const response = await fetch(`${protocol}://${host}/api/videos/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchText, page, limit }),
    });

    if (!response.ok) {
      throw new Error("Failed to search videos");
    }

    return response.json();
  } catch (error) {
    console.error("Error searching videos for SSR:", error);
    
    // Mock search for SSR fallback
    const searchTermLower = searchText.toLowerCase();
    const filteredVideos = MOCK_VIDEOS.filter(video => 
      video.title.toLowerCase().includes(searchTermLower) || 
      video.tags?.some(tag => tag.toLowerCase().includes(searchTermLower)) ||
      video.category?.toLowerCase().includes(searchTermLower)
    );
    
    const startIdx = (page - 1) * limit;
    const endIdx = startIdx + limit;
    
    return { 
      videos: filteredVideos.slice(startIdx, endIdx), 
      total: filteredVideos.length 
    };
  }
}
