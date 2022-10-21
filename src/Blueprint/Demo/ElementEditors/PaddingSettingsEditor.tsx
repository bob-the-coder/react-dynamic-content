import React from 'react'
import {Form, InputNumber, InputGroup, FlexboxGrid} from 'rsuite'
import InputGroupAddon from 'rsuite/esm/InputGroup/InputGroupAddon'
import {SettingsEditorProps} from "../../Base/BlueprintConfiguration";
import {PaddingSettings} from "../Data/ExampleSettings";


const step = 5;

export default function PaddingSettingsEditor(props: SettingsEditorProps<PaddingSettings>) {
    const { settings } = props;

    function updatePadding(side: string, value: number) {
        props.updateSettings({[side]: value});
    }

    return (
        <FlexboxGrid justify='space-between'>
            <FlexboxGrid.Item colspan={11}>
                <Form.Group>
                    <Form.ControlLabel>Top</Form.ControlLabel>
                    <Form.Group>
                        <InputGroup {...{inline: 'true'}}>
                            <InputNumber value={settings.top} step={step}
                                         onChange={value => updatePadding('top', +value)}/>
                            <InputGroupAddon>px</InputGroupAddon>
                        </InputGroup>
                    </Form.Group>
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Bottom</Form.ControlLabel>
                    <InputGroup>
                        <InputNumber value={settings.bottom} step={step}
                                     onChange={value => updatePadding('bottom', +value)}/>
                        <InputGroupAddon>px</InputGroupAddon>
                    </InputGroup>
                </Form.Group>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={11}>
                <Form.Group>
                    <Form.ControlLabel>Left</Form.ControlLabel>
                    <InputGroup>
                        <InputNumber value={settings.left} step={step}
                                     onChange={value => updatePadding('left', +value)}/>
                        <InputGroupAddon>px</InputGroupAddon>
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Right</Form.ControlLabel>
                    <InputGroup>
                        <InputNumber value={settings.right} step={step}
                                     onChange={value => updatePadding('right', +value)}/>
                        <InputGroupAddon>px</InputGroupAddon>
                    </InputGroup>
                </Form.Group>
            </FlexboxGrid.Item>
        </FlexboxGrid>
    )
}
