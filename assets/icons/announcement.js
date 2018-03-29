import React from 'react';
import { Svg } from 'expo';

export default class Announcement extends React.PureComponent{
  render() {
    let { color, size } = this.props;
    size = size || 51;
    color = color || 'black';
    return(
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Svg.G id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" scale={size / 51}>
          <Svg.G id="Artboard" fill={color}>
            <Svg.Path d="M33.118675,27.1435643 L17.703816,27.1435643 C16.9991987,27.1435643 16.4210512,26.5435601 16.4210512,25.8001587 C16.4210512,25.0643046 16.9991987,24.4605268 17.703816,24.4605268 L33.118675,24.4605268 C33.8305191,24.4605268 34.4014398,25.0643046 34.4014398,25.8001587 C34.4014398,26.5435601 33.8305191,27.1435643 33.118675,27.1435643 L33.118675,27.1435643 Z M30.5495318,32.5096394 L20.2729592,32.5096394 C19.561115,32.5096394 18.9901943,31.9134088 18.9901943,31.1700074 C18.9901943,30.426606 19.561115,29.8266019 20.2729592,29.8266019 L30.5495318,29.8266019 C31.261376,29.8266019 31.8322967,30.426606 31.8322967,31.1700074 C31.8322967,31.9134088 31.261376,32.5096394 30.5495318,32.5096394 L30.5495318,32.5096394 Z M33.118675,37.8719409 L17.703816,37.8719409 C16.9991987,37.8719409 16.4210512,37.2757103 16.4210512,36.5360825 C16.4210512,35.7926811 16.9991987,35.192677 17.703816,35.192677 L33.118675,35.192677 C33.8305191,35.192677 34.4014398,35.7926811 34.4014398,36.5360825 C34.4014398,37.2757103 33.8305191,37.8719409 33.118675,37.8719409 L33.118675,37.8719409 Z M38.2569613,16.4114141 L30.5495318,16.4114141 C29.1294569,16.4114141 27.9803886,15.2114058 27.9803886,13.7283766 L27.9803886,5.68303755 L12.5691432,5.68303755 L12.5691432,43.2417896 L38.2569613,43.2417896 L38.2569613,16.4114141 Z M30.5495318,5.68303755 L30.5495318,13.7283766 L38.2569613,13.7283766 L30.5495318,5.68303755 Z M38.2569613,45.9248271 L12.5691432,45.9248271 C11.1454548,45.9248271 10,44.7210452 10,43.2417896 L10,5.68303755 C10,4.20378197 11.1454548,3 12.5691432,3 L27.9803886,3 L30.5495318,3 L40.822491,13.7283766 L40.822491,16.4114141 L40.822491,20.4378573 L40.822491,43.2417896 C40.822491,44.7210452 39.6770362,45.9248271 38.2569613,45.9248271 L38.2569613,45.9248271 Z" id="Fill-610"></Svg.Path>
          </Svg.G>
        </Svg.G>
    </Svg>);
  }
}