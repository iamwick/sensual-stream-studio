
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import VideoGrid from '@/components/VideoGrid';
import SearchBar from '@/components/SearchBar';
import { useSearch } from '@/hooks/useSearch';
import { Button } from '@/components/ui/button';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';
  const [page, setPage] = useState(1);
  
  const { data, isLoading, isError } = useSearch(searchQuery, page);
  
  // Reset page when search query changes
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);
  
  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-adult-dark text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Search Results</h1>
          <div className="max-w-lg">
            <SearchBar initialValue={searchQuery} />
          </div>
        </div>
        
        {/* Search Results */}
        {searchQuery ? (
          <>
            <div className="mb-4">
              <h2 className="text-xl">
                Results for "{searchQuery}"
                {data && <span className="text-white/60 ml-2">({data.total} videos found)</span>}
              </h2>
            </div>
            
            {isError ? (
              <div className="text-center py-10">
                <p className="text-white/60">Error searching videos. Please try again later.</p>
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
                
                {data && data.videos.length === 0 && !isLoading && (
                  <div className="text-center py-12">
                    <p className="text-xl mb-2">No videos found matching "{searchQuery}"</p>
                    <p className="text-white/60">Try searching with different keywords</p>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl mb-2">Enter a search term above</p>
            <p className="text-white/60">Search for videos by title, tag, or category</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
