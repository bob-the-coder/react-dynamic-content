import React from 'react';
import { Form, InputGroup, InputNumber, RadioGroup, Radio } from 'rsuite';
import {SettingsEditorProps} from "../../Base/GlooprintConfiguration";
import UiElement from "../../Base/UiElement";
import {FontSettings} from "../Elements/Mixins";

const fontWeights = [ 'Normal', 'Bold' ];
const colors = [ 'White', 'Black', 'Red', 'Blue', 'Green' ];

export default function FontSettingsEditor<TProps extends SettingsEditorProps<UiElement & FontSettings>>(props: TProps) {
    const fontSettings = {...new FontSettings().font, ...props.element.font};

    function updateElement(newFontSettings: any) {
        let element =  {...props.element, font: {...fontSettings, ...newFontSettings}};
        props.glooprint.updateElement(element);
    }
    
    function updateSize(fontSize: number) {
        updateElement({ fontSize })
    }

    function updateWeight(fontWeight: string) {
        updateElement({ fontWeight })
    }

    function updateColor(color: string) {
        updateElement({ color })
    }

    return (
        <Form.Group key={Math.random()}>
            <Form.Group>
                <Form.ControlLabel>Size</Form.ControlLabel>
                <InputGroup>
                    <InputNumber value={fontSettings.fontSize} placeholder='14px' onChange={fontSize => updateSize(+fontSize)} />
                    <InputGroup.Addon>px</InputGroup.Addon>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.ControlLabel>Weight</Form.ControlLabel>
                <RadioGroup value={fontSettings.fontWeight} onChange={fontWeight => updateWeight(fontWeight.toString())} inline={true}>
                    {fontWeights.map((weight, i) => (
                        <Radio key={i} value={weight.toLowerCase()}>{weight}</Radio>
                    ))}
                </RadioGroup>
            </Form.Group>
            <Form.Group>
                <Form.ControlLabel>Color</Form.ControlLabel>
                <RadioGroup value={fontSettings.color} onChange={color => updateColor(color.toString())} inline={true}>
                    {colors.map((color, i) => (
                        <Radio key={i} value={color.toLowerCase()}>{color}</Radio>
                    ))}
                </RadioGroup>
            </Form.Group>
        </Form.Group>
    )
}
