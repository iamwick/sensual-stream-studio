
import React from 'react';
import VideoCard from '@/components/VideoCard';
import { Video } from '@/types/video';
import { useIsMobile } from '@/hooks/use-mobile';

interface VideoGridProps {
  videos: Video[];
  loading?: boolean;
  title?: string;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, loading = false, title }) => {
  const isMobile = useIsMobile();
  
  // Generate skeleton loaders for loading state
  const skeletons = Array(8).fill(0).map((_, i) => (
    <div key={`skeleton-${i}`} className="animate-pulse">
      <div className="bg-white/10 aspect-video rounded-lg mb-2"></div>
      <div className="bg-white/10 h-4 rounded w-3/4 mb-2"></div>
      <div className="bg-white/10 h-3 rounded w-1/2"></div>
    </div>
  ));

  return (
    <div className="mb-8">
      {title && (
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">{title}</h2>
      )}
      
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6`}>
        {loading
          ? skeletons
          : videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
      </div>

      {!loading && videos.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-white/60">
          <p className="text-lg">No videos found</p>
        </div>
      )}
    </div>
  );
};

export default VideoGrid;
