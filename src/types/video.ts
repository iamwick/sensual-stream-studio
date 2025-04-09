
export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  viewCount: number;
  uploadDate: string;
  tags?: string[];
  category?: string;
  description?: string;
}

export interface VideosResponse {
  videos: Video[];
  total: number;
  page?: number;
}

export interface SearchParams {
  searchText: string;
  page: number;
  limit: number;
}

export interface CategoryParams {
  categoryId: string;
  page: number;
  limit: number;
}
