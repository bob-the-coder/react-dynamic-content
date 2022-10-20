import React, {ReactNode, useState} from 'react';
import {Nav, Panel} from "rsuite";
import {BlooprintSettings} from "./Blooprint";
import './BlooprintEditor.css'
import {useDispatch } from "react-redux";
import {useBlooprintSelector, BlooprintStore, getChildren} from "./Redux/BlooprintStore";

type BlooprintEditorProps = {
    elementId: string;
    blooprint: BlooprintStore
}

type SettingsState = {[key: string]: any};
type ElementState = {[key: string]: SettingsState};

export default function BlooprintEditor(props: BlooprintEditorProps) {
    if (!props) return <></>;
    const { elementId, blooprint } = props;
    const element = useBlooprintSelector(state => state.map[elementId]);
    
    if (!element || !element.type) {
        return <h2>Broken editor</h2>
    }
    
    const { settings } = element;
    
    const allSettings = Object.keys(element.settings);
    const [activeTab, setActiveTab] = useState(allSettings[0]);
    
    const actions = blooprint.slice.actions;
    const dispatch = useDispatch();
    
    function updateSettings(newState: BlooprintSettings) {
        dispatch(actions.updateSettings({
            elementId,
            settings: {
                type: activeTab,
                ...newState
            }
        }));
    }
    
    function changeActiveSettings(tab: string) {
        setActiveTab(tab);
    }
    
    function highlight() {
        dispatch(actions.highlightElement({elementId}))
    }

    function removeHighlight() {
        dispatch(actions.removeHighlight());
    }

    function renderChildren() {
        const map = useBlooprintSelector(state => state.map);
        const children = getChildren(element, map);
        if (!children || children.length === 0) return <></>;

        return (
            <div className="element-editor--inner">
                {children.map(childElement => (
                    <BlooprintEditor key={childElement.id} elementId={childElement.id} blooprint={blooprint} />
                ))}
            </div>
        )
    }
    
    function renderCurrentSettings() {
        const settingsConfig = blooprint.config.settingsConfig[activeTab];
        const settingsEditorProps = {blooprint, element, settings: settings[activeTab], updateSettings };
        
        return React.createElement(settingsConfig.editor, settingsEditorProps)
    }

    return (
        <div id={element.id}
             className={`element-editor element-editor--${element.type.toLowerCase()}`}
             // onMouseLeave={removeHighlight}
             // onMouseEnter={highlight}
        >
            <div className="element-editor--indicator"></div>
            <div className="element-editor--name">{element.type}</div>
            <div className="element-editor--settings">
                <Panel>
                    <Nav activeKey={activeTab} onSelect={changeActiveSettings} appearance="subtle" className="element-editor--nav">
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
