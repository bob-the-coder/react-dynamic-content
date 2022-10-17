import {BlooprintSettings} from "../../Base/Blooprint";

export type FontSettings = BlooprintSettings & {
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

export type PaddingSettings = BlooprintSettings & rectDimensions;

export type MarginsSettings = BlooprintSettings & rectDimensions;

export type ImageSettings = BlooprintSettings & {
    url: string;
    alt: string;
}

export type ListSettings = BlooprintSettings & {
    items: string[];
    ordered: boolean;
}

export type TextSettings = BlooprintSettings & {
    text: string;
}

export type ContainerSettings = BlooprintSettings & {
    alignContent: string;
}

export const DefaultSettings: {
    Font: FontSettings,
    Padding: PaddingSettings,
    Margins: MarginsSettings,
    Image: ImageSettings,
    Text: TextSettings,
    List: ListSettings,
    Container: ContainerSettings
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
    }
}