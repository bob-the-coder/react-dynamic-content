import React from 'react';
import UiElement from "./UiElement";
import {ElementViewProps} from "./BlooprintConfiguration";

export default function ElementView<T extends UiElement>(props: ElementViewProps<T>) {
    const { blooprint, element } = props;
    
    let className = `element-view element-view--${element.type.toLowerCase()}`;
    if (element.isHighlighted) {
        className += ' element-view--highlight';
    } else if (blooprint.isHighlighting()) {
        className += ' element-view--obstructed';
    }

    let elementView = props.config.getElementView(props.element);

    function renderView() {
        return elementView(props);
    }

    function renderChildren() {
        if (props.element.children.length === 0) return null;

        return props.element.children.map(element => (
            <ElementView key={`${props.element.id}_${element.id}`} element={element} config={props.config} blooprint={props.blooprint} />
        ));
    }

    return (
        <div key={props.element.id} className={className}>
            <>{renderView()}</>
            {renderChildren()}
        </div>
    )
}
