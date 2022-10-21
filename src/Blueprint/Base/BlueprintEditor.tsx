import React, {useState} from 'react';
import {Button, Nav, Panel} from "rsuite";
import './BlueprintEditor.css'
import {useBlueprintSelector, BlueprintApi} from "./Redux/BlueprintApi";
import BlueprintSettingsEditor from "./BlueprintSettingsEditor";
import {useDispatch} from "react-redux";
import {ElementActionConfig, ElementActionProps} from "./BlueprintConfiguration";

type BlueprintEditorProps = {
    elementId: string;
    blueprint: BlueprintApi;
    actions?: ElementActionConfig[];
}

export default function BlueprintEditor(props: BlueprintEditorProps) {
    if (!props) return <></>;
    const {elementId, blueprint} = props;
    const element = useBlueprintSelector(state => state.elements[elementId]);
    const dispatch = useDispatch();

    if (!element || !element.type) {
        return <h2>Broken editor</h2>
    }

    const [activeTab, setActiveTab] = useState(element.settings[0]);

    function highlight() {
        if (element.children.length) return;
        dispatch(blueprint.highlightElement({elementId: element.id}))
    }

    function removeHighlight() {
        if (element.children.length) return;
        dispatch(blueprint.removeHighlight());
    }

    return (
        <div id={element.id} className={`element-editor element-editor--${element.type.toLowerCase()}`}
            onMouseLeave={removeHighlight}
            onMouseEnter={highlight}
        >
            <div className="element-editor--indicator"></div>
            <div className="element-editor--name">{element.type} {element.settings}</div>
            <div className="element-editor--settings">
                <Panel>
                    <Nav activeKey={activeTab} onSelect={setActiveTab} appearance="subtle"
                         className="element-editor--nav">
                        {element.settings.map(settings => (
                            <Nav.Item key={settings} eventKey={settings}>{settings}</Nav.Item>
                        ))}
                    </Nav>
                    <BlueprintSettingsEditor elementId={elementId} type={activeTab} blueprint={blueprint} />
                </Panel>
            </div>
            <div className="element-editor--inner">
                {element.children.map(childElement => (
                    <BlueprintEditor key={childElement} elementId={childElement} blueprint={blueprint}/>
                ))}
            </div>
            <div className="element-editor--actions">
                {!props.actions 
                    ? <></>
                    : props.actions.map(action => (
                        <Button key={action.label}>{action.label}</Button>
                    ))
                }
            </div>
        </div>
    );
}
