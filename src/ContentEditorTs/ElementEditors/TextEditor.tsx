import React from 'react';
import { Form, Input, } from 'rsuite';

import Text from '../Demo/Elements/Text';
import PropTypes from '../LiveEditor/ElementPropTypes';

export default function TextEditor(props: PropTypes<Text>) {
  function updateElement(text: string) {
    props.manager.updateElement({...props.element, text});
    props.onUpdate();
  }

  return (
    <div>
      <Form.ControlLabel>Text</Form.ControlLabel>
      <Input name='text'
        placeholder='Type your text here'
        as='textarea'
        defaultValue={props.element.text} 
        rows={5}
        onChange={updateElement} />
    </div>
  )
}
