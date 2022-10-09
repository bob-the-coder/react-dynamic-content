import React, { useState } from 'react';
import { Form, Input, InputGroup, Panel, RadioGroup, Radio } from 'rsuite';
import InputGroupButton from 'rsuite/esm/InputGroup/InputGroupButton';

export default function ListEditor({ element, manager, onUpdate }) {
  const [ orderType, setOrderType ] = useState('Ordered');

  function updateElement(newElement) {
    manager.updateElement({...element, ...newElement});
    onUpdate();
  }

  function removeItem(index) {
    let items = element.items;
    items.splice(index, 1);

    updateElement({ items });
  }

  function updateItem(index, value) {
    let items = element.items;
    items[index] = value;

    updateElement({ items });
  }

  function renderItemEditor(item, index) {
    return (
      <Form.Group key={index}>
        <Form.ControlLabel>Item {index + 1}</Form.ControlLabel>
        <br />
        <InputGroup>
          <Input value={item} onChange={value => updateItem(index, value)} />
          <InputGroupButton onClick={_ => removeItem(index)}>&times;</InputGroupButton>
        </InputGroup>
      </Form.Group>
    )
  }

  function updateOrderType(orderType) {
    setOrderType(orderType);
    updateElement({ ordered: orderType === 'Ordered' })
  }

  return (
    <Panel header="List Settings">
      <Form.Group>
          <RadioGroup inline={true} onChange={updateOrderType} value={orderType}>
            <Radio value='Ordered'>Ordered</Radio>
            <Radio value='Unordered'>Unordered</Radio>
          </RadioGroup>
        </Form.Group>
      {element.items.map(renderItemEditor)}
    </Panel>
  )
}
