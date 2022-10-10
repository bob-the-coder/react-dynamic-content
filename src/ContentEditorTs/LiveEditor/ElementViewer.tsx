import React, { ReactElement } from 'react';
import UiContainer from '../Base/UiContainer';
import UiElement from "../Base/UiElement";
import PropTypes from './ElementPropTypes';

export default function ElementView<T extends UiElement>(props: PropTypes<T>) {
    let className = `element-view element-view--${props.element.typeName.toLowerCase()}`;

    if (!(props.element instanceof UiContainer)){
        if (props.element.isHighlighted) {
            className += ' element-view--highlight';
        } else if (props.manager.isHighlighting()) {
            className += ' element-view--obstructed';
        }
    }
  
    return (
      <div key={props.element.id || Math.random()} className={className}>
        {props.children}
      </div>
    )
}
