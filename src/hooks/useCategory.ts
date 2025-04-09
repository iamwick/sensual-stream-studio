
import { useQuery } from "@tanstack/react-query";
import { VideosResponse } from "@/types/video";
import { MOCK_VIDEOS } from "@/hooks/useVideos";

interface CategoryParams {
  categoryId: string;
  page: number;
  limit: number;
}

const fetchCategoryVideos = async (params: CategoryParams): Promise<VideosResponse> => {
  // Try to fetch from the API first
  try {
    const response = await fetch("/api/videos/category", {
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
    console.log("Falling back to mock category data");
    throw new Error("API category fetch failed, using mock data");
  } catch (error) {
    console.log(`Using mock data for category ${params.categoryId}`, error);
    
    // Filter videos by category
    const categoryId = params.categoryId.toLowerCase();
    const filteredVideos = MOCK_VIDEOS.filter(video => 
      video.category?.toLowerCase() === categoryId
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

export function useCategory(categoryId: string, page: number = 1, limit: number = 24) {
  return useQuery({
    queryKey: ["category", categoryId, page, limit],
    queryFn: () => fetchCategoryVideos({ categoryId, page, limit }),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// For SSR
export async function getCategoryVideos(categoryId: string, page: number = 1, limit: number = 24): Promise<VideosResponse> {
  try {
    // In a real environment, you'd use the full URL
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const host = process.env.VERCEL_URL || "localhost:8080";
    
    const response = await fetch(`${protocol}://${host}/api/videos/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryId, page, limit }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch category videos: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching videos for category ${categoryId}:`, error);
    
    // Mock category data for SSR fallback
    const categoryIdLower = categoryId.toLowerCase();
    const filteredVideos = MOCK_VIDEOS.filter(video => 
      video.category?.toLowerCase() === categoryIdLower
    );
    
    const startIdx = (page - 1) * limit;
    const endIdx = startIdx + limit;
    
    return { 
      videos: filteredVideos.slice(startIdx, endIdx), 
      total: filteredVideos.length 
    };
  }
}
