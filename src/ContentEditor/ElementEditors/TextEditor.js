import React, {useState} from 'react';
import { Form, Checkbox, Input, } from 'rsuite';

export default function TextEditor({ element, manager, onUpdate }) {
  const [useLargeEditor, setUseLargeEditor] = useState(false);

  function updateElement(text) {
    manager.updateElement({...element, text});
    onUpdate();
  }

  return (
    <div>
      <Form.ControlLabel>Text</Form.ControlLabel>
      <Checkbox 
        checked={useLargeEditor} 
        onChange={() => setUseLargeEditor(!useLargeEditor)}
      >
        Use large editor
      </Checkbox>
      <Input name='text'
        placeholder='Type your text here'
        as={(useLargeEditor ? 'textarea' : 'input')}
        defaultValue={element.text} 
        rows={3}
        onChange={updateElement} />
    </div>
  )
}
