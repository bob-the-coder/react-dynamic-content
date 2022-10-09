import React from 'react';

export default function ContainerViewer({ element, manager, onUpdate }) {
  return (
    <div>
        {element.children.map(element => manager.getViewer(element, onUpdate))}
    </div>
  )
}
