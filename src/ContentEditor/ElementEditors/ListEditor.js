import React from 'react';
import TextInput from '../TextInput';
import FontOptionsEditor from './FontOptionsEditor';

export default function ListEditor({ element, manager, onUpdate }) {
  function updateElement(items) {
    manager.updateElement({...element, items});
    onUpdate();
  }

  function addItem() {
    let items = element.items;
    items.push('');

    updateElement(items);
  }

  function removeItem(index) {
    let items = element.items;
    items.splice(index, 1);

    updateElement(items);
  }

  function updateItem(index, value) {
    let items = element.items;
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

  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div className='list-editor'>
        {element.items.map(renderItemEditor)}
      </div>
      <FontOptionsEditor element={element} manager={manager} onUpdate={onUpdate} />
    </div>
  )
}
