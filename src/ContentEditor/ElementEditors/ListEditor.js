import React from 'react';
import ElementEditor from '../LiveEditor/ElementEditor';
import TextInput from '../TextInput';
import FontOptionsEditor from './FontOptionsEditor';

export default function ListEditor({ model, manager, onUpdate }) {
  function updateElement(items) {
    manager.updateElement({...model, items});
    onUpdate();
  }

  function addItem() {
    let items = model.items;
    items.push('');

    updateElement(items);
  }

  function removeItem(index) {
    let items = model.items;
    items.splice(index, 1);

    updateElement(items);
  }

  function updateItem(index, value) {
    let items = model.items;
    items[index] = value;

    updateElement(items);
  }

  function renderItemEditor(item, index) {
    return (
      <div key={index}>
        <label>Item {index + 1}</label>
        <br />
        <TextInput value={item} onChange={value => updateItem(index, value)} />
        <span onClick={_ => removeItem(index)}><strong>Remove Item</strong></span>
      </div>
    )
  }

  const actions = [
    { textLabel: 'Add Item', handler: addItem }
  ];

  return (
    <ElementEditor model={model} manager={manager} actions={actions} onUpdate={onUpdate}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div className='list-editor'>
          {model.items.map(renderItemEditor)}
        </div>
        <FontOptionsEditor model={model} manager={manager} onUpdate={onUpdate} />
      </div>
    </ElementEditor>
  )
}
