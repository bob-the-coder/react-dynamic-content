import React from 'react';
import { ElementType, ElementTypeName } from '../ContentModel';

export default function ElementView({ model, manager, children }) {
    let className = `element-view element-view--${ElementTypeName[model.type].toLowerCase()}`;
    if (model.type !== ElementType.Container){
        if (model.highlight) {
            className += ' element-view--highlight';
        } else if (manager.isHighlighting()) {
            className += ' element-view--obstructed';
        }
    }
  
    return (
      <div className={className}>
        {children}
      </div>
    )
}
