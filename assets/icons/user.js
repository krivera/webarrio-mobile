import React from 'react';
import { Svg } from 'expo';

export default class CarIcon extends React.PureComponent{
  render() {
    let { color, size } = this.props;
    const height = size || 76;
    const width = size * (37 / 38);
    color = color || 'black';
    return(
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Svg.G id="Page-1" fill="none" fillRule="evenodd" scale={size / 76}>
          <Svg.G id="user" x={-3} y={-3} stroke={color} fill="none">
            <Svg.G x={5} y={5}>
              <Svg.Path fill="none" stroke={color} d="M53.0133333,19.8 C53.0133333,30.3155556 44.9155556,38.84 34.9244444,38.84 C24.9422222,38.84 16.8444444,30.3155556 16.8444444,19.8 C16.8444444,9.28444444 24.9422222,0.76 34.9244444,0.76 C44.9155556,0.76 53.0133333,9.28444444 53.0133333,19.8 L53.0133333,19.8 Z" id="Stroke-415" strokeWidth={5}></Svg.Path>
              <Svg.Path fill="none" stroke={color} d="M46.5475556,47.2577778 L23.4453333,47.2133333 C10.6364444,50.8577778 1.232,60.4133333 0.174222222,71.8711111 L69.6764444,71.8711111 C68.6275556,60.4577778 59.2853333,50.9288889 46.5475556,47.2577778 L46.5475556,47.2577778 Z" id="Stroke-417" strokeWidth={5}></Svg.Path>
            </Svg.G>
          </Svg.G>
        </Svg.G>
      </Svg>
    );
  }
}
