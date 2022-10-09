import React from 'react';
import demo from '../Demo';
import { Form, Panel, InputGroup, InputNumber, RadioGroup, Radio } from 'rsuite';

const fontWeights = [ 'Normal', 'Bold' ];
const colors = [ 'White', 'Black', 'Red', 'Blue', 'Green' ];

export default function FontOptionsEditor({ element, manager, onUpdate }) {
    let fontOptions = {...demo.fontOptions, ...element.fontOptions};

    function updateFontOptions(newFontOptions) {
        manager.updateElement({...element, fontOptions: {...fontOptions, ...newFontOptions}});
        onUpdate();
    }

    return (
        <Panel>
            <Form.Group>
                <Form.ControlLabel>Size</Form.ControlLabel>
                <InputGroup>
                    <InputNumber value={fontOptions.fontSize} placeholder='14px' onChange={fontSize => updateFontOptions({ fontSize: +fontSize })} />
                    <InputGroup.Addon>px</InputGroup.Addon>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.ControlLabel>Weight</Form.ControlLabel>
                <RadioGroup value={fontOptions.fontWeight} onChange={fontWeight => updateFontOptions({ fontWeight })} inline={true}>
                    {fontWeights.map((weight, i) => (
                        <Radio key={i} value={weight.toLowerCase()}>{weight}</Radio>
                    ))}
                </RadioGroup>
            </Form.Group>
            <Form.Group>
                <Form.ControlLabel>Color</Form.ControlLabel>
                <RadioGroup value={fontOptions.color} onChange={color => updateFontOptions({ color })} inline={true}>
                    {colors.map((color, i) => (
                        <Radio key={i} value={color.toLowerCase()}>{color}</Radio>
                    ))}
                </RadioGroup>
            </Form.Group>
        </Panel>
    )
}
