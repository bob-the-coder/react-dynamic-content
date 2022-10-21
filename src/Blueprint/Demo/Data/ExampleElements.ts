import {BlueprintElement} from "../../Base/Blueprint";
import {
    ContainerSettings,
    FontSettings,
    PaddingSettings,
    TextSettings,
    ImageSettings,
    ListSettings,
    MarginsSettings, DefaultSettings, PositionSettings
} from "./ExampleSettings";

export type Container = BlueprintElement & {
    settings: {
        Container: ContainerSettings,
        Padding: PaddingSettings,
    }
}

export type Text = BlueprintElement & {
    settings: {
        Text: TextSettings,
        Font: FontSettings,
        Padding: PaddingSettings
    }
}

export type Image = BlueprintElement & {
    settings: {
        Image: ImageSettings,
        Margins: MarginsSettings,
        Position: PositionSettings
    }
}

export type List = BlueprintElement & {
    settings: {
        List: ListSettings,
        Font: FontSettings,
        Padding: PaddingSettings
    }
}

const DefaultBlueprintElement: BlueprintElement = {
    id: '',
    settings: {}
};

export const DefaultElements: {
    Container: (children: BlueprintElement[]) => Container,
    Text: (text: string) => Text,
    Image: (url: string, alt: string) => Image,
    List: (items: string[]) => List
} = {
    Container: function(children: BlueprintElement[]) {
        const value = {
            type: 'Container',
            ...DefaultBlueprintElement,
            settings: {
                Container: {...DefaultSettings.Container},
                Padding: {...DefaultSettings.Padding}
            }
        }
        value.children = children;
        return value;
    },
    Text: (text: string) => {
        const value = {
            ...DefaultBlueprintElement,
            type: 'Text',
            settings: {
                Text: {...DefaultSettings.Text},
                Font: {...DefaultSettings.Font},
                Padding: {...DefaultSettings.Padding}
            }
        }
        value.settings.Text.text = text;
        return value;
    },
    Image: (url: string, alt: string) => {
        const value = {
            ...DefaultBlueprintElement,
            type: 'Image',
            settings: {
                Image: {...DefaultSettings.Image},
                Margins: {...DefaultSettings.Margins},
                Position: {...DefaultSettings.Position}
            }
        };
        value.settings.Image.url = url;
        value.settings.Image.alt = alt;
        
        return value;
    },
    List: (items: string[]) => {
        const value = {
            ...DefaultBlueprintElement,
            type: 'List',
            settings: {
                List: {...DefaultSettings.List},
                Font: {...DefaultSettings.Font},
                Padding: {...DefaultSettings.Padding}
            }
        };
        value.settings.List.items = items;
        return value;
    }
}