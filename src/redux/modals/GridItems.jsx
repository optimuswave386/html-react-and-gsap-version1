import React, { useState } from 'react';
import './GridWithCheckboxes.css'; // Add some CSS for the grid layout

const itemsList = [
  { id: 1, name: 'Item A' },
  { id: 2, name: 'Item B' },
  { id: 3, name: 'Item C' },
  { id: 4, name: 'Item D' },
  { id: 5, name: 'Item E' },
  { id: 6, name: 'Item F' },
];

const GridWithCheckboxes = () => {
  // State to manage selected item IDs
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        // Item is already selected, so remove it
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        // Item is not selected, so add it
        return [...prevSelectedItems, itemId];
      }
    });
  };
  
  const isSelected = (itemId) => selectedItems.includes(itemId);

  return (
    <div className="grid-container">
      {itemsList.map((item) => (
        <div key={item.id} style={{ backgroundColor:'white', padding: '5px' }} className={`grid-item ${isSelected(item.id) ? 'selected' : ''}`}>
          <label>
            <input
              type="checkbox"
              checked={isSelected(item.id)}
              onChange={() => handleCheckboxChange(item.id)}
            />
            {item.name}
          </label>
        </div>
      ))}
      <div className="selected-info">
        Selected IDs: {selectedItems.join(', ')}
      </div>
    </div>
  );
};

export default GridWithCheckboxes;