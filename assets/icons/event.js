import React from 'react';
import { Svg } from 'expo';

export default class EventIcon extends React.PureComponent{
  render() {
    let { color, size } = this.props;
    size = size || 51;
    color = color || 'black';
    return(
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Svg.G id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" scale={size / 51}>
          <Svg.G id="Artboard" fill={color}>
            <Svg.Path d="M41.3058299,23.1888128 L41.3058299,23.1888128 L41.3058299,16.7925419 L9.44990022,16.7925419 L9.44990022,23.1888128 L9.44990022,38.5436367 L9.44990022,42.3851729 L41.3058299,42.3851729 L41.3058299,38.5436367 L41.3058299,23.1888128 Z M31.5062291,9.11324315 L31.5062291,10.3924973 C31.5062291,11.1019362 32.0518558,11.6717515 32.7311792,11.6717515 C33.4032757,11.6717515 33.9561293,11.1019362 33.9561293,10.3924973 L33.9561293,9.11324315 L41.3058299,9.11324315 L41.3058299,14.2340335 L9.44990022,14.2340335 L9.44990022,9.11324315 L16.7996009,9.11324315 L16.7996009,10.3924973 C16.7996009,11.1019362 17.3488411,11.6717515 18.0281644,11.6717515 C18.7038744,11.6717515 19.2531145,11.1019362 19.2531145,10.3924973 L19.2531145,9.11324315 L31.5062291,9.11324315 Z M31.5062291,6.55850838 L31.5062291,5.27925419 C31.5062291,4.56981529 32.0518558,4 32.7311792,4 C33.4032757,4 33.9561293,4.56981529 33.9561293,5.27925419 L33.9561293,6.55850838 L41.3058299,6.55850838 C42.6572498,6.55850838 43.7557302,7.70191257 43.7557302,9.11324315 L43.7557302,42.3851729 C43.7557302,43.7965035 42.6572498,44.9399077 41.3058299,44.9399077 L9.44990022,44.9399077 C8.09486691,44.9399077 7,43.7965035 7,42.3851729 L7,9.11324315 C7,7.70191257 8.09486691,6.55850838 9.44990022,6.55850838 L16.7996009,6.55850838 L16.7996009,5.27925419 C16.7996009,4.56981529 17.3488411,4 18.0281644,4 C18.7038744,4 19.2531145,4.56981529 19.2531145,5.27925419 L19.2531145,6.55850838 L31.5062291,6.55850838 Z" id="Fill-604"></Svg.Path>
          </Svg.G>
        </Svg.G>
      </Svg>
    );
  }
}
