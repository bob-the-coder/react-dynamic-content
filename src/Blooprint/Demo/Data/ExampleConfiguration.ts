import {
    ContainerSettings,
    FontSettings,
    ImageSettings,
    ListSettings,
    MarginsSettings,
    PaddingSettings,
    TextSettings,
    DefaultSettings
} from "./ExampleSettings";
import {Container, Text, Image, List, DefaultElements} from "./ExampleElements";

import BlooprintConfiguration from "../../Base/BlooprintConfiguration";
import SettingsEditors from "../ElementEditors/SettingsEditors";
import Views from "../ElementViewers/Views";


const config = new BlooprintConfiguration();
config.configureSettings<FontSettings>({
    type: 'Font',
    defaultValue: DefaultSettings.Font,
    editor: SettingsEditors.Font
});
config.configureSettings<ContainerSettings>({
    type: 'Container',
    defaultValue: DefaultSettings.Container,
    editor: SettingsEditors.Container
});
config.configureSettings<ImageSettings>({
    type: 'Image',
    defaultValue: DefaultSettings.Image,
    editor: SettingsEditors.Image
});
config.configureSettings<ListSettings>({
    type: 'List',
    defaultValue: DefaultSettings.List,
    editor: SettingsEditors.List
});
config.configureSettings<PaddingSettings>({
    type: 'Padding',
    defaultValue: DefaultSettings.Padding,
    editor: SettingsEditors.Padding
});
config.configureSettings<MarginsSettings>({
    type: 'Margins',
    defaultValue: DefaultSettings.Margins,
    editor: SettingsEditors.Margin
});
config.configureSettings<TextSettings>({
    type: 'Text',
    defaultValue: DefaultSettings.Text,
    editor: SettingsEditors.Text
});

config.configureElement<Container>({
    type: 'Container',
    view: Views.Container
});
config.configureElement<Image>({
    type: 'Image',
    view: Views.Image
});
config.configureElement<List>({
    type: 'List',
    view: Views.List
});
config.configureElement<Text>({
    type: 'Text',
    view: Views.Text
});

export default config;