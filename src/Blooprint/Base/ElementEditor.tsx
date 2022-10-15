import React, {useState} from 'react';
import UiElement from "./UiElement";
import {UiSettings} from "./UiSettings";
import {Nav, Panel} from "rsuite";
import {UiElementType} from "../Demo/Elements/UiElementType";
import Blooprint from "./Blooprint";

type ElementEditorProps<T> = {
    element: T;
    blooprint: Blooprint;
}

export default function ElementEditor<T extends UiElement & UiSettings>(props: ElementEditorProps<T>) {
    if (!props) return <></>;
    
    const allSettings = props.blooprint.getSettings(props.element);
    const [tab, setTab] = useState(allSettings[0].type);
    const { blooprint, element } = props;

    function highlight() {
        blooprint.highlight(element);
    }

    function removeHighlight() {
        blooprint.highlight();
    }

    function renderSettingsTabs() {
        return (
            <Nav key={0} activeKey={tab} onSelect={setTab} appearance="subtle" className="element-editor--nav">
                {allSettings.map(settings => (
                    <Nav.Item key={settings.type} eventKey={settings.type}>{settings.type} Settings</Nav.Item>
                ))}
            </Nav>
        )
    }

    function renderCurrentSettingsEditor() {
        if (props.element.type === UiElementType.List) {
            // debugger;
        }
        let currentSettings = allSettings.filter(c => c.type === tab)[0];
        if (!currentSettings) throw new Error(`Editor for ${tab} is not configured.`);

        return <div key={currentSettings.type}>{currentSettings.editor(props)}</div>;
    }

    function renderChildEditor(element: UiElement) {
        try{
            return <ElementEditor key={element.id} element={element} blooprint={blooprint} />   
        } catch (ex) {
            debugger;
        }
    }

    function renderChildren() {
        if (element.children.length === 0) return <></>;

        return (
            <div className="element-editor--inner">
                {element.children.map(renderChildEditor)}
            </div>
        )
    }

    return (
        <div key={element.id} id={element.id}
             className={`element-editor element-editor--${element.type.toLowerCase()}`}
             onMouseLeave={removeHighlight}
             onMouseEnter={highlight}
        >
            <div className="element-editor--indicator"></div>
            <div className="element-editor--name">{element.type}</div>
            <div className="element-editor--settings">
                <Panel>
                    {[renderSettingsTabs(), renderCurrentSettingsEditor()]}
                </Panel>
            </div>

            {renderChildren()}

            <div className="element-editor--actions">
                Actions go here
            </div>
        </div>
    );
}
