
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search as SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/SearchBar';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <nav className="sticky top-0 z-50 w-full bg-adult-dark/95 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gradient mr-8">
              SensualStream
            </Link>
            
            {!isMobile && (
              <div className="hidden md:flex space-x-6">
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
                <Link to="/categories" className="text-white/80 hover:text-white transition-colors">
                  Categories
                </Link>
                <Link to="/trending" className="text-white/80 hover:text-white transition-colors">
                  Trending
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {!isMobile ? (
              <SearchBar onSearch={() => {}} />
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleSearch}
                  className="text-white/80 hover:text-white"
                >
                  <SearchIcon size={20} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={toggleMenu}
                  className="md:hidden text-white/80 hover:text-white"
                >
                  {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile search panel */}
        {isMobile && isSearchOpen && (
          <div className="pt-3 pb-2">
            <SearchBar onSearch={() => setIsSearchOpen(false)} />
          </div>
        )}

        {/* Mobile menu */}
        {isMobile && isMenuOpen && (
          <div className="mt-3 py-4 border-t border-white/10">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-white/80 hover:text-white transition-colors" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/categories" className="text-white/80 hover:text-white transition-colors" onClick={toggleMenu}>
                Categories
              </Link>
              <Link to="/trending" className="text-white/80 hover:text-white transition-colors" onClick={toggleMenu}>
                Trending
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
