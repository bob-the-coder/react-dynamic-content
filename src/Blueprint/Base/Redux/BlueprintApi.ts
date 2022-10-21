import {CaseReducerActions, configureStore, createSlice, EnhancedStore, PayloadAction} from '@reduxjs/toolkit';
import {
    BlueprintElement,
    BlueprintElementMap,
    BlueprintSettingsMap,
    BlueprintSettingsPartial,
} from "../Blueprint";
import {guid} from "rsuite/utils";
import BlueprintConfiguration from "../BlueprintConfiguration";
import {useSelector} from "react-redux";

type UpdateSettingsAction = {
    elementId: string;
    settings: BlueprintSettingsPartial;
}

type AddElementAction = {
    parentId: string;
    element: BlueprintElement;
}

type ElementAction = {
    elementId: string;
}

function mapElement(element: BlueprintElement, elements: BlueprintElementMap, settings: BlueprintSettingsMap) {
    if (!element.type) throw new Error('Undefined element type.');
    if (!element.id) element.id = guid();

    const childElements = element.children;

    elements[element.id] = {
        id: element.id,
        parentId: element.parentId,
        type: element.type,
        settings: Object.keys(element.settings),
        children: []
    };
    if (element.parentId) elements[element.parentId].children.push(element.id);
    
    for (let settingsType in element.settings) {
        settings[`${element.id}_${settingsType}`] = element.settings[settingsType];
    }
    

    if (!childElements || childElements.length === 0) {
        return;
    }
    
    for (let index in childElements){
        childElements[index].parentId = element.id;
        mapElement(childElements[index], elements, settings);
    }
}

function getRoot(elements: BlueprintElementMap) {
    const roots = Object.keys(elements).filter(elementId => !elements[elementId].parentId);
    if (!roots || ! roots.length) throw new Error('Blueprint has no root element.');
    if (roots.length > 1) throw new Error('Blueprint should have only one root element.');
    
    return roots[0];
}

type BlueprintState = {
    elements: BlueprintElementMap;
    settings: BlueprintSettingsMap;
    root: string;
    highlightedElement?: string;
}

type BlueprintReducer = {
    updateSettings: (state: BlueprintState, action: PayloadAction<UpdateSettingsAction>) => any;
    addChildElement: (state: BlueprintState, action: PayloadAction<AddElementAction>) => any;
    removeElement: (state: BlueprintState, action: PayloadAction<ElementAction>) => any;
    highlightElement: (state: BlueprintState, action: PayloadAction<ElementAction>) => any;
    removeHighlight: (state: BlueprintState, action: PayloadAction) => any;
}

const buildSlice = (config: BlueprintConfiguration, value: BlueprintElement) => {
    const {elementConfig, settingsConfig} = config;
    
    const elementMap: BlueprintElementMap = {};
    const settingsMap: BlueprintSettingsMap = {};

    mapElement(value, elementMap, settingsMap);
    
    const root = getRoot(elementMap);

    return createSlice<BlueprintState, BlueprintReducer>({
        name: 'blueprint',
        initialState: {
            elements: elementMap,
            settings: settingsMap,
            root
        },
        reducers: {
            updateSettings: (state, action: PayloadAction<UpdateSettingsAction>) => {
                const {elementId, settings} = action.payload;
                if (!elementId) throw new Error('Element id is missing.');
                if (!settings.type) throw new Error('Settings type is missing.');
                if (!settingsConfig.hasOwnProperty(settings.type)) throw new Error(`Invalid settings type "${settings.type}".`);
                
                const settingsKey = `${elementId}_${settings.type}`;
                if (!state.settings.hasOwnProperty(settingsKey)) throw new Error(`Element "${elementId}" has no "${settings.type}" settings.`);
                
                Object.keys(settings).forEach(property => state.settings[settingsKey][property] = settings[property]);
            },
            addChildElement: (state, action: PayloadAction<AddElementAction>) => {
                const {parentId, element} = action.payload;
                if (!parentId) throw new Error('Parent element id is missing.');
                if (!state.elements.hasOwnProperty(parentId)) throw new Error(`Invalid parent element id "${parentId}".`);
                if (!element.type || !elementConfig.hasOwnProperty(element.type)) throw new Error(`Invalid element type "${element.type}".`);
                if (!element.id) {
                    console.log('Element has no id. Generating a new one.');
                    element.id = guid();
                }

                element.parentId = parentId;
                mapElement(element, state.elements, state.settings);
            },
            removeElement: (state, action: PayloadAction<ElementAction>) => {
                const {elementId} = action.payload;
                if (!elementId) throw new Error('Element id is missing.');
                if (!state.elements.hasOwnProperty(elementId)) throw new Error(`Invalid element id ${elementId}`);
                
            },
            highlightElement: (state, action: PayloadAction<ElementAction>) => {
                const {elementId} = action.payload;
                if (!elementId) throw new Error('Element id is missing.');
                if (!state.elements.hasOwnProperty(elementId)) throw new Error(`Invalid element id ${elementId}`);
                
                state.highlightedElement = elementId;
            },
            removeHighlight: (state) => {
                if (!state.highlightedElement) return;
                
                state.highlightedElement = undefined;
            }
        }
    });
}

export type BlueprintApi = CaseReducerActions<BlueprintReducer> & {
    config: BlueprintConfiguration
}

export const useBlueprintSelector = <T>(selector: (state: BlueprintState) => T) => useSelector(selector);

type BlueprintStoreFactory = (config: BlueprintConfiguration, value: BlueprintElement) => [BlueprintApi, EnhancedStore<BlueprintState>];

export const createBlueprintStore: BlueprintStoreFactory = (config: BlueprintConfiguration, value: BlueprintElement) => {
    const slice = buildSlice(config, value);
    const store = configureStore({
        reducer: slice.reducer
    });
    
    return [{
        ...slice.actions,
        config
    }, store]
}
