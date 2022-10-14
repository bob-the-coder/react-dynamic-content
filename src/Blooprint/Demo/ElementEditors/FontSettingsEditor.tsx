import React from 'react';
import { Form, InputGroup, InputNumber, RadioGroup, Radio } from 'rsuite';
import {SettingsEditorProps} from "../../Base/BlooprintConfiguration";
import UiElement from "../../Base/UiElement";
import {FontSettings} from "../Elements/Mixins";

const fontWeights = [ 'Normal', 'Bold' ];
const colors = [ 'White', 'Black', 'Red', 'Blue', 'Green' ];

export default function FontSettingsEditor<TProps extends SettingsEditorProps<UiElement & FontSettings>>(props: TProps) {
    let fontOptions = props.element.font || new FontSettings().font;

    function updateSize(size: number) {
        props.element.font.fontSize = size;
        props.blooprint.updateElement(props.element);
    }

    function updateWeight(weight: string) {
        props.element.font.fontWeight = weight;
        props.blooprint.updateElement(props.element);
    }

    function updateColor(color: string) {
        props.element.font.color = color;
        props.blooprint.updateElement(props.element);
    }

    return (
        <Form.Group>
            <Form.Group>
                <Form.ControlLabel>Size</Form.ControlLabel>
                <InputGroup>
                    <InputNumber value={fontOptions.fontSize} placeholder='14px' onChange={fontSize => updateSize(+fontSize)} />
                    <InputGroup.Addon>px</InputGroup.Addon>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.ControlLabel>Weight</Form.ControlLabel>
                <RadioGroup value={fontOptions.fontWeight} onChange={fontWeight => updateWeight(fontWeight.toString())} inline={true}>
                    {fontWeights.map((weight, i) => (
                        <Radio key={i} value={weight.toLowerCase()}>{weight}</Radio>
                    ))}
                </RadioGroup>
            </Form.Group>
            <Form.Group>
                <Form.ControlLabel>Color</Form.ControlLabel>
                <RadioGroup value={fontOptions.color} onChange={color => updateColor(color.toString())} inline={true}>
                    {colors.map((color, i) => (
                        <Radio key={i} value={color.toLowerCase()}>{color}</Radio>
                    ))}
                </RadioGroup>
            </Form.Group>
        </Form.Group>
    )
}
