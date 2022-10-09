import React from 'react';
import ElementView from '../LiveEditor/ElementView';

export default function ContainerViewer({ element, manager, onUpdate }) {
  return (
    <ElementView element={element} manager={manager}>
        {element.children.map(element => manager.getViewer(element, onUpdate))}
    </ElementView>
  )
}
