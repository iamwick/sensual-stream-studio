
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Eye, Clock, Heart, Share2, Flag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import VideoPlayer from '@/components/VideoPlayer';
import VideoGrid from '@/components/VideoGrid';
import { useVideos } from '@/hooks/useVideos';
import { Video } from '@/types/video';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const VideoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useVideos(1);
  const [video, setVideo] = useState<Video | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // In a real app, you would fetch the video by ID from an API
  // For demo purposes, we're using the videos we already have
  useEffect(() => {
    if (data?.videos && id) {
      setIsLoading(true);
      // Find video by ID
      const foundVideo = data.videos.find(v => v.id === id);
      
      if (foundVideo) {
        setVideo(foundVideo);
        
        // Get related videos (excluding current video)
        const related = data.videos
          .filter(v => v.id !== id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 8);
        
        setRelatedVideos(related);
      }
      
      setIsLoading(false);
    }
  }, [id, data]);

  // Format view count
  const formatViews = (count: number | undefined): string => {
    if (!count) return '0';
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const handleLike = () => {
    toast.success("Added to your favorites");
  };

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    toast.success("Link copied to clipboard");
  };

  const handleReport = () => {
    toast.info("Thank you for your report. We'll review this content.");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-adult-dark text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="bg-white/10 aspect-video rounded-lg mb-4"></div>
            <div className="bg-white/10 h-8 rounded w-3/4 mb-4"></div>
            <div className="bg-white/10 h-4 rounded w-1/2 mb-8"></div>
            <div className="bg-white/10 h-24 rounded mb-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-adult-dark text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Video Not Found</h1>
          <p>The video you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-adult-dark text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        {/* Video Player Section */}
        <section className="mb-6">
          <VideoPlayer video={video} className="w-full aspect-video" />
        </section>
        
        {/* Video Info Section */}
        <section className="mb-8">
          <h1 className="text-xl md:text-2xl font-bold mb-2">{video.title}</h1>
          
          <div className="flex flex-wrap items-center text-sm text-white/60 mb-4">
            <div className="flex items-center mr-4">
              <Eye size={16} className="mr-1" />
              <span>{formatViews(video.viewCount)} views</span>
            </div>
            <div className="flex items-center mr-4">
              <Clock size={16} className="mr-1" />
              <span>{video.duration}</span>
            </div>
            <span>{video.uploadDate}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/5 border-white/10 hover:bg-white/10 text-white"
              onClick={handleLike}
            >
              <Heart size={16} className="mr-2" />
              Like
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/5 border-white/10 hover:bg-white/10 text-white"
              onClick={handleShare}
            >
              <Share2 size={16} className="mr-2" />
              Share
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/5 border-white/10 hover:bg-white/10 text-white"
              onClick={handleReport}
            >
              <Flag size={16} className="mr-2" />
              Report
            </Button>
          </div>
          
          {video.description && (
            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-white/80 text-sm whitespace-pre-line">{video.description}</p>
            </div>
          )}
          
          {video.tags && video.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {video.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full hover:bg-adult-primary/20 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
        
        {/* Related Videos */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Related Videos</h2>
          <VideoGrid videos={relatedVideos} />
        </section>
      </main>
    </div>
  );
};

export default VideoPage;
