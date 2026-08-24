import { useState } from 'react';

const EditMessageForm = ({ messageText, modifyMessage, onCancel }) => {
  const [modifiedText, setModifiedText] = useState(messageText);

  const handleFormSubmit = event => {
    event.preventDefault();
    if (modifiedText.trim()) {
      modifyMessage(modifiedText.trim());
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex items-center gap-2 w-full my-1">
      <input
        type="text"
        className="input input-sm input-bordered flex-1 rounded-lg text-sm"
        value={modifiedText}
        onChange={event => setModifiedText(event.target.value)}
        autoFocus
      />
      <button
        type="submit"
        className="py-1 px-3 rounded-lg bg-neutral text-neutral-content text-xs font-medium hover:bg-neutral-focus transition-all"
      >
        Save
      </button>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="py-1 px-2.5 rounded-lg border border-base-300 text-xs font-medium text-base-content/70 hover:bg-base-200 transition-all"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default EditMessageForm;