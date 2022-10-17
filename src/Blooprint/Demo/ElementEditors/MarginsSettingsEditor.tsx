﻿import React from 'react'
import {Form, InputNumber, InputGroup, FlexboxGrid} from 'rsuite'
import InputGroupAddon from 'rsuite/esm/InputGroup/InputGroupAddon'
import {SettingsEditorProps} from "../../Base/BlooprintConfiguration";
import {MarginsSettings} from "../Data/ExampleSettings";


const step = 5;

export default function MarginSettingsEditor(props: SettingsEditorProps<MarginsSettings>) {
    const { element, settings, blooprint } = props;
    
    function updateMargin(side: string, value: number) {
        switch (side) {
            case 'left':
                settings.left = value;
                break;
            case 'right':
                settings.right = value;
                break;
            case 'top':
                settings.top = value;
                break;
            case 'bottom':
                settings.bottom = value;
                break;
        }
        props.updateSettings(settings);
    }

    return (
        <FlexboxGrid justify='space-between' key={Math.random()}>
            <FlexboxGrid.Item colspan={11}>
                <Form.Group>
                    <Form.ControlLabel>Top</Form.ControlLabel>
                    <Form.Group>
                        <InputGroup {...{inline: 'true'}}>
                            <InputNumber value={settings.top} step={step}
                                         onChange={value => updateMargin('top', +value)}/>
                            <InputGroupAddon>px</InputGroupAddon>
                        </InputGroup>
                    </Form.Group>
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Bottom</Form.ControlLabel>
                    <InputGroup>
                        <InputNumber value={settings.bottom} step={step}
                                     onChange={value => updateMargin('bottom', +value)}/>
                        <InputGroupAddon>px</InputGroupAddon>
                    </InputGroup>
                </Form.Group>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={11}>
                <Form.Group>
                    <Form.ControlLabel>Left</Form.ControlLabel>
                    <InputGroup>
                        <InputNumber value={settings.left} step={step}
                                     onChange={value => updateMargin('left', +value)}/>
                        <InputGroupAddon>px</InputGroupAddon>
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Right</Form.ControlLabel>
                    <InputGroup>
                        <InputNumber value={settings.right} step={step}
                                     onChange={value => updateMargin('right', +value)}/>
                        <InputGroupAddon>px</InputGroupAddon>
                    </InputGroup>
                </Form.Group>
            </FlexboxGrid.Item>
        </FlexboxGrid>
    )
}
