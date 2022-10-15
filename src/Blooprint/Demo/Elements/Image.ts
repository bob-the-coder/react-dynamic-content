import UiElement, { applyMixins } from "../../Base/UiElement";
import { ImageSettings } from "./Mixins";
import {UiElementType} from "./UiElementType";

class Image extends UiElement { constructor() { super(UiElementType.Image); }}
interface Image extends ImageSettings {}
applyMixins(Image, [ ImageSettings ]);

export default Image;