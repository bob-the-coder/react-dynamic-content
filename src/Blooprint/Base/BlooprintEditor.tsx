import React, {ReactNode, useState} from 'react';
import {Nav, Panel} from "rsuite";
import Blooprint, {BlooprintElement, BlooprintSettings} from "./Blooprint";
import './BlooprintEditor.css'

type BlooprintEditorProps = {
    element: BlooprintElement;
    blooprint: Blooprint;
    onUpdate?: (element: BlooprintElement) => any;
}

export default function BlooprintEditor(props: BlooprintEditorProps) {
    if (!props) return <></>;
    const { blooprint, element } = props;
    
    if (!element.type || !element.id) {
        return <h2>Broken editor</h2>
    }
    
    const allSettings = Object.keys(element.settings);
    const [activeTab, setActiveTab] = useState(allSettings[0]);
    const [settings, setSettings] = useState(element.settings[activeTab]);
    
    function changeSettings(tab: string) {
        setActiveTab(tab);
        const newSettings = blooprint.elements[element.id].settings[tab];
        setSettings(newSettings);
    }
    
    function highlight() {
        blooprint.highlight(element.id);
    }

    function removeHighlight() {
        blooprint.highlight();
    }

    function renderChildren() {
        const childElements = blooprint.childrenOf(element.id);
        if (!childElements || childElements.length === 0) return <></>;

        return (
            <div className="element-editor--inner">
                {childElements.map(childElement => (
                    <BlooprintEditor key={childElement.id} element={childElement} blooprint={blooprint} onUpdate={props.onUpdate} />
                ))}
            </div>
        )
    }
    
    function renderCurrentSettings() {
        if (!settings.type) return <h2>Undefined settings type</h2>;
        
        const settingsConfig = blooprint.config.settingsConfig[settings.type];
        
        return settingsConfig.editor({...props, settings: {...settings}, updateSettings: setSettings });
    }

    return (
        <div id={element.id}
             className={`element-editor element-editor--${element.type.toLowerCase()}`}
             onMouseLeave={removeHighlight}
             onMouseEnter={highlight}
        >
            <div className="element-editor--indicator"></div>
            <div className="element-editor--name">{element.type}</div>
            <div className="element-editor--settings">
                <Panel>
                    <Nav activeKey={activeTab} onSelect={changeSettings} appearance="subtle" className="element-editor--nav">
                        {allSettings.map(settings => (
                            <Nav.Item key={settings} eventKey={settings}>{settings}</Nav.Item>
                        ))}
                    </Nav>
                    {renderCurrentSettings()}
                </Panel>
            </div>

            {renderChildren()}

            <div className="element-editor--actions">
                Actions go here
            </div>
        </div>
    );
}
