
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch?: () => void;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      if (onSearch) onSearch();
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-md">
      <div className="relative flex w-full">
        <Input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/50 pr-10 w-full"
        />
        <Button 
          type="submit"
          variant="ghost" 
          size="icon"
          className="absolute right-0 top-0 h-full text-white/70 hover:text-white"
        >
          <Search size={18} />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
