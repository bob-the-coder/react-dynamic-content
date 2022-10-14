import React, {useState} from 'react';
import {Form, Input, InputGroup, RadioGroup, Radio} from 'rsuite';
import InputGroupButton from 'rsuite/esm/InputGroup/InputGroupButton';
import {ListSettings} from "../Demo/Elements/Mixins";
import UiElement from "../Base/UiElement";
import {SettingsEditorProps} from "../BlueprintConfiguration";

export default function ListSettingsEditor<TProps extends SettingsEditorProps<UiElement & ListSettings>>(props: TProps) {
    const [orderType, setOrderType] = useState(props.element.ordered ? 'Ordered' : 'Unordered');

    function updateElement(newElement: any) {
        props.blueprint.updateElement({...props.element, ...newElement});
    }

    function addItem() {
        let items = props.element.items || [];
        items.push('');
        updateElement({items});
    }

    function removeItem(index: number) {
        let items = props.element.items;
        items.splice(index, 1);

        updateElement({items});
    }

    function updateItem(value: string, index: number) {
        let items = props.element.items;
        items[index] = value;

        updateElement({items});
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

    function updateOrderType(orderType: string) {
        setOrderType(orderType);
        updateElement({ordered: orderType === 'Ordered'})
    }

    return (
        <>
            <Form.Group>
                <RadioGroup inline={true} onChange={(_) => updateOrderType(_.toString())} value={orderType}>
                    <Radio value='Ordered'>Ordered</Radio>
                    <Radio value='Unordered'>Unordered</Radio>
                </RadioGroup>
            </Form.Group>
            {props.element.items.map(renderItemEditor)}
        </>
    )
}
