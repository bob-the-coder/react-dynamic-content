import React, { useState } from 'react'
import { Nav, Panel } from 'rsuite'

export default function MultiEditor({ element, manager, onUpdate, editors }) {
    const [ tab, setTab ] = useState(editors[0].name)

    function renderTabs() {
        return (
            <Nav activeKey={tab} onSelect={setTab} appearance="subtle">
                {editors.map(config => (
                    <Nav.Item key={config.name} eventKey={config.name}>{config.name}</Nav.Item>
                ))}
            </Nav>
        )
    }

    function renderEditor() {
        let config = editors.filter(c => c.name === tab)[0];
        return <div key={config.name}>{config.editor(element, manager, onUpdate)}</div>;
    }

    return (
    <>
        <Panel>
            {renderTabs()}
        </Panel>
        <Panel>
            {renderEditor()}
        </Panel>
    </>
    )
}
