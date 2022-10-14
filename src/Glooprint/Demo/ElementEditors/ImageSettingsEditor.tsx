import React from 'react';
import {Form, Input} from 'rsuite';
import {SettingsEditorProps} from "../../Base/GlooprintConfiguration";
import UiElement from "../../Base/UiElement";
import {ImageSettings} from "../Elements/Mixins";

export default function ImageSettingsEditor<TProps extends SettingsEditorProps<UiElement & ImageSettings>>(props: TProps) {
    function updateUrl(url: string) {
        props.element.url = url;
        props.glooprint.updateElement(props.element);
    }

    function updateAlt(alt: string) {
        props.element.alt = alt;
        props.glooprint.updateElement(props.element);
    }

    return (
        <Form.Group key={Math.random()}>
            <Form.Group>
                <Form.ControlLabel>Url</Form.ControlLabel>
                <Input value={props.element.url} onChange={updateUrl}/>
            </Form.Group>
            <Form.Group>
                <Form.ControlLabel>Placeholder</Form.ControlLabel>
                <Input value={props.element.alt} onChange={updateAlt}/>
            </Form.Group>
        </Form.Group>
    )
}
