import React from 'react';
import {Form, Input,} from 'rsuite';
import {SettingsEditorProps} from "../../Base/BlueprintConfiguration";
import {TextSettings} from "../Data/ExampleSettings";

export default function TextSettingsEditor(props: SettingsEditorProps<TextSettings>) {
    const {settings} = props;

    return (
        <Form.Group>
            <Form.ControlLabel>Text</Form.ControlLabel>
            <Input name='text'
                   placeholder='Type your text here'
                   as='textarea'
                   value={settings.text}
                   rows={5}
                   onChange={text => props.updateSettings({ text })} />
        </Form.Group>
    )
}
