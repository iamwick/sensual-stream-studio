
import { useQuery } from "@tanstack/react-query";
import { VideosResponse, Video } from "@/types/video";

// Mock data for demonstration purposes
export const MOCK_VIDEOS: Video[] = [
  {
    id: "1",
    title: "Passionate Couple Enjoying Intimate Moments",
    thumbnailUrl: "https://placehold.co/640x360/1A1F2C/9b87f5?text=Video+1",
    videoUrl: "https://example.com/videos/1.mp4",
    duration: "12:34",
    viewCount: 1250000,
    uploadDate: "2 weeks ago",
    tags: ["passionate", "couple", "intimate"],
    category: "Couples",
    description: "A beautiful couple sharing their most intimate moments together in this exclusive high-definition video."
  },
  {
    id: "2",
    title: "Solo Performance with Toys",
    thumbnailUrl: "https://placehold.co/640x360/1A1F2C/D946EF?text=Video+2",
    videoUrl: "https://example.com/videos/2.mp4",
    duration: "8:22",
    viewCount: 987500,
    uploadDate: "3 days ago",
    tags: ["solo", "toys", "orgasm"],
    category: "Solo"
  },
  {
    id: "3",
    title: "Hot Threesome Exploration",
    thumbnailUrl: "https://placehold.co/640x360/1A1F2C/9b87f5?text=Video+3",
    videoUrl: "https://example.com/videos/3.mp4",
    duration: "15:47",
    viewCount: 1875000,
    uploadDate: "1 month ago",
    tags: ["threesome", "exploration", "passionate"],
    category: "Group"
  },
  {
    id: "4",
    title: "Sensual Massage Leads to More",
    thumbnailUrl: "https://placehold.co/640x360/1A1F2C/D946EF?text=Video+4",
    videoUrl: "https://example.com/videos/4.mp4",
    duration: "21:09",
    viewCount: 567800,
    uploadDate: "1 week ago",
    tags: ["massage", "sensual", "orgasm"],
    category: "Massage"
  },
  {
    id: "5",
    title: "Amateur Couple's First On-Camera Experience",
    thumbnailUrl: "https://placehold.co/640x360/1A1F2C/9b87f5?text=Video+5",
    videoUrl: "https://example.com/videos/5.mp4",
    duration: "19:23",
    viewCount: 782300,
    uploadDate: "5 days ago",
    tags: ["amateur", "couple", "first-time"],
    category: "Amateur"
  },
  {
    id: "6",
    title: "Intense BDSM Session",
    thumbnailUrl: "https://placehold.co/640x360/1A1F2C/D946EF?text=Video+6",
    videoUrl: "https://example.com/videos/6.mp4",
    duration: "25:11",
    viewCount: 1345600,
    uploadDate: "2 months ago",
    tags: ["bdsm", "intense", "roleplay"],
    category: "BDSM"
  },
  {
    id: "7",
    title: "Romantic Evening Turns Passionate",
    thumbnailUrl: "https://placehold.co/640x360/1A1F2C/9b87f5?text=Video+7",
    videoUrl: "https://example.com/videos/7.mp4",
    duration: "14:57",
    viewCount: 456700,
    uploadDate: "3 weeks ago",
    tags: ["romantic", "passionate", "couple"],
    category: "Romantic"
  },
  {
    id: "8",
    title: "Public Adventure in the Park",
    thumbnailUrl: "https://placehold.co/640x360/1A1F2C/D946EF?text=Video+8",
    videoUrl: "https://example.com/videos/8.mp4",
    duration: "10:33",
    viewCount: 892400,
    uploadDate: "4 days ago",
    tags: ["public", "adventure", "outdoor"],
    category: "Public"
  },
  {
    id: "9",
    title: "Hot Office Romance After Hours",
    thumbnailUrl: "https://placehold.co/640x360/1A1F2C/9b87f5?text=Video+9",
    videoUrl: "https://example.com/videos/9.mp4",
    duration: "17:45",
    viewCount: 567800,
    uploadDate: "1 week ago",
    tags: ["office", "romance", "roleplay"],
    category: "Office"
  },
  {
    id: "10",
    title: "Steamy Shower Session",
    thumbnailUrl: "https://placehold.co/640x360/1A1F2C/D946EF?text=Video+10",
    videoUrl: "https://example.com/videos/10.mp4",
    duration: "11:28",
    viewCount: 723400,
    uploadDate: "6 days ago",
    tags: ["shower", "wet", "solo"],
    category: "Solo"
  },
  {
    id: "11",
    title: "Exciting Roleplay Fantasy",
    thumbnailUrl: "https://placehold.co/640x360/1A1F2C/9b87f5?text=Video+11",
    videoUrl: "https://example.com/videos/11.mp4",
    duration: "22:17",
    viewCount: 1238900,
    uploadDate: "3 weeks ago",
    tags: ["roleplay", "fantasy", "costume"],
    category: "Roleplay"
  },
  {
    id: "12",
    title: "Intimate Yoga Session",
    thumbnailUrl: "https://placehold.co/640x360/1A1F2C/D946EF?text=Video+12",
    videoUrl: "https://example.com/videos/12.mp4",
    duration: "16:42",
    viewCount: 435600,
    uploadDate: "2 weeks ago",
    tags: ["yoga", "flexible", "sensual"],
    category: "Fitness"
  }
];

const fetchVideos = async (page: number = 1): Promise<VideosResponse> => {
  // Try to fetch from the API first
  try {
    const response = await fetch("/api/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page }),
    });

    if (response.ok) {
      return response.json();
    }
    
    // If API fails, return mock data
    console.log("Falling back to mock data");
    throw new Error("API fetch failed, using mock data");
  } catch (error) {
    console.log("Using mock videos data", error);
    
    // Calculate pagination for mock data
    const startIdx = (page - 1) * 12;
    const endIdx = startIdx + 12;
    const paginatedVideos = MOCK_VIDEOS.slice(startIdx, endIdx);
    
    // Simulate API response delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      videos: paginatedVideos,
      total: MOCK_VIDEOS.length,
      page
    };
  }
};

export function useVideos(page: number = 1) {
  return useQuery({
    queryKey: ["videos", page],
    queryFn: () => fetchVideos(page),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// This function would be used for SSR
export async function getVideos(page: number = 1): Promise<VideosResponse> {
  try {
    // In a real SSR environment, you'd use the full URL
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const host = process.env.VERCEL_URL || "localhost:8080";
    
    const response = await fetch(`${protocol}://${host}/api/videos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch videos");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching videos for SSR:", error);
    
    // Return mock data for SSR fallback
    const startIdx = (page - 1) * 12;
    const endIdx = startIdx + 12;
    const paginatedVideos = MOCK_VIDEOS.slice(startIdx, endIdx);
    
    return { 
      videos: paginatedVideos, 
      total: MOCK_VIDEOS.length,
      page
    };
  }
}
