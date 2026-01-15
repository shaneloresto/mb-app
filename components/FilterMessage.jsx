const FilterMessage = ({searchMessage, handleSearchMessageChange}) => (
  <div className="flex flex-col">
    <label className="label mt-5 text-base-content">Filter Messages: </label>
    <input type="text" className="input mt-1 w-78 md:w-156" value={searchMessage} onChange={handleSearchMessageChange} placeholder="Show only messages containing..." />
  </div>
);
export default FilterMessage;