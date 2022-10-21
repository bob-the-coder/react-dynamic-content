import React, {useState} from 'react';
import {Form, Input,} from 'rsuite';
import {SettingsEditorProps} from "../../Base/BlooprintConfiguration";
import {TextSettings} from "../Data/ExampleSettings";
import {KeyboardEvent} from 'react';

export default function TextSettingsEditor(props: SettingsEditorProps<TextSettings>) {
    const {settings} = props;

    const [text, setText] = useState(settings.text);
    
    function updateText(text: string) {
        setText(text);
        props.updateSettings({text});
    }
    
    function submitChanges(event: KeyboardEvent<HTMLInputElement>) {
        if (!event.ctrlKey) return;
        debugger;
        if (event.key !== '13') return;
    }

    return (
        <Form.Group key={Math.random()}>
            <Form.ControlLabel>Text</Form.ControlLabel>
            <Input name='text'
                   placeholder='Type your text here'
                   as='textarea'
                   defaultValue={text}
                   rows={5}
                   onChange={updateText} />
        </Form.Group>
    )
}
