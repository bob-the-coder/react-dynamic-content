import React from 'react';
import {Image} from "../Data/ExampleElements";
import {DefaultSettings} from "../Data/ExampleSettings";
import {ElementViewProps} from "../../Base/BlueprintView";

export default function ImageView(props: ElementViewProps<Image>) {
    const {element} = props;
    const image = element.settings.Image;

    const margins = {...DefaultSettings.Margins, ...element.settings.Margins};

    const position = element.settings.Position;

    const style: { [key: string]: any } = {
        marginTop: margins.top,
        marginBottom: margins.bottom,
        marginLeft: margins.left,
        marginRight: margins.right,
    }

    if (position.isAbsolute) {
        style.position = 'absolute';
        
        if (position.fromLeft) style.left = position.offsetHorizontal; 
        else style.right = position.offsetHorizontal;
        
        if (position.fromTop) style.top = position.offsetVertical;
        else style.bottom = position.offsetVertical;
    }

    return (
        <img style={style} alt={image.alt} src={image.url}/>
    )
}
