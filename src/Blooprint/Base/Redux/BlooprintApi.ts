import {CaseReducerActions, configureStore, createSlice, EnhancedStore, PayloadAction, Slice} from '@reduxjs/toolkit';
import {BlooprintElement, BlooprintMap, BlooprintSettingsPartial} from "../Blooprint";
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

function deconstructElement(map: BlooprintMap, element: BlooprintElement, parentId?: string) {
    if (!element.type) throw new Error('Undefined element type.');
    if (!element.id) element.id = guid();

    const childElements = element.children;

    element.parentId = parentId;
    element.children = [];
    map[element.id] = element;

    if (!childElements || childElements.length === 0) return;
    map[element.id].hasChildren = true;

    for (let i = 0; i < childElements.length; i++){
        deconstructElement(map, childElements[i], element.id);
    }
}

function getRoot(blooprint: BlooprintMap) {
    for (let elementId in blooprint) {
        if (blooprint[elementId].parentId) continue;
        
        return blooprint[elementId];
    }
}

export type Blooprint = {
    map: BlooprintMap;
    root: BlooprintElement;
    highlightedElement?: string;
    isHighlighting: boolean;
}

export type BlooprintReducer = {
    updateSettings: (state: Blooprint, action: PayloadAction<UpdateSettingsAction>) => any;
    addChildElement: (state: Blooprint, action: PayloadAction<AddElementAction>) => any;
    removeElement: (state: Blooprint, action: PayloadAction<ElementAction>) => any;
    highlightElement: (state: Blooprint, action: PayloadAction<ElementAction>) => any;
    removeHighlight: (state: Blooprint, action: PayloadAction) => any;
}

const buildSlice = (config: BlooprintConfiguration, value: BlooprintMap | BlooprintElement) => {
    const {elementConfig, settingsConfig} = config;
    
    let map: BlooprintMap = {};
    if ((<BlooprintElement>value).type) deconstructElement(map, <BlooprintElement>value);
    else map = <BlooprintMap>value;
    
    const root = getRoot(map);
    if (!root) throw new Error('Blooprint has no root element.');

    return createSlice<Blooprint, BlooprintReducer>({
        name: 'blooprint',
        initialState: {
            map,
            root,
            isHighlighting: false
        },
        reducers: {
            updateSettings: (state, action: PayloadAction<UpdateSettingsAction>) => {
                const {elementId, settings} = action.payload;
                if (!elementId) throw new Error('Element id is missing.');
                if (!state.map.hasOwnProperty(elementId)) throw new Error(`Invalid element id "${elementId}".`);
                if (!settings.type) throw new Error('Settings type is missing.');
                if (!settingsConfig.hasOwnProperty(settings.type)) throw new Error(`Invalid settings type "${settings.type}".`);
                if (!state.map[elementId].settings.hasOwnProperty(settings.type)) throw new Error(`Element "${elementId}" has no settings for "${settings.type}".`);

                Object.keys(settings).forEach(key => state.map[elementId].settings[settings.type][key] = settings[key]);
            },
            addChildElement: (state, action: PayloadAction<AddElementAction>) => {
                const {parentId, element} = action.payload;
                if (!parentId) throw new Error('Parent element id is missing.');
                if (!state.map.hasOwnProperty(parentId)) throw new Error(`Invalid parent element id "${parentId}".`);
                if (!element.type || !elementConfig.hasOwnProperty(element.type)) throw new Error(`Invalid element type "${element.type}".`);
                if (!element.id) {
                    console.log('Element has no id. Generating a new one.');
                    element.id = guid();
                }

                element.parentId = parentId;
                state.map[element.id] = element;
                state.map[element.id].hasChildren = true;
            },
            removeElement: (state, action: PayloadAction<ElementAction>) => {
                const {elementId} = action.payload;
                if (!elementId) throw new Error('Element id is missing.');
                if (!state.map.hasOwnProperty(elementId)) throw new Error(`Invalid element id ${elementId}`);
                
                const parentId = state.map[elementId].parentId;
                
                function removeRecursively(elementId: string) {
                    const element = state.map[elementId];
                    
                    if (element.hasChildren) {
                        const children = getChildren(element, state.map);
                        children.forEach(childElement => removeRecursively(childElement.id));
                    }
                    
                    if (element.parentId) delete state.map[elementId];
                }
                
                removeRecursively(elementId);
                if (!parentId) return;
                
                const remainingChildren = getChildren(state.map[parentId], state.map);
                state.map[parentId].hasChildren = remainingChildren.length > 0;
            },
            highlightElement: (state, action: PayloadAction<ElementAction>) => {
                const {elementId} = action.payload;
                if (!elementId) throw new Error('Element id is missing.');
                if (!state.map.hasOwnProperty(elementId)) throw new Error(`Invalid element id ${elementId}`);
                if (state.map[elementId].hasChildren) return;
                
                state.highlightedElement = elementId;
                Object.keys(state.map).forEach(key => state.map[key].isHighlighted = false);
                state.map[elementId].isHighlighted = true;
                state.isHighlighting = true;
            },
            removeHighlight: (state) => {
                if (!state.highlightedElement) return;
                
                state.map[state.highlightedElement].isHighlighted = false;
                state.highlightedElement = undefined;
                state.isHighlighting = false;
            }
        }
    });
}

export type BlooprintApi = CaseReducerActions<BlooprintReducer> & {
    config: BlooprintConfiguration
}

export const useBlooprintSelector = <T>(selector: (state: Blooprint) => T) => useSelector(selector);

type BlooprintStoreFactory = (config: BlooprintConfiguration, value: BlooprintMap | BlooprintElement) => [BlooprintApi, EnhancedStore<Blooprint>];

export const createBlooprintStore: BlooprintStoreFactory = (config: BlooprintConfiguration, value: BlooprintMap | BlooprintElement) => {
    const slice = buildSlice(config, value);
    const store = configureStore({
        reducer: slice.reducer
    });
    
    return [{
        ...slice.actions,
        config
    }, store]
}

export const getChildren = (parent: BlooprintElement, map: BlooprintMap) => 
    Object.keys(map)
        .map(elementId => map[elementId])
        .filter(element => element.parentId === parent.id);
