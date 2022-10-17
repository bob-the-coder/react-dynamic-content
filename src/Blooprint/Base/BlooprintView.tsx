import React from 'react';
import {BlooprintViewProps} from "./BlooprintConfiguration";

import './BlooprintView.css';
import {BlooprintElement} from "./Blooprint";

export default function BlooprintView(props: BlooprintViewProps<BlooprintElement>) {
    const { blooprint, element } = props;
    
    if (!element.type) return <h2>Broken view</h2>;
    
    let className = `element-view element-view--${element.type.toLowerCase()}`;
    if (element.isHighlighted) {
        className += ' element-view--highlight';
    } else if (blooprint.isHighlighting()) {
        className += ' element-view--obstructed';
    }

    let elementView = blooprint.config.elementConfig[element.type].view;

    function renderView(includeChildren: boolean) {
        if (!includeChildren) return elementView(props);
        
        let children = renderChildren();
        return elementView({...props, children})
    }

    function renderChildren() {
        const childElements = blooprint.childrenOf(element.id);
        if (!childElements || childElements.length === 0) return undefined;

        return childElements.map(childElement => (
            <BlooprintView key={`${props.element.id}_${childElement.id}`} element={childElement} blooprint={props.blooprint} />
        ));
    }
    
    const includeChildren = !(!element.children || element.children.length === 0);
    return (
        <div key={props.element.id} className={className}>
            {renderView(includeChildren)}
        </div>
    )
}
