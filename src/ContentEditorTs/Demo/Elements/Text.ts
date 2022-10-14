import UiElement, {applyMixins} from "../../Base/UiElement";
import {FontSettings, PaddingSettings, TextSettings} from "./Mixins";
import {UiElementType} from "./UiElementType";

class Text extends UiElement { constructor() { super(UiElementType.Text); }}
interface Text extends TextSettings, FontSettings, PaddingSettings {}
applyMixins(Text, [ TextSettings, FontSettings, PaddingSettings ]);

export default Text;