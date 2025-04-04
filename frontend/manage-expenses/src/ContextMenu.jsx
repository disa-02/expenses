import React from 'react';
import './styles/ContextMenu.css'

export const ContextMenu = ({ x, y, onEdit, onDelete }) => {
  return (
    <div className="context-menu" style={{ top: y, left: x }}>
      {/* <div className="context-menu-item" onClick={onEdit}>Edit</div> */}
      <div className="context-menu-item" onClick={onDelete}>Delete</div>
    </div>
  );
};