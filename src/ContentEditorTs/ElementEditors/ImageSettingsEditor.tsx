import React from 'react';
import {Form, Input} from 'rsuite';
import {ImageSettings} from "../Demo/Elements/Mixins";
import UiElement from "../Base/UiElement";
import {SettingsEditorProps} from "../BlueprintConfiguration";

export default function ImageSettingsEditor<TProps extends SettingsEditorProps<UiElement & ImageSettings>>(props: TProps) {
    function updateUrl(url: string) {
        props.element.url = url;
        props.blueprint.updateElement(props.element);
    }

    function updateAlt(alt: string) {
        props.element.alt = alt;
        props.blueprint.updateElement(props.element);
    }

    return (
        <>
            <Form.Group>
                <Form.ControlLabel>Url</Form.ControlLabel>
                <Input value={props.element.url} onChange={updateUrl}/>
            </Form.Group>
            <Form.Group>
                <Form.ControlLabel>Placeholder</Form.ControlLabel>
                <Input value={props.element.alt} onChange={updateAlt}/>
            </Form.Group>
        </>
    )
}
