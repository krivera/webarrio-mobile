import React from 'react';
import { Svg } from 'expo';

export default class CarIcon extends React.PureComponent{
  render() {
    let { color, size } = this.props;
    size = size || 86;
    color = color || 'black';
    return(
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Svg.G
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          strokeLinejoin="round"
          scale={size / 86}
        >
          <Svg.Polygon id="Stroke-423" stroke={color} strokeWidth="5" points="83 42.1466667 43 3 3 42.1466667 12.4666667 42.1466667 12.4666667 83 73.5244444 83 73.5244444 42.1466667"></Svg.Polygon>
        </Svg.G>
      </Svg>
    );
  }
}