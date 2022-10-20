import React from 'react';
import {BlooprintViewProps} from "./BlooprintConfiguration";

import './BlooprintView.css';
import {BlooprintElement} from "./Blooprint";
import {getChildren, useBlooprintSelector} from "./Redux/BlooprintStore";

export default function BlooprintView(props: BlooprintViewProps<BlooprintElement>) {
    const {blooprint, element} = props;

    if (!element.type) return <h2>Broken view</h2>;

    const isHighlighting = useBlooprintSelector(state => state.isHighlighting);
    let className = `element-view element-view--${element.type.toLowerCase()}`;
    if (element.isHighlighted) {
        className += ' element-view--highlight';
    } else if (isHighlighting && !element.hasChildren) {
        className += ' element-view--obstructed';
    }

    let elementView = blooprint.config.elementConfig[element.type].view;

    function renderChildren(children: BlooprintElement[]) {
        return children.map(childElement => (
            <BlooprintView key={`${element.id}_${childElement.id}`} element={childElement} blooprint={blooprint}/>
        ));
    }

    function renderView() {
        const map = useBlooprintSelector(state => state.map);
        const children = getChildren(element, map);
        if (!children || children.length === 0) return React.createElement(elementView, props);

        return React.createElement(elementView, {...props, children: renderChildren(children)});
    }

    return (
        <div key={element.id} className={className}>
            {renderView()}
        </div>
    )
}
