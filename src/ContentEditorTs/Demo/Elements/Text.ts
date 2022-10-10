import UiElement, { applyMixins } from "../../Base/UiElement";
import { FontSettings, PaddingSettings, TextSettings } from "./Mixins";

class Text extends UiElement { constructor() { super(1, 'Text'); }}
interface Text extends TextSettings, FontSettings, PaddingSettings {}
applyMixins(Text, [ TextSettings, FontSettings, PaddingSettings ]);

export default Text;