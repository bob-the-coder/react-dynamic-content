import React, {useState} from 'react';
import BlooprintConfiguration, {BlooprintApi} from "./BlooprintConfiguration";
import UiElement from "./UiElement";
import {UiSettings} from "./UiSettings";
import {Nav, Panel} from "rsuite";

type ElementEditorProps<T> = {
    element: T;
    blooprint: BlooprintApi;
    config: BlooprintConfiguration;
}

export default function ElementEditor<T extends UiElement & UiSettings>(props: ElementEditorProps<T>) {
    const allSettings = props.config.getSettings(props.element);
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
        let currentSettings = allSettings.filter(c => c.type === tab)[0];
        if (!currentSettings) throw new Error(`Editor for ${tab} is not configured.`);

        return <div key={currentSettings.type}>{currentSettings.editor(props)}</div>;
    }

    function renderChildEditor(element: UiElement) {
        return <ElementEditor key={element.id} element={element} blooprint={props.blooprint} config={props.config}/>
    }

    function renderChildren() {
        if (props.element.children.length === 0) return <></>;

        return (
            <div className="element-editor--inner">
                {props.element.children.map(renderChildEditor)}
            </div>
        )
    }

    return (
        <div key={props.element.id || Math.random()}
             className={`element-editor element-editor--${props.element.type.toLowerCase()}`}
             onMouseLeave={removeHighlight}
             onMouseEnter={highlight}
        >
            <div className="element-editor--indicator"></div>
            <div className="element-editor--name">{props.element.type}</div>
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
