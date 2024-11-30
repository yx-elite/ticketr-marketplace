import { Search } from "lucide-react";
import Form from 'next/form';

const SearchBar = () => {
  return (
    <div>
      <Form action={"/search"} className="relative">
        <input 
          type="text"
          name="q"
          placeholder="Search for events..." 
          className="w-full py-3 px-4 pl-12 bg-white rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
        <button 
          type="submit" 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
        >
          Search
        </button>
      </Form>
    </div>
  )
}

export default SearchBar