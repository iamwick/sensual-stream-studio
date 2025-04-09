
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import VideoGrid from '@/components/VideoGrid';
import { useVideos } from '@/hooks/useVideos';
import { Video } from '@/types/video';

// We're simulating featured videos and categories since we don't have that endpoint
const MOCK_CATEGORIES = [
  { id: 'amateur', name: 'Amateur', count: 1256 },
  { id: 'anal', name: 'Anal', count: 987 },
  { id: 'bdsm', name: 'BDSM', count: 547 },
  { id: 'big-tits', name: 'Big Tits', count: 1432 },
  { id: 'blowjob', name: 'Blowjob', count: 2145 },
  { id: 'brunette', name: 'Brunette', count: 876 },
  { id: 'creampie', name: 'Creampie', count: 654 },
  { id: 'cumshot', name: 'Cumshot', count: 1234 },
];

const Index: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useVideos(page);
  const [featuredVideos, setFeaturedVideos] = useState<Video[]>([]);

  useEffect(() => {
    if (data?.videos && data.videos.length > 0) {
      // Select 4 random videos as featured for demo purposes
      const randomVideos = [...data.videos]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      
      setFeaturedVideos(randomVideos);
    }
  }, [data]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-adult-dark text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="rounded-xl overflow-hidden relative h-64 md:h-96 mb-6">
            {featuredVideos.length > 0 && (
              <div className="absolute inset-0">
                <img 
                  src={featuredVideos[0]?.thumbnailUrl} 
                  alt="Featured" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-adult-dark via-adult-dark/70 to-transparent" />
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 text-gradient">
                Welcome to SensualStream
              </h1>
              <p className="text-sm md:text-base text-white/80 max-w-2xl mb-4">
                Discover the most intimate and high-quality adult content.
                Unlimited streaming, in HD quality.
              </p>
            </div>
          </div>
        </section>
        
        {/* Featured Videos */}
        {featuredVideos.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-bold">Featured Videos</h2>
              <Link to="/featured" className="text-adult-primary hover:text-adult-secondary flex items-center text-sm">
                See All <ChevronRight size={16} />
              </Link>
            </div>
            
            <VideoGrid videos={featuredVideos} loading={isLoading} />
          </section>
        )}
        
        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Popular Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {MOCK_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 transition-colors"
              >
                <h3 className="font-medium text-white">{category.name}</h3>
                <p className="text-sm text-white/60">{category.count} videos</p>
              </Link>
            ))}
          </div>
        </section>
        
        {/* All Videos */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-4">Recently Added</h2>
          
          {isError ? (
            <div className="text-center py-10">
              <p className="text-white/60">Error loading videos. Please try again later.</p>
            </div>
          ) : (
            <>
              <VideoGrid videos={data?.videos || []} loading={isLoading} />
              
              {data && data.videos.length > 0 && (
                <div className="text-center mt-8">
                  <Button 
                    onClick={loadMore}
                    className="bg-adult-primary hover:bg-adult-secondary text-white"
                    disabled={isLoading || page * 24 >= (data?.total || 0)}
                  >
                    {isLoading ? 'Loading...' : 'Load More'}
                  </Button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm mb-4 md:mb-0">
              © 2025 SensualStream. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/terms" className="text-white/60 hover:text-white text-sm">Terms of Service</Link>
              <Link to="/privacy" className="text-white/60 hover:text-white text-sm">Privacy Policy</Link>
              <Link to="/dmca" className="text-white/60 hover:text-white text-sm">DMCA</Link>
              <Link to="/2257" className="text-white/60 hover:text-white text-sm">2257 Statement</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
