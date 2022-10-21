import {BlueprintSettings} from "../../Base/Blueprint";

export type FontSettings = BlueprintSettings & {
    fontSize: number;
    fontWeight: string;
    color: string;
}

export const defaultFontSettings = {
    fontSize: 14,
    fontWeight: 'normal',
    color: 'black'
}

type rectDimensions = {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

export const defaultRectDimensions: rectDimensions = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
}

export type PaddingSettings = BlueprintSettings & rectDimensions;

export type MarginsSettings = BlueprintSettings & rectDimensions;

export type ImageSettings = BlueprintSettings & {
    url: string;
    alt: string;
}

export type ListSettings = BlueprintSettings & {
    items: string[];
    ordered: boolean;
}

export type TextSettings = BlueprintSettings & {
    text: string;
}

export type ContainerSettings = BlueprintSettings & {
    alignContent: string;
}

export type PositionSettings = BlueprintSettings & {
    isAbsolute: boolean;
    fromLeft: boolean;
    offsetHorizontal: number;
    fromTop: boolean;
    offsetVertical: number;
};

export const DefaultSettings: {
    Font: FontSettings,
    Padding: PaddingSettings,
    Margins: MarginsSettings,
    Image: ImageSettings,
    Text: TextSettings,
    List: ListSettings,
    Container: ContainerSettings,
    Position: PositionSettings
} = {
    Font: {
        type: 'Font',
        ...defaultFontSettings
    },
    Padding: {
        type: 'Padding',
        ...defaultRectDimensions
    },
    Margins: {
        type: 'Margins',
        ...defaultRectDimensions
    },
    Image: {
        type: 'Image',
        url: '',
        alt: 'Image not available'
    },
    Text: {
        type: 'Text',
        text: ''
    },
    List: {
        type: 'List',
        items: [],
        ordered: false
    },
    Container: {
        type: 'Container',
        alignContent: 'left'
    },
    Position: {
        type: 'Position',
        ...defaultRectDimensions,
        isAbsolute: false,
        fromLeft: true,
        offsetHorizontal: 0,
        fromTop: true,
        offsetVertical: 0
    }
}