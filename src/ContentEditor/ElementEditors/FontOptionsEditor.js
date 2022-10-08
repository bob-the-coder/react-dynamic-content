import React from 'react';
import demo from '../DemoTree';

const fontSizes = [ 10, 12, 14, 18, 24, 32 ];
const fontWeights = [ 'normal', 'bold' ];
const colors = [ 'white', 'black', 'red', 'blue', 'green' ];

export default function FontOptionsEditor({ model, manager, onUpdate }) {
    let modelOptions = {...demo.fontOptions, ...model.fontOptions};

    function updateFontOptions(fontOptions) {
        manager.updateElement({...model, fontOptions: {...modelOptions, ...fontOptions}});
        onUpdate();
    }

    return (
        <details>
            <summary>Font Settings</summary>
            <div>
                <div className='text-editor'>
                    <label>Size</label>
                    <select value={modelOptions.fontSize} onChange={e => updateFontOptions({fontSize: +e.target.value})}>
                        {fontSizes.map(size => <option key={size} value={size}>{size}px</option>)}
                    </select>
                </div>
                <div className='text-editor'>
                    <label>Weight</label>
                    <select value={modelOptions.fontWeight} onChange={e => updateFontOptions({fontWeight: e.target.value})}>
                        {fontWeights.map(weight => <option key={weight} value={weight}>{weight}</option>)}
                    </select>
                </div>
                <div className='text-editor'>
                    <label>Color</label>
                    <select value={modelOptions.color} onChange={e => updateFontOptions({color: e.target.value})}>
                        {colors.map(color => <option key={color} value={color}>{color}</option>)}
                    </select>
                </div>
            </div>
        </details>
    )
}
