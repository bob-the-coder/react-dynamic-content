import React from 'react';
import {Form, Input,} from 'rsuite';
import {SettingsEditorProps} from "../../Base/GlooprintConfiguration";
import UiElement from "../../Base/UiElement";
import {TextSettings} from "../Elements/Mixins";


export default function TextSettingsEditor<TProps extends SettingsEditorProps<UiElement & TextSettings>>(props: TProps) {
    function updateElement(text: string) {
        props.element.text = text;
        props.glooprint.updateElement(props.element);
    }

    return (
        <Form.Group key={Math.random()}>
            <Form.ControlLabel>Text</Form.ControlLabel>
            <Input name='text'
                   placeholder='Type your text here'
                   as='textarea'
                   defaultValue={props.element.text}
                   rows={5}
                   onChange={updateElement}/>
        </Form.Group>
    )
}
