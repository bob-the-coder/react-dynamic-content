import React, {useState} from 'react';
import TextInput from '../TextInput';
import FontOptionsEditor from './FontOptionsEditor';

export default function TextEditor({ element, manager, onUpdate }) {
  const [useLargeEditor, setUseLargeEditor] = useState(false);

  function updateElement(text) {
    manager.updateElement({...element, text});
    onUpdate();
  }

  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div>
        <label htmlFor={`editor-${element.id}`}>
          Use large editor
          <input type='checkbox' name={`editor-${element.id}`} onClick={() => setUseLargeEditor(!useLargeEditor)} value={useLargeEditor} />
        </label>
        <div>
            <label>Text</label>
            <TextInput value={element.url} large={useLargeEditor} onChange={updateElement} />
        </div>
      </div>
      <FontOptionsEditor element={element} manager={manager} onUpdate={onUpdate} />
    </div>
  )
}
