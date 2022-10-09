import React from 'react';

export default function ContainerEditor({ element, manager, onUpdate}) {
    return (
        <div>
            {element.children.map(element => manager.getEditors(element, onUpdate))}
        </div>
    )
}
