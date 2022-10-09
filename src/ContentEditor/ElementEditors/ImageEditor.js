import React from 'react';
import { Form, Input, Panel } from 'rsuite';

export default function ImageEditor({element, manager, onUpdate}) {
  function updateUrl(url) {
    manager.updateElement({...element, url});
    onUpdate();
  }

  function updateAlt(alt) {
    manager.updateElement({...element, alt});
    onUpdate();
  }

  return (
    <Panel header="Image Settings">
      <Form.Group>
          <Form.ControlLabel>Url</Form.ControlLabel>
          <Input value={element.url} onChange={updateUrl} />
      </Form.Group>
      <Form.Group>
          <Form.ControlLabel>Placeholder</Form.ControlLabel>
          <Input value={element.alt} onChange={updateAlt} />
      </Form.Group>
    </Panel>
  )
}
