import {CaseReducerActions, configureStore, createSlice, EnhancedStore, PayloadAction} from '@reduxjs/toolkit';
import {
    BlooprintElement,
    BlooprintElementMap,
    BlooprintSettingsMap,
    BlooprintSettingsPartial,
} from "../Blooprint";
import {guid} from "rsuite/utils";
import BlooprintConfiguration from "../BlooprintConfiguration";
import {useSelector} from "react-redux";

type UpdateSettingsAction = {
    elementId: string;
    settings: BlooprintSettingsPartial;
}

type AddElementAction = {
    parentId: string;
    element: BlooprintElement;
}

type ElementAction = {
    elementId: string;
}

function mapElement(element: BlooprintElement, elements: BlooprintElementMap, settings: BlooprintSettingsMap) {
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

function getRoot(elements: BlooprintElementMap) {
    const roots = Object.keys(elements).filter(elementId => !elements[elementId].parentId);
    if (!roots || ! roots.length) throw new Error('Blooprint has no root element.');
    if (roots.length > 1) throw new Error('Blooprint should have only one root element.');
    
    return roots[0];
}

type BlooprintState = {
    elements: BlooprintElementMap;
    settings: BlooprintSettingsMap;
    root: string;
    highlightedElement?: string;
}

type BlooprintReducer = {
    updateSettings: (state: BlooprintState, action: PayloadAction<UpdateSettingsAction>) => any;
    addChildElement: (state: BlooprintState, action: PayloadAction<AddElementAction>) => any;
    removeElement: (state: BlooprintState, action: PayloadAction<ElementAction>) => any;
    highlightElement: (state: BlooprintState, action: PayloadAction<ElementAction>) => any;
    removeHighlight: (state: BlooprintState, action: PayloadAction) => any;
}

const buildSlice = (config: BlooprintConfiguration, value: BlooprintElement) => {
    const {elementConfig, settingsConfig} = config;
    
    const elementMap: BlooprintElementMap = {};
    const settingsMap: BlooprintSettingsMap = {};

    mapElement(value, elementMap, settingsMap);
    
    const root = getRoot(elementMap);

    return createSlice<BlooprintState, BlooprintReducer>({
        name: 'blooprint',
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

export type BlooprintApi = CaseReducerActions<BlooprintReducer> & {
    config: BlooprintConfiguration
}

export const useBlooprintSelector = <T>(selector: (state: BlooprintState) => T) => useSelector(selector);

type BlooprintStoreFactory = (config: BlooprintConfiguration, value: BlooprintElement) => [BlooprintApi, EnhancedStore<BlooprintState>];

export const createBlooprintStore: BlooprintStoreFactory = (config: BlooprintConfiguration, value: BlooprintElement) => {
    const slice = buildSlice(config, value);
    const store = configureStore({
        reducer: slice.reducer
    });
    
    return [{
        ...slice.actions,
        config
    }, store]
}
