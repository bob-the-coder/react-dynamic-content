import React, {useState} from 'react';
import UiElement from "../Base/UiElement";
import BlueprintConfiguration, {BlueprintApi} from "../BlueprintConfiguration";
import {Nav, Panel} from "rsuite";
import {UiSettings} from "../Base/UiSettings";

type ElementEditorProps<T> = {
    element: T;
    blueprint: BlueprintApi;
    config: BlueprintConfiguration;
}

export default function ElementEditor<T extends UiElement & UiSettings>(props: ElementEditorProps<T>) {
    const allSettings = props.config.getSettings(props.element);
    const [tab, setTab] = useState(allSettings[0].type)

    function highlight() {
        props.blueprint.highlight(props.element);
    }

    function removeHighlight() {
        props.blueprint.highlight();
    }

    function renderSettingsTabs() {
        return (
            <Nav activeKey={tab} onSelect={setTab} appearance="subtle">
                {allSettings.map(settings => (
                    <Nav.Item key={settings.type} eventKey={settings.type}>{settings.type}</Nav.Item>
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
        return <ElementEditor element={element} blueprint={props.blueprint} config={props.config}/>
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
                <Panel header={`${props.element.type} Settings`}>
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
