import {ElementActionProps} from "./BlueprintConfiguration";

export type BlueprintSettingsPartial = {[key: string]: any}

export type BlueprintSettings = BlueprintSettingsPartial & {
    type: string;
}

export type BlueprintSettingsMap = {
    [key: string]: BlueprintSettings;
}

export type BlueprintElement = {
    id: string;
    parentId?: string;
    type?: string;
    settings: BlueprintSettingsMap;
    children?: BlueprintElement[];
}

export type MappedBlueprintElement = {
    id: string;
    parentId?: string;
    type: string;
    settings: string[];
    children: string[];
}

export type BlueprintElementMap = {
    [key: string]: MappedBlueprintElement;
}
