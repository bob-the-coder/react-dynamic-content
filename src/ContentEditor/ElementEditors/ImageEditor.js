import React from 'react';
import ElementEditor from '../LiveEditor/ElementEditor';
import TextInput from '../TextInput';

export default function ImageEditor({model, manager, onUpdate}) {
  function updateUrl(url) {
    manager.updateElement({...model, url});
    onUpdate();
  }

  function updateAlt(alt) {
    manager.updateElement({...model, alt});
    onUpdate();
  }

  const actions = [
    { textLabel: 'Remove Image', handler: _ => manager.removeElement(model) }
  ];

  return (
    <ElementEditor model={model} manager={manager} actions={actions} onUpdate={onUpdate}>
      <div className='image-editor'>
            <label>Url</label>
            <TextInput value={model.url} onChange={updateUrl} />
        </div>
        <div className='image-editor'>
            <label>Placeholder</label>
            <TextInput value={model.alt} onChange={updateAlt} />
        </div>
    </ElementEditor>
  )
}
