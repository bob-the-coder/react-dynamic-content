import React from 'react';
import { Panel } from 'rsuite';

export default function ContainerEditor({ element, manager, onUpdate}) {
    return (
        <Panel header="Container Settings">
            {element.children.map(element => manager.getEditors(element, onUpdate))}
        </Panel>
    )
}
