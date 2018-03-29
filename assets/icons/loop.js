import React from 'react';
import { Svg } from 'expo';

export default class LoopIcon extends React.PureComponent{
  render() {
    let { color, size } = this.props;
    size = size || 51;
    color = color || 'black';
    return(
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Svg.G id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" scale={size / 51}>
          <Svg.G id="Artboard">
            <Svg.G>
              <Svg.Path fill={color} class="st0" d="M36.4,8.7C20.4-2.9-2.5,12,3.3,31.5c2.6,8.6,10.5,14.7,19.5,15.1c9.8,0.4,17.9-6,21.1-15
                c0.8-2.3-2.8-3.3-3.6-1c-5.7,16.2-29.7,16.2-33.6-1.3C3,13.1,21.7,2.7,34.5,11.9C36.4,13.3,38.3,10.1,36.4,8.7L36.4,8.7z"/>
            </Svg.G>
          </Svg.G>
          <Svg.Path class="st1" stroke={color} stroke-width={2} stroke-miterlimit={10} fill={color} d="M48.8,34.9c0-0.2,0-0.4-0.1-0.5l-5.8-7.7c-0.2-0.3-0.7-0.4-1-0.1l-7.8,5.7c-0.3,0.2-0.4,0.6-0.1,0.9
            c0.2,0.3,0.7,0.4,1,0.1l7.3-5.3l5.4,7.2c0.2,0.3,0.7,0.4,1,0.1C48.7,35.2,48.8,35.1,48.8,34.9z"/>
        </Svg.G>
      </Svg>);
  }
}
