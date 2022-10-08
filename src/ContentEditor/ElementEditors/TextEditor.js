import React, {useState} from 'react';
import ElementEditor from '../LiveEditor/ElementEditor';
import TextInput from '../TextInput';
import FontOptionsEditor from './FontOptionsEditor';

export default function TextEditor({ model, manager, onUpdate }) {
  const [useLargeEditor, setUseLargeEditor] = useState(false);

  function updateElement(text) {
    manager.updateElement({...model, text});
    onUpdate();
  }

  const actions = [
    { textLabel: 'Remove Text', handler: () => manager.removeElement(model) }
  ];

  return (
    <ElementEditor model={model} manager={manager} actions={actions} onUpdate={onUpdate}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <label htmlFor={`editor-${model.id}`}>
            Use large editor
            <input type='checkbox' name={`editor-${model.id}`} onClick={() => setUseLargeEditor(!useLargeEditor)} value={useLargeEditor} />
          </label>
          <div>
              <label>Text</label>
              <TextInput value={model.url} large={useLargeEditor} onChange={updateElement} />
          </div>
        </div>
        <FontOptionsEditor model={model} manager={manager} onUpdate={onUpdate} />
      </div>
    </ElementEditor>
  )
}
