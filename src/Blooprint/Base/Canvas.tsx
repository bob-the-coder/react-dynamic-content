import React, {ElementRef, LegacyRef, ReactNode, useEffect, useRef, useState} from "react";
import SimpleBar from "simplebar-react";
import './Canvas.css';

export const CanvasAppearance = {
    screen: 'screen',
    device: 'device'
}

export const CanvasSize = {
    mobile: 'mobile',
    tablet: 'tablet',
    web: 'web'
}

type CanvasProps = {
    children: ReactNode[] | ReactNode;
    appearance: string,
    size: string
}

const padding = 30;

export default function Canvas(props: CanvasProps) {
    const className = `workspace-viewer--canvas workspace-viewer--${props.appearance}`;
    const [size, setSize] = useState('');
    const [style, setStyle] = useState({
        width: 0,
        height: 0
    });
    const canvas = React.createRef<HTMLDivElement>();
    const [maxHeight, setMaxHeight] = useState(0);
    
    function resize() {
        if (props.size === size) return;
        
        if (!canvas.current) return;
        const container = canvas.current.parentElement;
        if (!container) return;
        const wrapper = container.parentElement;
        if (!wrapper) return;
        const boundingBox = wrapper.getBoundingClientRect();
        if (!boundingBox) return;
        
        switch (props.size) {
            case CanvasSize.mobile:
                setStyle({
                    height: boundingBox.height,
                    width: boundingBox.height * 0.5
                });
                break;
            case CanvasSize.tablet:
                setStyle({
                    width: boundingBox.width * 0.8,
                    height: boundingBox.width * 9 / 16
                });
                break;
            case CanvasSize.web:
                setStyle({
                    height: boundingBox.height,
                    width: boundingBox.width
                });
                break;
        }
        setMaxHeight(boundingBox.height);
        setSize(props.size);
    }

    useEffect(resize);

    return (
        // <div className={'element-view--canvas-wrapper'}>
            <SimpleBar style={{maxHeight: '100%'}}>
                <div ref={canvas} style={{width: style.width, padding}} className={className}>
                    {props.children}
                </div>
            </SimpleBar>
            // <div style={{width: style.width - 2 * padding}} className='element-view--canvas-overlay'></div>
        // </div>
    )
}