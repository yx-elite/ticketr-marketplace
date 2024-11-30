"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="relative">
        <input 
          type="text" 
          placeholder="Search for events..." 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          className="w-full py-3 px-4 pl-12 bg-white rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
        <button 
          type="submit" 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchBar