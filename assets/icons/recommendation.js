import React from 'react';
import { Svg } from 'expo';

export default class RecommendationIcon extends React.PureComponent{
  render() {
    let { color, size } = this.props;
    size = size || 51;
    color = color || 'black';
    return(
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Svg.G id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" scale={size / 51}>
          <Svg.G id="Artboard" fill={color}>
            <Svg.Path d="M35.772821,7.81888755 C31.1512541,7.81888755 27.3680011,11.5547626 27.0211126,16.2944183 L26.9885918,16.2944183 C26.9885918,17.0717822 26.3779234,17.7057488 25.6335584,17.7057488 C24.8855801,17.7057488 24.2821386,17.0717822 24.2821386,16.2944183 L24.2496178,16.2944183 C23.8991158,11.5547626 20.1194762,7.81888755 15.4942959,7.81888755 C10.8691155,7.81888755 7.08586252,11.5547626 6.73897399,16.2944183 L6.70645319,16.2944183 C6.70645319,18.21896 7.32434838,19.9963308 8.35778712,21.4189822 C9.8392902,23.449185 14.2585055,27.5661948 13.9838854,27.5435532 L25.6335584,39.7096756 L37.2868449,27.5435532 C37.0086114,27.5661948 40.7774107,23.7888101 42.2516869,22.2152142 C43.6789887,20.6869017 44.5606637,18.6000947 44.5606637,16.2944183 L44.5245295,16.2944183 C44.1812544,11.5547626 40.4016148,7.81888755 35.772821,7.81888755 L35.772821,7.81888755 Z M47.2635035,16.2944183 L47.2635035,16.2944183 C47.2635035,19.4114211 46.0566205,22.2340822 44.0945322,24.2793795 L44.1631873,24.3510781 L26.5911153,42.7059229 C26.3454026,42.9587548 26.0057409,43.1172465 25.6335584,43.1172465 C25.2649894,43.1172465 24.9253277,42.9587548 24.679615,42.7059229 L7.10031621,24.3510781 L7.16897123,24.2793795 C5.21049642,22.2340822 4,19.4114211 4,16.2944183 L4.03974764,16.2944183 C4.38663617,9.99248759 9.37677217,5 15.4942959,5 C19.8882172,5 23.6967642,7.56982921 25.6335584,11.3547612 C27.5667393,7.56982921 31.3825131,5 35.772821,5 C41.8939581,5 46.8768673,9.99248759 47.2309827,16.2944183 L47.2635035,16.2944183 Z" id="Fill-607"></Svg.Path>
          </Svg.G>
        </Svg.G>
      </Svg>
    );
  }
}