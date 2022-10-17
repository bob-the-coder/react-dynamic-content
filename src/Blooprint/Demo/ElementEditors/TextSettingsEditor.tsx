import React from 'react';
import {Form, Input,} from 'rsuite';
import {SettingsEditorProps} from "../../Base/BlooprintConfiguration";
import {TextSettings} from "../Data/ExampleSettings";

export default function TextSettingsEditor(props: SettingsEditorProps<TextSettings>) {
    const {settings} = props;
    
    function updateText(text: string) {
        settings.text = text;
        props.updateSettings(settings);
    }

    return (
        <Form.Group key={Math.random()}>
            <Form.ControlLabel>Text</Form.ControlLabel>
            <Input name='text'
                   placeholder='Type your text here'
                   as='textarea'
                   defaultValue={settings.text}
                   rows={5}
                   onChange={(event) => updateText(event)}/>
        </Form.Group>
    )
}
