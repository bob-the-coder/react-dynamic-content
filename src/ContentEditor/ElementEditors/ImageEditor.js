import React from 'react';
import TextInput from '../TextInput';

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
    <div>
      <div className='image-editor'>
          <label>Url</label>
          <TextInput value={element.url} onChange={updateUrl} />
      </div>
      <div className='image-editor'>
          <label>Placeholder</label>
          <TextInput value={element.alt} onChange={updateAlt} />
      </div>
    </div>
  )
}
