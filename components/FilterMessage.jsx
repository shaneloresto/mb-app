const FilterMessage = ({searchMessage, handleSearchMessageChange}) => (
  <div>
    <span>Show only messages containing:</span>
    <input value={searchMessage} onChange={handleSearchMessageChange} />
  </div>
);
export default FilterMessage;