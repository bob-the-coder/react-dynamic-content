import React, {useState} from 'react';
import {Nav, Panel} from "rsuite";
import {BlooprintSettings} from "./Blooprint";
import './BlooprintEditor.css'
import {useDispatch} from "react-redux";
import {useBlooprintSelector, BlooprintApi, getChildren} from "./Redux/BlooprintApi";

type BlooprintEditorProps = {
    elementId: string;
    blooprint: BlooprintApi
}

export default function BlooprintEditor(props: BlooprintEditorProps) {
    if (!props) return <></>;
    const {elementId, blooprint} = props;
    const element = useBlooprintSelector(state => state.map[elementId]);

    if (!element || !element.type) {
        return <h2>Broken editor</h2>
    }

    const allSettings = Object.keys(element.settings);
    const [activeTab, setActiveTab] = useState(allSettings[0]);

    const dispatch = useDispatch();


    function highlight() {
        dispatch(blooprint.highlightElement({elementId}))
    }

    function removeHighlight() {
        dispatch(blooprint.removeHighlight());
    }

    function renderChildren() {
        const map = useBlooprintSelector(state => state.map);
        const children = getChildren(element, map);
        if (!children || children.length === 0) return <></>;

        return (
            <div className="element-editor--inner">
                {children.map(childElement => (
                    <BlooprintEditor key={childElement.id} elementId={childElement.id} blooprint={blooprint}/>
                ))}
            </div>
        )
    }

    function renderSettingsEditor(type: string) {
        if (element.type === 'Container') {
        }
        const SettingsEditor = blooprint.config.settingsConfig[type].editor;
        const isActive = type === activeTab;

        const updateSettings = (newSettings: BlooprintSettings) =>
            dispatch(blooprint.updateSettings({
                elementId,
                settings: {
                    type,
                    ...newSettings
                }
            }));

        const settingsEditorProps = {blooprint, settings: element.settings[type], updateSettings};

        return (
            <div key={`${elementId}_${type}`} style={{display: isActive ? 'block' : 'none'}}>
                <SettingsEditor {...settingsEditorProps} />
            </div>
        )
    }

    return (
        <div id={element.id}
             className={`element-editor element-editor--${element.type.toLowerCase()}`}
            onMouseLeave={removeHighlight}
            onMouseEnter={highlight}
        >
            <div className="element-editor--indicator"></div>
            <div className="element-editor--name">{element.type} {allSettings}</div>
            <div className="element-editor--settings">
                <Panel>
                    <Nav activeKey={activeTab} onSelect={setActiveTab} appearance="subtle"
                         className="element-editor--nav">
                        {allSettings.map(settings => (
                            <Nav.Item key={settings} eventKey={settings}>{settings}</Nav.Item>
                        ))}
                    </Nav>
                    {allSettings.map(renderSettingsEditor)}
                </Panel>
            </div>

            {renderChildren()}

            <div className="element-editor--actions">
                Actions go here
            </div>
        </div>
    );
}
