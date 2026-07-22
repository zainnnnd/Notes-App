

function SearchBar({ search, setSearch}) {
  return (
    <div>
      <input
        type="text"
        placeholder='Search Notes...'
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="focus:shadow-[0_0_20px_rgba(6, 182, 212, 0.5)]"
      />
    </div>
  )
}

export default SearchBar
