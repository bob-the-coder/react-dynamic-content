import React from 'react'
import { Form, InputNumber, InputGroup, FlexboxGrid } from 'rsuite'
import InputGroupAddon from 'rsuite/esm/InputGroup/InputGroupAddon'
import {SettingsEditorProps} from "../../Base/GlooprintConfiguration";
import UiElement from "../../Base/UiElement";
import {PaddingSettings} from "../Elements/Mixins";


const step = 5;

export default function PaddingSettingsEditor<TProps extends SettingsEditorProps<UiElement & PaddingSettings>>(props: TProps) {
    let padding = props.element.padding || new PaddingSettings().padding;

    function updatePadding(side: string, value: number) {
        let element = props.element;
        if (!element.padding) element.padding = new PaddingSettings().padding;
        
        switch (side) {
            case 'left': element.padding.left = value; break;
            case 'right': element.padding.right = value; break;
            case 'top': element.padding.top = value; break;
            case 'bottom': element.padding.bottom = value; break;
        }
        props.glooprint.updateElement(element);
    }

    return (
        <FlexboxGrid justify='space-between' key={Math.random()}>
            <FlexboxGrid.Item colspan={11}>
                <Form.Group>
                    <Form.ControlLabel>Top</Form.ControlLabel>
                    <Form.Group>
                        <InputGroup {...{inline: 'true'}}>
                            <InputNumber value={padding.top} step={step} onChange={value => updatePadding('top', +value)} />
                            <InputGroupAddon>px</InputGroupAddon>
                        </InputGroup>
                    </Form.Group>
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Bottom</Form.ControlLabel>
                    <InputGroup>
                        <InputNumber value={padding.bottom} step={step} onChange={value => updatePadding('bottom', +value)} />
                        <InputGroupAddon>px</InputGroupAddon>
                    </InputGroup>
                </Form.Group>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={11}>
                <Form.Group>
                    <Form.ControlLabel>Left</Form.ControlLabel>
                    <InputGroup>
                        <InputNumber value={padding.left} step={step} onChange={value => updatePadding('left', +value)} />
                        <InputGroupAddon>px</InputGroupAddon>
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Right</Form.ControlLabel>
                    <InputGroup>
                        <InputNumber value={padding.right} step={step} onChange={value => updatePadding('right', +value)} />
                        <InputGroupAddon>px</InputGroupAddon>
                    </InputGroup>
                </Form.Group>
            </FlexboxGrid.Item>
        </FlexboxGrid>
    )
}
