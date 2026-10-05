const FilterMessage = ({ searchMessage, handleSearchMessageChange }) => (
  <div className="w-full">
    <div className="relative">
      <input
        type="text"
        className="input input-bordered w-full rounded-lg bg-base-100 text-sm"
        value={searchMessage}
        onChange={handleSearchMessageChange}
        placeholder="Filter messages by text..."
      />
    </div>
  </div>
);

export default FilterMessage;