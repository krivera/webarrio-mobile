import React from 'react';
import { Svg } from 'expo';

export default class PollIcon extends React.PureComponent{
  render() {
    let { color, size } = this.props;
    size = size || 52;
    color = color || 'black';
    return(
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Svg.G scale={size / 52}>
          <Svg.Path fill={color} d="M12,37.3h7.2l1-5.9h-7L12,37.3z M14.4,32.8h4.2L18,35.9h-4.3L14.4,32.8z"/>
          <Svg.Polygon fill={color} points="21.1,25.6 19.6,26.5 19.5,27.3 15.4,27.3 16,24.5 19.4,24.5 21.5,23.2 21.5,23.1 15,23.1 13.8,28.7 
            20.6,28.7 	"/>
          <Svg.Polygon fill={color} points="21.9,23.5 18.3,25.6 17.3,24.7 16.4,25.2 18,27 22.7,24.2 	"/>
          <Svg.Path fill={color} d="M46.2,11.5l-1.8-2.1c-0.5-0.5-1.3-0.6-1.8-0.2l-1.5,1.3l3.4,4.1l1.5-1.3C46.6,12.9,46.6,12.1,46.2,11.5z"/>
          <Svg.Polygon fill={color} points="39.7,19.7 38.2,21 43.1,41.3 7.8,41.3 13,19.7 29,19.7 31.1,18 11.6,18 5.5,43 45.3,43 	"/>
          <Svg.Polygon fill={color} points="40.4,11.1 26.5,22.8 30,26.9 37.8,20.3 37.8,20.3 39.5,18.9 43.8,15.2 	"/>
          <Svg.Polygon fill={color} points="23.7,28.8 29.1,27.5 25.8,23.6 	"/>
        </Svg.G>
      </Svg>
    );
  }
}

