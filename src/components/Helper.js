import { useState } from 'react';

const HelpModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className="help-button"
        onClick={() => setIsOpen(true)}
      >
        ?
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
            <h3>PokeList Help</h3>
            <p>Browse through different Pokémon using the pagination controls.</p>
            <p>Use the search bar to find specific Pokémon.</p>
            <p>Created by Lorenzo Ramón Pérez Morales for BlueAxe.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpModal;