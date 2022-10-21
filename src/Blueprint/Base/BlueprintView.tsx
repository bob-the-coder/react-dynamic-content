import React, {FunctionComponent, ReactElement} from 'react';

import './BlueprintView.css';
import {BlueprintApi, useBlueprintSelector} from "./Redux/BlueprintApi";
import {BlueprintElement, BlueprintSettingsMap} from "./Blueprint";

export type ElementViewProps<T extends BlueprintElement> = {
    element: T,
    children?: ReactElement | ReactElement[]
}

type BlueprintViewProps = {
    elementId: string;
    blueprint: BlueprintApi;
}
export type BlueprintView = FunctionComponent<BlueprintViewProps>;

const BlueprintView: BlueprintView = (props: BlueprintViewProps) => {
    const {blueprint, elementId} = props;
    const element = useBlueprintSelector(state => state.elements[elementId]);

    if (!element.type) return <h2>Broken view</h2>;

    let className = `element-view element-view--${element.type.toLowerCase()}`;

    const highlightedElement = useBlueprintSelector(state => state.highlightedElement);
    
    if (highlightedElement && !element.children.length){
        if (element.id === highlightedElement) {
            className += ' element-view--highlight';
        } else {
            className += ' element-view--obstructed';
        }
    }

    const ElementView = blueprint.config.elementConfig[element.type].view;
    const settings: BlueprintSettingsMap = {};
    const allSettings = useBlueprintSelector(state => state.settings);
    element.settings.forEach(settingsType => settings[settingsType] = allSettings[`${elementId}_${settingsType}`]);
    
    const compiledElement:BlueprintElement = {
        id: elementId,
        parentId: element.parentId,
        settings
    } 

    return (
        <div key={element.id} className={className}>
            <ElementView element={compiledElement}>
                {element.children.map(childElementId => (
                    <BlueprintView key={childElementId} elementId={childElementId} blueprint={blueprint}/>
                ))}
            </ElementView>
        </div>
    )
}
export default BlueprintView;