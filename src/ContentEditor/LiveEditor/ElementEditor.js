import React from 'react';
import { ElementTypeName } from '../ContentModel';
import EditorButton from '../EditorButton';

export default function ElementEditor({ model, manager, children, actions, onUpdate }) {
    function highlight() {
        manager.highlight(model);
        onUpdate()
    }

    function removeHighlight() {
        manager.highlight({});
        onUpdate();
    }

    function renderAction({ buttonVariant, textLabel, handler }, index) {
        return <EditorButton key={index} value={textLabel} variant={buttonVariant || 'default'} onClick={handler} />
    }

    const elementType = ElementTypeName[model.type];

    return (
        <div className={`element-editor element-editor--${elementType.toLowerCase()}`}
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
