import UiElement, { applyMixins } from "../../Base/UiElement";
import { FontSettings, ListSettings, PaddingSettings } from "./Mixins";

class List extends UiElement { constructor() { super(3, 'List'); }}
interface List extends ListSettings, FontSettings, PaddingSettings {}
applyMixins(List, [ ListSettings, FontSettings, PaddingSettings ]);

export default List;