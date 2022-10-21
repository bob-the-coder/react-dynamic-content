export type BlooprintSettingsPartial = {[key: string]: any}

export type BlooprintSettings = BlooprintSettingsPartial & {
    type?: string;
}

export type BlooprintSettingsMap = {
    [key: string]: BlooprintSettings;
}

export type BlooprintElement = {
    id: string;
    parentId?: string;
    type?: string;
    settings: BlooprintSettingsMap;
    children?: BlooprintElement[];
}

export type MappedBlooprintElement = {
    id: string;
    parentId?: string;
    type: string;
    settings: string[];
    children: string[];
}

export type BlooprintElementMap = {
    [key: string]: MappedBlooprintElement;
}
