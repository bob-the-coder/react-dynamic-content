import React, {FunctionComponent, ReactElement} from 'react';

import './BlooprintView.css';
import {BlooprintApi, useBlooprintSelector} from "./Redux/BlooprintApi";
import {BlooprintElement, BlooprintSettingsMap} from "./Blooprint";

export type ElementViewProps<T extends BlooprintElement> = {
    element: T,
    children?: ReactElement | ReactElement[]
}

type BlooprintViewProps = {
    elementId: string;
    blooprint: BlooprintApi;
}
export type BlooprintView = FunctionComponent<BlooprintViewProps>;

const BlooprintView: BlooprintView = (props: BlooprintViewProps) => {
    const {blooprint, elementId} = props;
    const element = useBlooprintSelector(state => state.elements[elementId]);

    if (!element.type) return <h2>Broken view</h2>;

    let className = `element-view element-view--${element.type.toLowerCase()}`;

    const highlightedElement = useBlooprintSelector(state => state.highlightedElement);
    if (element.id === highlightedElement) {
        className += ' element-view--highlight';
    } else if (highlightedElement && !element.children.length) {
        className += ' element-view--obstructed';
    }

    const ElementView = blooprint.config.elementConfig[element.type].view;
    const settings: BlooprintSettingsMap = {};
    const allSettings = useBlooprintSelector(state => state.settings);
    element.settings.forEach(settingsType => settings[settingsType] = allSettings[`${elementId}_${settingsType}`]);
    
    const compiledElement:BlooprintElement = {
        id: elementId,
        parentId: element.parentId,
        settings
    } 

    return (
        <div key={element.id} className={className}>
            <ElementView element={compiledElement}>
                {element.children.map(childElementId => (
                    <BlooprintView key={childElementId} elementId={childElementId} blooprint={blooprint}/>
                ))}
            </ElementView>
        </div>
    )
}
export default BlooprintView;