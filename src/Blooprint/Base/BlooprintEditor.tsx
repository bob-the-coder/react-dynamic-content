import React, {useState} from 'react';
import {Nav, Panel} from "rsuite";
import './BlooprintEditor.css'
import {useBlooprintSelector, BlooprintApi} from "./Redux/BlooprintApi";
import BlooprintSettingsEditor from "./BlooprintSettingsEditor";
import {useDispatch} from "react-redux";

type BlooprintEditorProps = {
    elementId: string;
    blooprint: BlooprintApi
}

export default function BlooprintEditor(props: BlooprintEditorProps) {
    if (!props) return <></>;
    const {elementId, blooprint} = props;
    const element = useBlooprintSelector(state => state.elements[elementId]);
    const dispatch = useDispatch();

    if (!element || !element.type) {
        return <h2>Broken editor</h2>
    }

    const [activeTab, setActiveTab] = useState(element.settings[0]);

    function highlight() {
        if (element.children.length) return;
        dispatch(blooprint.highlightElement({elementId: element.id}))
    }

    function removeHighlight() {
        if (element.children.length) return;
        dispatch(blooprint.removeHighlight());
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
                    <BlooprintSettingsEditor elementId={elementId} type={activeTab} blooprint={blooprint} />
                </Panel>
            </div>
            <div className="element-editor--inner">
                {element.children.map(childElement => (
                    <BlooprintEditor key={childElement} elementId={childElement} blooprint={blooprint}/>
                ))}
            </div>
            <div className="element-editor--actions">
                Actions go here
            </div>
        </div>
    );
}
