import { useState, useEffect } from 'react';
import { loadModules } from 'esri-loader';
import {defaultOptions} from "../../../../globalSetups/availableArrays"

const BermudaTriangle = (props) => {

    
    const [graphic, setGraphic] = useState(null);
    useEffect(() => {

        loadModules(['esri/Graphic','esri/layers/GraphicsLayer',"esri/widgets/Search"]).then(([Graphic,Search]) => {

             const simpleMarkerSymbol = {
                type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
                url: "https://static.arcgis.com/images/Symbols/Shapes/BlackStarLargeB.png",
                width: "30px",
                height: "30px"        
            };
            const popupTemplate = {
                title: "{Name}",
                content: "{Description}",
             }
             const search = new Search({  //Add Search widget
                view: props.view
              });
            props.list.forEach((item,index)=>{
                props.view.graphics.add(new Graphic({
                    geometry: {type:"point",latitude:item.latitude,longitude:parseInt(item.longitude)},
                    symbol: simpleMarkerSymbol,
                    attributes: {Name:`<b>${item.heading}</b>`,Description:`Location: ${item.location}<br/>Longitude: ${item.longitude}<br/>Latitude: ${item.latitude}<br/><a class="inline-block mx-0 mt-4 basicDarkButton" href="${defaultOptions.baseUrl}tourism/${item._id}">Find More</a>`},
                    popupTemplate: popupTemplate
                }))
            })
            setGraphic(props.list)
            props.view.ui.add(search, {position:"top-right"})

        }).catch((err) => console.error(err));

        return function cleanup() {
            props.view.graphics.remove(graphic);
        };
    }, []);

    return null;

}

export default BermudaTriangle;