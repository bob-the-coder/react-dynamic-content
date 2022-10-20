import BlooprintConfiguration from "./BlooprintConfiguration";

export type BlooprintElement = {
    id: string;
    parentId?: string;
    type?: string;
    isHighlighted: boolean;
    settings: {[key: string]: BlooprintSettings};
    hasChildren: boolean;
    children?: BlooprintElement[];
}

export type BlooprintSettingsPartial = {[key: string]: any}

export type BlooprintSettings = BlooprintSettingsPartial & {
    type?: string;
}

export type BlooprintMap = {[key: string]: BlooprintElement};
