const FilterBar = ({ currentFilter, onFilterChange, searchTerm, onSearchChange }) => {
  const filters = [
    { key: 'all', label: 'All Tasks' },
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' },
    { key: 'high', label: 'High Priority' },
    { key: 'medium', label: 'Medium Priority' },
    { key: 'low', label: 'Low Priority' }
  ]

  return (
    <div className="glass-card p-5 rounded-2xl border border-slate-600 border-opacity-30">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        {/* Search Input */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="glass w-full pl-10 pr-4 py-3 text-slate-200 placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {filters.map(filter => (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`px-3 py-2 text-sm font-medium rounded-xl backdrop-blur-sm border border-slate-600 border-opacity-30 transition-all duration-200 transform hover:scale-105 ${
                currentFilter === filter.key
                  ? 'bg-slate-700 text-slate-200 shadow-lg'
                  : 'bg-slate-800 bg-opacity-50 text-slate-400 hover:bg-slate-700 hover:text-slate-300'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterBar