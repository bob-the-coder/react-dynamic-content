import FontSettingsEditor from "./FontSettingsEditor";
import ContainerSettingsEditor from "./ContainerSettingsEditor";
import ImageSettingsEditor from "./ImageSettingsEditor";
import ListSettingsEditor from "./ListSettingsEditor";
import PaddingSettingsEditor from "./PaddingSettingsEditor";
import TextSettingsEditor from "./TextSettingsEditor";
import MarginSettingsEditor from "./MarginsSettingsEditor";
import PositionSettingsEditor from "./PositionSettingsEditor";

export default {
    Container: ContainerSettingsEditor,
    Text: TextSettingsEditor,
    Font: FontSettingsEditor,
    Image: ImageSettingsEditor,
    Padding: PaddingSettingsEditor,
    List: ListSettingsEditor,
    Margin: MarginSettingsEditor,
    Position: PositionSettingsEditor
}