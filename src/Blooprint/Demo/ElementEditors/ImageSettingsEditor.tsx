import React from 'react';
import {Form, Input} from 'rsuite';
import {SettingsEditorProps} from "../../Base/BlooprintConfiguration";
import {ImageSettings} from "../Data/ExampleSettings";

export default function ImageSettingsEditor(props: SettingsEditorProps<ImageSettings>) {
    const { element, settings, blooprint } = props;
    function updateUrl(url: string) {
        settings.url = url;
        props.updateSettings(settings);
    }

    function updateAlt(alt: string) {
        settings.alt = alt;
        props.updateSettings(settings);
    }

    return (
        <Form.Group key={Math.random()}>
            <Form.Group>
                <Form.ControlLabel>Url</Form.ControlLabel>
                <Input value={settings.url} onChange={updateUrl}/>
            </Form.Group>
            <Form.Group>
                <Form.ControlLabel>Placeholder</Form.ControlLabel>
                <Input value={settings.alt} onChange={updateAlt}/>
            </Form.Group>
        </Form.Group>
    )
}
