
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, Eye } from 'lucide-react';
import { Video } from '@/types/video';

interface VideoCardProps {
  video: Video;
  className?: string;
}

// Function to format view count
const formatViews = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

const VideoCard: React.FC<VideoCardProps> = ({ video, className = '' }) => {
  return (
    <div className={`group overflow-hidden rounded-lg transition-all duration-300 ${className}`}>
      <Link to={`/video/${video.id}`} className="block relative aspect-video overflow-hidden rounded-lg">
        {/* Thumbnail */}
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
          <Clock size={12} />
          <span>{video.duration}</span>
        </div>
        
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-adult-primary/80 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play size={24} fill="white" className="ml-1" />
          </div>
        </div>
      </Link>
      
      {/* Video details */}
      <div className="mt-3">
        <Link to={`/video/${video.id}`} className="block">
          <h3 className="text-white font-medium line-clamp-2 group-hover:text-adult-primary transition-colors">
            {video.title}
          </h3>
        </Link>
        
        <div className="flex items-center mt-2 text-sm text-white/60">
          <div className="flex items-center">
            <Eye size={14} className="mr-1" />
            <span>{formatViews(video.viewCount)} views</span>
          </div>
          <span className="mx-2">•</span>
          <span>{video.uploadDate}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
