import React from 'react';
import {Form, Input, InputGroup, RadioGroup, Radio} from 'rsuite';
import InputGroupButton from 'rsuite/esm/InputGroup/InputGroupButton';
import {SettingsEditorProps} from "../../Base/BlooprintConfiguration";
import {ListSettings} from "../Data/ExampleSettings";

export default function ListSettingsEditor(props: SettingsEditorProps<ListSettings>) {
    const { element, settings, blooprint } = props;
    
    const orderType = settings.ordered ? 'Ordered' : 'Unordered';

    function updateElement(newElement: any) {
        blooprint.updateElement({...props.element, ...newElement});
    }
    
    function updateOrderType(orderType: string) {
        settings.ordered = orderType === 'Ordered';
        props.updateSettings(settings);
    }

    function addItem() {
        settings.items.push('');
        props.updateSettings(settings);
    }

    function removeItem(index: number) {
        settings.items.splice(index, 1);
        props.updateSettings(settings);
    }

    function updateItem(value: string, index: number) {
        settings.items[index] = value;
        props.updateSettings(settings);
    }

    function renderItemEditor(item: string, index: number) {
        return (
            <Form.Group key={index}>
                <Form.ControlLabel>Item {index + 1}</Form.ControlLabel>
                <br/>
                <InputGroup>
                    <Input value={item} onChange={value => updateItem(value, index)}/>
                    <InputGroupButton onClick={_ => removeItem(index)}>&times;</InputGroupButton>
                </InputGroup>
            </Form.Group>
        )
    }

    return (
        <Form.Group key={Math.random()}>
            <Form.Group>
                <RadioGroup inline={true} onChange={(_) => updateOrderType(_.toString())} value={orderType}>
                    <Radio value='Ordered'>Ordered</Radio>
                    <Radio value='Unordered'>Unordered</Radio>
                </RadioGroup>
            </Form.Group>
            <Form.Group>
                {settings.items.map(renderItemEditor)}
            </Form.Group>
        </Form.Group>
    )
}
