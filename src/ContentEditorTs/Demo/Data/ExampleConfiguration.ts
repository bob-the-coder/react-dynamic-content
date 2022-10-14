import BlueprintConfiguration from "../../BlueprintConfiguration";
import {UiElementType, UiSettingsType} from "../Elements/UiElementType";
import {
    ContainerSettings,
    FontSettings,
    ImageSettings,
    ListSettings,
    PaddingSettings,
    TextSettings
} from "../Elements/Mixins";
import Container from '../Elements/Container';
import Text from '../Elements/Text';
import Image from '../Elements/Image';
import List from '../Elements/List';
import SettingsEditors from '../../ElementEditors/SettingsEditors';
import Views from '../../ElementViewers/Views';

const config = new BlueprintConfiguration();
config.configureSettings<FontSettings>({
    type: UiSettingsType.Font,
    editor: SettingsEditors.Font
});
config.configureSettings<ContainerSettings>({
    type: UiSettingsType.Container,
    editor: SettingsEditors.Container
});
config.configureSettings<ImageSettings>({
    type: UiSettingsType.Image,
    editor: SettingsEditors.Image
});
config.configureSettings<ListSettings>({
    type: UiSettingsType.List,
    editor: SettingsEditors.List
});
config.configureSettings<PaddingSettings>({
    type: UiSettingsType.Padding,
    editor: SettingsEditors.Padding
});
config.configureSettings<TextSettings>({
    type: UiSettingsType.Text,
    editor: SettingsEditors.Text
});

config.configureElement<Container>({
    type: UiElementType.Container,
    defaultValue: new Container(),
    settings: [ UiSettingsType.Container ],
    view: Views.Container
});
config.configureElement<Image>({
    type: UiElementType.Image,
    defaultValue: new Image(),
    settings: [ UiSettingsType.Image ],
    view: Views.Image
});
config.configureElement<List>({
    type: UiElementType.List,
    defaultValue: new List(),
    settings: [ UiSettingsType.List, UiSettingsType.Font, UiSettingsType.Padding ],
    view: Views.List
});
config.configureElement<Text>({
    type: UiElementType.Text,
    defaultValue: new Text(),
    settings: [ UiSettingsType.Text, UiSettingsType.Font, UiSettingsType.Padding ],
    view: Views.Text
});

export default config;