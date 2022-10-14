import UiElement from "./Base/UiElement";
import {UiSettingsType} from "./Demo/Elements/UiElementType";
import {ReactNode} from "react";
import {UiSettings} from "./Base/UiSettings";

export type BlueprintApi = {
    addElement: (element: UiElement, parentId: string) => any;
    removeElement: (element: UiElement) => any;
    updateElement: (element: UiElement) => any;
    highlight: (element?: UiElement) => any;
    isHighlighting: () => boolean;
}

export type SettingsEditorProps<T extends UiSettings> = {
    element: T;
    blueprint: BlueprintApi;
    config: BlueprintConfiguration;
}
export type SettingsEditorProvider<T extends UiSettings> = (props: SettingsEditorProps<UiElement & T>) => ReactNode;

export type ElementViewProps<T extends UiElement> = {
    element: T,
    blueprint: BlueprintApi,
    config: BlueprintConfiguration,
}
export type ElementViewProvider<T extends UiElement> = (props: ElementViewProps<T>) => ReactNode;

export type SettingsConfiguration<T extends UiSettings> = {
    type: string;
    editor: SettingsEditorProvider<T>
}

export type ElementConfiguration<T extends UiElement> = {
    type: string;
    defaultValue: T;
    settings: UiSettingsType[];
    view: ElementViewProvider<T>
}

class BlueprintConfiguration {
    private settingsConfig: { [key: string]: SettingsConfiguration<any> } = {};
    private elementConfig: { [key: string]: ElementConfiguration<any> } = {};

    configureSettings<T extends UiSettings>(settings: SettingsConfiguration<T>) {
        let existing = this.settingsConfig[settings.type];
        if (existing) throw new Error(`${settings.type} is already configured.`);

        this.settingsConfig[settings.type] = settings;
    }

    configureElement<T extends UiElement>(config: ElementConfiguration<T>) {
        let existing = this.elementConfig[config.type];
        if (existing) throw new Error(`${config.type} is already configured.`);

        this.elementConfig[config.type] = config;
    }

    getSettings<T extends UiElement>(element: T): SettingsConfiguration<UiSettings>[] {
        let elementSettings = this.getConfiguration(element.type).settings;
        
        return elementSettings.map(type => this.settingsConfig[type])
    }
    
    getConfiguration(type: string) {
        return this.elementConfig[type];
    }
    
    getElementView<T extends UiElement>(element: T): ElementViewProvider<T> {
        return this.elementConfig[element.type].view;
    }
}

export default BlueprintConfiguration;