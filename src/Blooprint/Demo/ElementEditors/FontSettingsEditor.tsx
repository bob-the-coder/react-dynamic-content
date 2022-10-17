import React from 'react';
import { Form, InputGroup, InputNumber, RadioGroup, Radio } from 'rsuite';
import {SettingsEditorProps} from "../../Base/BlooprintConfiguration";
import {FontSettings} from "../Data/ExampleSettings";

const fontWeights = [ 'Normal', 'Bold' ];
const colors = [ 'White', 'Black', 'Red', 'Blue', 'Green' ];

export default function FontSettingsEditor(props: SettingsEditorProps<FontSettings>) {
    const { element, settings, blooprint } = props;

    function updateSize(fontSize: number) {
        settings.fontSize = fontSize;
        props.updateSettings(settings);
    }

    function updateWeight(fontWeight: string) {
        settings.fontWeight = fontWeight;
        props.updateSettings(settings);
    }

    function updateColor(color: string) {
        settings.color = color;
        props.updateSettings(settings);
    }

    return (
        <Form.Group key={Math.random()}>
            <Form.Group>
                <Form.ControlLabel>Size</Form.ControlLabel>
                <InputGroup>
                    <InputNumber value={settings.fontSize} placeholder='14px' onChange={fontSize => updateSize(+fontSize)} />
                    <InputGroup.Addon>px</InputGroup.Addon>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.ControlLabel>Weight</Form.ControlLabel>
                <RadioGroup value={settings.fontWeight} onChange={fontWeight => updateWeight(fontWeight.toString())} inline={true}>
                    {fontWeights.map((weight, i) => (
                        <Radio key={i} value={weight.toLowerCase()}>{weight}</Radio>
                    ))}
                </RadioGroup>
            </Form.Group>
            <Form.Group>
                <Form.ControlLabel>Color</Form.ControlLabel>
                <RadioGroup value={settings.color} onChange={color => updateColor(color.toString())} inline={true}>
                    {colors.map((color, i) => (
                        <Radio key={i} value={color.toLowerCase()}>{color}</Radio>
                    ))}
                </RadioGroup>
            </Form.Group>
        </Form.Group>
    )
}
