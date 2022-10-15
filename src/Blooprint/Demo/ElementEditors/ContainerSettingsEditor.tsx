import React from 'react';
import {Form, Radio, RadioGroup} from 'rsuite';
import {SettingsEditorProps} from "../../Base/BlooprintConfiguration";
import UiElement from "../../Base/UiElement";
import {ContainerSettings} from "../Elements/Mixins";

type labels = {
    left: string;
    right: string;
    center: string;
}
const displayLabels = {
    left: 'To the left',
    right: 'To the right',
    center: 'Centered'
}
const alignOptions: (keyof labels)[] = ['left', 'center', 'right'];
export default function ContainerSettingsEditor<TProps extends SettingsEditorProps<UiElement & ContainerSettings>>(props: TProps) {
    let { element, blooprint } = props;
    
    function updateSettings(alignContent: string) {
        element.alignContent = alignContent;
        blooprint.updateElement(element);
    }
    
    return (
        <Form.Group key={Math.random()}>
            <Form.ControlLabel>Align inner elements</Form.ControlLabel>
            <RadioGroup value={element.alignContent} onChange={align => updateSettings(align.toString())} inline={true}>
                {alignOptions.map((option, i) => (
                    <Radio key={i} value={option}>{displayLabels[option]}</Radio>
                ))}
            </RadioGroup>
        </Form.Group>
    )
}
