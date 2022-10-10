import React, { ReactElement } from 'react';
import UiElement from "../Base/UiElement";
import PropTypes from './ElementPropTypes';

export default function ElementEditor<T extends UiElement> (props: PropTypes<T>) {
    function highlight() {
        props.manager.highlight(props.element);
        props.onUpdate()
    }

    function removeHighlight() {
        props.manager.highlight(null);
        props.onUpdate();
    }

    let actions = props.manager.getActions(props.element, props.onUpdate);

    return (
        <div key={props.element.id || Math.random()} className={`element-editor element-editor--${props.element.typeName}`}
            onMouseLeave={removeHighlight}
            onMouseEnter={highlight}
        >
            <div className="element-editor--indicator"></div>
            <div className="element-editor--name">{props.element.typeName}</div>

            <div className="element-editor--body">
                {props.children}
            </div>

            <div className="element-editor--actions">
                {actions}
            </div>
        </div>
    );
}
