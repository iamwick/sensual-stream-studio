
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import VideoGrid from '@/components/VideoGrid';
import { useCategory } from '@/hooks/useCategory';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useIsMobile } from '@/hooks/use-mobile';

// Helper function to capitalize first letter of each word
const formatCategoryName = (id: string): string => {
  return id
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const CategoryPage: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useCategory(id, page);
  const isMobile = useIsMobile();
  const categoryName = formatCategoryName(id);
  
  // Reset to page 1 when category changes
  useEffect(() => {
    setPage(1);
  }, [id]);

  // Calculate pagination
  const totalPages = data ? Math.ceil(data.total / 24) : 0;
  const showPagination = totalPages > 1;
  
  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pages = [];
    const maxDisplayedPages = isMobile ? 3 : 5;
    let startPage = Math.max(1, page - Math.floor(maxDisplayedPages / 2));
    const endPage = Math.min(startPage + maxDisplayedPages - 1, totalPages);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxDisplayedPages) {
      startPage = Math.max(1, endPage - maxDisplayedPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen bg-adult-dark text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">{categoryName} Videos</h1>
          {data && <p className="text-white/60 mt-1">{data.total} videos found</p>}
        </div>
        
        {isError ? (
          <div className="text-center py-10">
            <p className="text-white/60">Error loading videos. Please try again later.</p>
          </div>
        ) : (
          <>
            <VideoGrid 
              videos={data?.videos || []} 
              loading={isLoading} 
            />
            
            {showPagination && (
              <div className="mt-8 mb-12">
                <Pagination>
                  <PaginationContent>
                    {page > 1 && (
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setPage(p => Math.max(1, p - 1))}
                          className="cursor-pointer bg-white/5 border-white/10 hover:bg-white/10 text-white"
                        />
                      </PaginationItem>
                    )}
                    
                    {generatePageNumbers().map(pageNum => (
                      <PaginationItem key={pageNum}>
                        <PaginationLink 
                          isActive={pageNum === page}
                          onClick={() => setPage(pageNum)}
                          className={`cursor-pointer ${
                            pageNum === page 
                              ? "bg-adult-primary text-white" 
                              : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                          }`}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    {page < totalPages && (
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                          className="cursor-pointer bg-white/5 border-white/10 hover:bg-white/10 text-white"
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
            
            {data && data.videos.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <p className="text-xl mb-2">No videos found in {categoryName}</p>
                <p className="text-white/60">Try browsing other categories</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;
