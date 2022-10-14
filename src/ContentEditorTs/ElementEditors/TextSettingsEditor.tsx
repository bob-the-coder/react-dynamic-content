import React from 'react';
import {Form, Input,} from 'rsuite';

import {TextSettings} from "../Demo/Elements/Mixins";
import UiElement from "../Base/UiElement";
import {SettingsEditorProps} from "../BlueprintConfiguration";

export default function TextSettingsEditor<TProps extends SettingsEditorProps<UiElement & TextSettings>>(props: TProps) {
    function updateElement(text: string) {
        props.element.text = text;
        props.blueprint.updateElement(props.element);
    }

    return (
        <div>
            <Form.ControlLabel>Text</Form.ControlLabel>
            <Input name='text'
                   placeholder='Type your text here'
                   as='textarea'
                   defaultValue={props.element.text}
                   rows={5}
                   onChange={updateElement}/>
        </div>
    )
}
