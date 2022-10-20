import React from 'react';
import {Form, Radio, RadioGroup} from 'rsuite';
import {SettingsEditorProps} from "../../Base/BlooprintConfiguration";
import {ContainerSettings} from "../Data/ExampleSettings";

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
export default function ContainerSettingsEditor(props: SettingsEditorProps<ContainerSettings>) {
    const { settings } = props;
    
    function updateSettings(alignContent: string) {
        props.updateSettings({alignContent});
    }
    
    return (
        <Form.Group key={Math.random()}>
            <Form.ControlLabel>Align inner elements</Form.ControlLabel>
            <RadioGroup value={settings.alignContent} onChange={align => updateSettings(align.toString())} inline={true}>
                {alignOptions.map((option, i) => (
                    <Radio key={i} value={option}>{displayLabels[option]}</Radio>
                ))}
            </RadioGroup>
        </Form.Group>
    )
}
