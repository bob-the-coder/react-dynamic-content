import React from 'react';
import { ElementTypeName } from '../ContentModel';
import EditorButton from '../EditorButton';

export default function ElementEditor({ element, manager, onUpdate, children }) {
    function highlight() {
        manager.highlight(element);
        onUpdate()
    }

    function removeHighlight() {
        manager.highlight({});
        onUpdate();
    }

    function renderAction(action, index) {
        let {textLabel, handler} = action;
        return <EditorButton key={index} value={textLabel} variant='default' onClick={handler} />
    }
    
    const elementType = ElementTypeName[element.type];
    let actions = manager.getActions(element, onUpdate);

    return (
        <div key={element.id} className={`element-editor element-editor--${elementType.toLowerCase()}`}
            onMouseLeave={removeHighlight}
            onMouseEnter={highlight}
        >
            <div className="element-editor--indicator"></div>
            <div className="element-editor--name">{elementType}</div>

            <div className="element-editor--body">
                {children}
            </div>

            <div className="element-editor--actions">
                {actions.map(renderAction)}
            </div>
        </div>
    )
}
