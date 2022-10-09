import React from 'react';
import demo from '../Demo';

const fontSizes = [ 10, 12, 14, 18, 24, 32 ];
const fontWeights = [ 'normal', 'bold' ];
const colors = [ 'white', 'black', 'red', 'blue', 'green' ];

export default function FontOptionsEditor({ element, manager, onUpdate }) {
    let elementOptions = {...demo.fontOptions, ...element.fontOptions};

    function updateFontOptions(fontOptions) {
        manager.updateElement({...element, fontOptions: {...elementOptions, ...fontOptions}});
        onUpdate();
    }

    return (
        <details>
            <summary>Font Settings</summary>
            <div>
                <div className='text-editor'>
                    <label>Size</label>
                    <select value={elementOptions.fontSize} onChange={e => updateFontOptions({fontSize: +e.target.value})}>
                        {fontSizes.map(size => <option key={size} value={size}>{size}px</option>)}
                    </select>
                </div>
                <div className='text-editor'>
                    <label>Weight</label>
                    <select value={elementOptions.fontWeight} onChange={e => updateFontOptions({fontWeight: e.target.value})}>
                        {fontWeights.map(weight => <option key={weight} value={weight}>{weight}</option>)}
                    </select>
                </div>
                <div className='text-editor'>
                    <label>Color</label>
                    <select value={elementOptions.color} onChange={e => updateFontOptions({color: e.target.value})}>
                        {colors.map(color => <option key={color} value={color}>{color}</option>)}
                    </select>
                </div>
            </div>
        </details>
    )
}
