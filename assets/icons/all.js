import React from 'react';
import { Svg } from 'expo';

export default class AllIcon extends React.PureComponent{
  render() {
    let { color, size } = this.props;
    size = size || 52;
    color = color || 'black';
    return(
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Svg.G scale={size / 52}>
          <Svg.G>
            <Svg.Path fill={color} d="M16.5,37.8c-3.5-2.8-5.7-7-5.7-11.8c0-7.1,4.8-13,11.4-14.7V7.4C13.6,9.2,7,16.8,7,26
              c0,5.7,2.5,10.7,6.4,14.2C16.5,43.1,18.4,39.3,16.5,37.8z M38.4,11.6c-1.9-1.8-4.8,1.1-2.9,2.5c3.5,2.8,5.7,7.1,5.7,11.9
              c0,7.1-4.8,13-11.4,14.7v3.9C38.4,42.8,45,35.2,45,26C45,20.3,42.4,15.1,38.4,11.6z M23.9,14.6l6.2-3.7c0.9-0.5,0.9-1.4,0-2
              l-6.2-3.8c-0.9-0.5-1.6-0.1-1.6,0.9l0,7.6C22.3,14.7,23,15.1,23.9,14.6z M28.2,37.4l-6.2,3.8c-0.9,0.5-0.9,1.4,0,2l6.2,3.7
              c0.9,0.5,1.6,0.1,1.6-0.9l0-7.6C29.8,37.3,29.1,36.9,28.2,37.4z"/>
          </Svg.G>
        </Svg.G>
      </Svg>
    );
  }
}
