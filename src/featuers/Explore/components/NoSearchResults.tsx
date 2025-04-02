import type React from "react"

interface NoSearchResultsProps {
  searchTerm?: string
}

const NoSearchResults: React.FC<NoSearchResultsProps> = ({ searchTerm }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-8 w-40 h-40 relative">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-full h-full">
          <defs>
            <linearGradient id="searchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f3f4f6" />
              <stop offset="100%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>

          {/* Magnifying glass */}
          <circle cx="203" cy="203" r="130" fill="white" stroke="#e5e7eb" strokeWidth="20" />
          <path d="M300,300 L380,380" stroke="#d1d5db" strokeWidth="40" strokeLinecap="round" />

          {/* X mark */}
          <path d="M230,173 L176,227" stroke="#d1d5db" strokeWidth="20" strokeLinecap="round" />
          <path d="M176,173 L230,227" stroke="#d1d5db" strokeWidth="20" strokeLinecap="round" />
        </svg>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Results Found</h2>
      <p className="text-gray-500 text-center max-w-md">
        {searchTerm
          ? `We couldn't find any results for "${searchTerm}". Try different keywords or filters.`
          : "No matching results found. Try adjusting your search criteria."}
      </p>
    </div>
  )
}

export default NoSearchResults

