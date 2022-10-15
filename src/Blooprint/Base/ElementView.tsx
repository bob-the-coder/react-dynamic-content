import React from 'react';
import UiElement from "./UiElement";
import {ElementViewProps} from "./BlooprintConfiguration";

export default function ElementView<T extends UiElement>(props: ElementViewProps<T>) {
    const { blooprint, element } = props;
    
    let className = `element-view element-view--${element.type.toLowerCase()}`;
    if (element.children.length === 0) {
        if (element.isHighlighted) {
            className += ' element-view--highlight';
        } else if (blooprint.isHighlighting()) {
            className += ' element-view--obstructed';
        }
    }

    let elementView = props.blooprint.getView(props.element);

    function renderView(includeChildren: boolean) {
        if (!includeChildren) return elementView(props);
        
        let children = renderChildren();
        return elementView({...props, children})
    }

    function renderChildren() {
        if (props.element.children.length === 0) return undefined;

        return props.element.children.map(childElement => (
            <ElementView key={`${props.element.id}_${childElement.id}`} element={childElement} blooprint={props.blooprint} />
        ));
    }
    
    if (!props.element.children || props.element.children.length === 0) {
        return (
            <div key={props.element.id} className={className}>
                {renderView(false)}
            </div>
        )
    }

    return (
        <div key={props.element.id} className={className}>
            {renderView(true)}
        </div>
    )
}
