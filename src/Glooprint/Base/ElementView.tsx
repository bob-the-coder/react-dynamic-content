import React from 'react';
import UiElement from "./UiElement";
import {ElementViewProps} from "./GlooprintConfiguration";

export default function ElementView<T extends UiElement>(props: ElementViewProps<T>) {
    const { glooprint, element } = props;
    
    let className = `element-view element-view--${element.type.toLowerCase()}`;
    if (element.children.length === 0) {
        if (element.isHighlighted) {
            className += ' element-view--highlight';
        } else if (glooprint.isHighlighting()) {
            className += ' element-view--obstructed';
        }
    }

    let elementView = props.config.getElementView(props.element);

    function renderView() {
        return elementView(props);
    }

    function renderChildren() {
        if (props.element.children.length === 0) return null;

        return props.element.children.map(childElement => (
            <ElementView key={`${props.element.id}_${childElement.id}`} element={childElement} config={props.config} glooprint={props.glooprint} />
        ));
    }

    return (
        <div key={props.element.id} className={className}>
            <>{renderView()}</>
            {renderChildren()}
        </div>
    )
}
