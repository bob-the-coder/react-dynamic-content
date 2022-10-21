import React from 'react';
import {Form, Input, InputGroup, RadioGroup, Radio} from 'rsuite';
import InputGroupButton from 'rsuite/esm/InputGroup/InputGroupButton';
import {SettingsEditorProps} from "../../Base/BlooprintConfiguration";
import {ListSettings} from "../Data/ExampleSettings";

export default function ListSettingsEditor(props: SettingsEditorProps<ListSettings>) {
    const { settings} = props;
    
    const orderType = settings.ordered ? 'Ordered' : 'Unordered';

    function updateOrderType(newOrderType: string) {
        props.updateSettings({ordered: newOrderType === 'Ordered'});
    }

    function addItem() {
        const items = settings.items;
        items.push('');
        
        props.updateSettings({items});
    }

    function removeItem(index: number) {
        const items = settings.items;
        items.splice(index, 1);
        
        props.updateSettings({items});
    }

    function updateItem(value: string, index: number) {
        const items = Array.from(settings.items);
        items[index] = value;
        
        props.updateSettings({items});
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
        <Form.Group>
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
