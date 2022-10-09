import React from 'react';
import { ElementType, ElementTypeName } from '../ContentModel';

export default function ElementView({ element, manager, children }) {
    let className = `element-view element-view--${ElementTypeName[element.type].toLowerCase()}`;
    if (element.type !== ElementType.Container){
        if (element.highlight) {
            className += ' element-view--highlight';
        } else if (manager.isHighlighting()) {
            className += ' element-view--obstructed';
        }
    }
  
    return (
      <div key={element.id || Math.random()} className={className}>
        {children}
      </div>
    )
}
