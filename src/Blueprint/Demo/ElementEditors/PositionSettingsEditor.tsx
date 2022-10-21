import React from 'react'
import {Form, InputNumber, InputGroup, FlexboxGrid, Checkbox, RadioGroup, Radio, Input} from 'rsuite'
import InputGroupAddon from 'rsuite/esm/InputGroup/InputGroupAddon'
import {SettingsEditorProps} from "../../Base/BlueprintConfiguration";
import {PositionSettings} from "../Data/ExampleSettings";


const step = 5;
const leftRight = ['left', 'right']
const topBottom = ['top', 'bottom']

export default function PositionSettingsEditor(props: SettingsEditorProps<PositionSettings>) {
    const {settings} = props;

    function updatePadding(side: string, value: number) {
        props.updateSettings({[side]: value});
    }
    
    const optionsStyle: {[_: string]: any} = {
        opacity: settings.isAbsolute ? 1 : 0.5,
        userSelect: settings.isAbsolute ? 'initial' : 'none',
        cursor: settings.isAbsolute ? 'default' : 'not-allowed'
    }

    return (
        <>
            <Form.Group>
                <Form.ControlLabel>Use absolute position</Form.ControlLabel>
                <Checkbox value={`${settings.isAbsolute}`} onChange={_ => { props.updateSettings({isAbsolute: !settings.isAbsolute})}} />
            </Form.Group>
            <Form.Group style={optionsStyle}>
                <Form.ControlLabel>Horizontal Offset</Form.ControlLabel>
                <RadioGroup value={settings.fromLeft ? 'left' : 'right'} onChange={align => props.updateSettings({ fromLeft: align === 'left' })}
                            inline={true}>
                    {leftRight.map((option, i) => (
                        <Radio key={i} value={option} readOnly={!settings.isAbsolute} disabled={!settings.isAbsolute}>From the {option}</Radio>
                    ))}
                </RadioGroup>
                <InputGroup>
                    <InputNumber value={settings.offsetHorizontal} step={5} disabled={!settings.isAbsolute}
                           onChange={value => props.updateSettings({offsetHorizontal: +value})}/>
                    <InputGroupAddon>px</InputGroupAddon>
                </InputGroup>
            </Form.Group>
            <Form.Group style={optionsStyle}>
                <Form.ControlLabel>Vertical Offset</Form.ControlLabel>
                <RadioGroup value={settings.fromTop ? 'top' : 'bottom'} onChange={align => props.updateSettings({ fromTop: align === 'top' })}
                            inline={true}>
                    {topBottom.map((option, i) => (
                        <Radio key={i} value={option} readOnly={!settings.isAbsolute} disabled={!settings.isAbsolute}>From the {option}</Radio>
                    ))}
                </RadioGroup>
                <InputGroup>
                    <InputNumber value={settings.offsetVertical} step={5} disabled={!settings.isAbsolute}
                           onChange={value => props.updateSettings({offsetVertical: +value})}/>
                    <InputGroupAddon>px</InputGroupAddon>
                </InputGroup>
            </Form.Group>
        </>
    )
}
