import React from 'react';
import UiElement from "../Base/UiElement";
import {ElementViewProps} from "../BlueprintConfiguration";

export default function ElementView<T extends UiElement>(props: ElementViewProps<T>) {
    let className = `element-view element-view--${props.element.type.toLowerCase()}`;

    if (props.element.children.length === 0) {
        if (props.element.isHighlighted) {
            className += ' element-view--highlight';
        } else if (props.blueprint.isHighlighting()) {
            className += ' element-view--obstructed';
        }
    }

    let elementView = props.config.getElementView(props.element);

    function renderView() {
        return elementView(props)
    }

    function renderChildren() {
        if (props.element.children.length === 0) return <></>;

        return props.element.children.map(element => (
            <ElementView element={element} config={props.config} blueprint={props.blueprint} />
        ));
    }

    return (
        <div key={props.element.id || Math.random()} className={className}>
            {[renderView(), renderChildren()]}
        </div>
    )
}
