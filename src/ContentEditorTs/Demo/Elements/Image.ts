import UiElement, { applyMixins } from "../../Base/UiElement";
import { ImageSettings } from "./Mixins";

class Image extends UiElement { constructor() { super(2, 'Image'); }}
interface Image extends ImageSettings {}
applyMixins(Image, [ ImageSettings ]);

export default Image;