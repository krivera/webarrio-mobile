import React from 'react';
import { Svg } from 'expo';

export default class CommunityIcon extends React.PureComponent{
  render() {
    let { color, size } = this.props;
    size = size || 51;
    color = color || 'black';
    const st0 = { fill: "#FFFFFF", stroke: "#FFFFFF", strokeWidth: 1.2, strokeMiterlimit: 10 };
    const st1 = { fill: "#CD672B" };
    const st2 = { fill: "#FFFFFF" }
    return(
      <Svg id="Capa_1" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Svg.Rect x="115" y="-6.6" {...st0} width="32.2" height="31" scale={size / 51} />
          <Svg.G>
            <Svg.G>
              <Svg.G>
                <Svg.Path d="M26.6,6.9c1.5-1.7,3.7-2.7,5.9-2.7c4.5,0,8.2,3.9,8.2,8.6c0,4.7-3.6,8.5-8,8.6c-0.1,0.4-0.2,0.8-0.3,1.2c0,0,0.1,0,0.1,0
                  c5.1,0,9.3-4.4,9.3-9.8S37.7,3,32.6,3c-2.7,0-5.2,1.2-7,3.3"/>
                <Svg.Path d="M32.6,22.9l-0.5,0l0.1-0.4c0.1-0.4,0.2-0.8,0.3-1.1l0-0.2l0.2,0c4.3-0.1,7.7-3.8,7.7-8.3c0-4.6-3.5-8.3-7.9-8.3
                  c-2.1,0-4.2,1-5.7,2.6l-0.4-0.4c1.6-1.8,3.8-2.8,6.2-2.8c4.7,0,8.5,4,8.5,8.9c0,4.7-3.6,8.7-8.1,8.9c0,0.2-0.1,0.4-0.1,0.6
                  c4.9-0.1,8.8-4.3,8.8-9.5c0-5.2-4.1-9.5-9-9.5c-2.6,0-5,1.2-6.7,3.2l-0.4-0.4c1.8-2.2,4.4-3.4,7.2-3.4c5.3,0,9.6,4.5,9.6,10.1
                  S37.9,22.9,32.6,22.9z"/>
              </Svg.G>
              <Svg.G>
                <Svg.Path d="M30.4,26.7l7.8,0c5.5,1.6,9.5,5.5,10.5,10.2l0.1,0.5H38.4c0.3,0.4,0.5,0.8,0.7,1.2H50L50,38c-0.5-5.6-5.1-10.5-11.5-12.4
                  l-7.2,0C30.9,25.9,30.7,26.3,30.4,26.7z"/>
                <Svg.Path d="M50.3,38.9H38.9l-0.1-0.1c-0.2-0.4-0.5-0.8-0.7-1.1l-0.3-0.5h10.5l0-0.2c-0.9-4.6-4.8-8.4-10.2-10l-8.3,0l0.3-0.5
                  c0.3-0.4,0.5-0.7,0.7-1.1l0.1-0.1l7.5,0.1c6.6,1.9,11.2,6.9,11.8,12.6L50.3,38.9z M39.3,38.3h10.4l0-0.3
                  c-0.5-5.5-4.9-10.3-11.3-12.1l-7,0c-0.1,0.2-0.2,0.4-0.4,0.6l7.3,0c5.6,1.7,9.7,5.7,10.7,10.4l0.2,0.9H38.9
                  C39.1,37.9,39.2,38.1,39.3,38.3z"/>
              </Svg.G>
            </Svg.G>
            <Svg.G>
              <Svg.Path d="M20,8.2c5.2,0,9.4,4.4,9.4,9.9c0,1.3-0.3,2.6-0.7,3.9c-0.2,0.6-0.5,1.2-0.9,1.7c-0.2,0.3-0.4,0.5-0.5,0.8
                C25.5,26.7,22.8,28,20,28c-1.7,0-3.3-0.5-4.8-1.4c-0.4-0.2-0.7-0.5-1.1-0.8c-0.3-0.3-0.6-0.5-0.8-0.8c-0.4-0.4-0.8-0.9-1.2-1.5
                c-0.3-0.5-0.6-1.1-0.9-1.7c-0.5-1.2-0.7-2.5-0.7-3.9c0-2,0.6-3.9,1.6-5.5c0.1-0.2,0.3-0.4,0.5-0.7c1-1.3,2.3-2.3,3.7-2.9
                c0.6-0.3,1.2-0.4,1.8-0.6C18.8,8.3,19.4,8.2,20,8.2 M20,6.6c-0.7,0-1.5,0.1-2.2,0.2c-0.7,0.2-1.4,0.4-2.1,0.7
                c-1.7,0.7-3.2,1.9-4.3,3.4c-0.2,0.3-0.4,0.5-0.6,0.8C9.6,13.6,9,15.8,9,18.1c0,1.6,0.3,3.1,0.9,4.5c0.3,0.7,0.6,1.3,1,2
                c0.4,0.6,0.9,1.2,1.3,1.7c0.3,0.3,0.6,0.6,1,0.9c0.4,0.3,0.8,0.6,1.3,0.9c1.7,1.1,3.7,1.6,5.6,1.6c3.3,0,6.4-1.5,8.6-4.2
                c0.2-0.3,0.4-0.6,0.6-0.9c0.4-0.6,0.7-1.3,1-2c0.6-1.4,0.9-2.9,0.9-4.5C31.1,11.8,26.1,6.6,20,6.6L20,6.6z"/>
              <Svg.Path d="M14.5,32.5l11.4,0.1c2.4,0.7,4.6,1.8,6.4,3.3c0.4,0.3,0.8,0.7,1.3,1.1c0.4,0.4,0.7,0.7,1,1.1c0.3,0.4,0.7,0.9,1,1.3
                c0.2,0.3,0.4,0.7,0.6,1.1c0.2,0.3,0.3,0.7,0.5,1c0.5,1.2,0.8,2.3,0.9,3.5l0.1,0.7H2.5l0.1-0.7c0.5-5.7,5.1-10.6,11.7-12.5
                L14.5,32.5 M14.3,30.9l-0.1,0l-0.3,0l-0.1,0l-0.1,0C6.5,33,1.5,38.5,0.9,44.9l-0.1,0.7l-0.2,1.8h1.8h35.1h1.8l-0.2-1.8l-0.1-0.7
                c-0.1-1.3-0.5-2.7-1-4c-0.2-0.4-0.3-0.8-0.5-1.2c-0.2-0.4-0.4-0.8-0.7-1.2c-0.3-0.5-0.7-1-1.1-1.5c-0.3-0.4-0.7-0.8-1.1-1.2
                c-0.5-0.5-1-0.9-1.4-1.3c-2-1.6-4.3-2.8-7-3.6l-0.2-0.1l-0.2,0l-11.4-0.1L14.3,30.9L14.3,30.9z"/>
            </Svg.G>
          </Svg.G>
          <Svg.G>
            <Svg.G>
              <Svg.Path {...st1} d="M130.5-2c0.2,0.1,0.4,0.2,0.6,0.3c0.9-1.2,2.3-1.9,3.8-1.9c2.7,0,4.9,2.3,4.9,5.1c0,2.8-2.1,5.1-4.8,5.1
                c0,0.2-0.1,0.5-0.2,0.7c0,0,0.1,0,0.1,0c3.1,0,5.5-2.6,5.5-5.8s-2.5-5.8-5.5-5.8C133.2-4.4,131.5-3.5,130.5-2z"/>
              <Svg.Path {...st1} d="M133.7,9.7l4.6,0c3.3,1,5.7,3.3,6.2,6.1l0.1,0.3h-6.1c0.2,0.2,0.3,0.5,0.4,0.7h6.5l0-0.4
                c-0.3-3.4-3-6.2-6.9-7.4l-4.3,0C134,9.2,133.8,9.4,133.7,9.7z"/>
            </Svg.G>
            <Svg.Path {...st1} d="M135-4.4c-0.4,0-0.8,0-1.1,0.1c-0.4,0.1-0.7,0.2-1,0.3c-0.8,0.4-1.6,1-2.2,1.7c-0.1,0.1-0.2,0.3-0.3,0.4
              c-0.6,1-1,2.1-1,3.3c0,0.8,0.1,1.6,0.4,2.3c0.1,0.3,0.3,0.7,0.5,1c0.2,0.3,0.4,0.6,0.7,0.9c0.1,0.1,0.3,0.3,0.5,0.5
              c0.2,0.2,0.4,0.3,0.6,0.5c0.9,0.5,1.8,0.8,2.8,0.8c1.7,0,3.2-0.8,4.3-2.1c0.1-0.1,0.2-0.3,0.3-0.5c0.2-0.3,0.4-0.6,0.5-1
              c0.3-0.7,0.4-1.5,0.4-2.3C140.6-1.7,138.1-4.4,135-4.4z"/>
            <Svg.Path {...st1} d="M124.6,17.4h20.9l0-0.4c-0.1-0.7-0.2-1.4-0.5-2.1c-0.1-0.2-0.2-0.4-0.3-0.6c-0.1-0.2-0.2-0.4-0.4-0.6
              c-0.2-0.3-0.4-0.5-0.6-0.8c-0.2-0.2-0.4-0.4-0.6-0.7c-0.3-0.3-0.5-0.5-0.7-0.7c-1.1-0.9-2.4-1.5-3.8-1.9l-6.8,0l-0.2,0
              c-3.9,1.1-6.6,4-6.9,7.4L124.6,17.4z"/>
            <Svg.G>
              <Svg.G>
                <Svg.Path {...st1} d="M127.9,11.9c-1.2,0-2.3-0.3-3.4-1c-0.3-0.2-0.5-0.3-0.7-0.5c-0.2-0.2-0.4-0.4-0.6-0.5
                  c-0.3-0.3-0.6-0.6-0.8-1c-0.2-0.4-0.4-0.8-0.6-1.2c-0.3-0.8-0.5-1.7-0.5-2.7c0-1.4,0.4-2.7,1.1-3.8c0.1-0.1,0.2-0.3,0.3-0.5
                  c0.7-0.9,1.6-1.6,2.6-2c0.4-0.2,0.8-0.3,1.2-0.4c0.4-0.1,0.9-0.1,1.3-0.1c3.6,0,6.6,3.1,6.6,6.9c0,0.9-0.2,1.8-0.5,2.7
                  c-0.2,0.4-0.4,0.8-0.6,1.2c-0.1,0.2-0.2,0.4-0.4,0.5C131.7,11,129.9,11.9,127.9,11.9z"/>
                <Svg.Path {...st2} d="M127.9-0.8c3.1,0,5.6,2.6,5.6,5.9c0,0.8-0.1,1.6-0.4,2.3c-0.1,0.3-0.3,0.7-0.5,1c-0.1,0.2-0.2,0.3-0.3,0.5
                  c-1.1,1.4-2.6,2.1-4.3,2.1c-1,0-2-0.3-2.8-0.8c-0.2-0.1-0.4-0.3-0.6-0.5c-0.2-0.2-0.4-0.3-0.5-0.5c-0.3-0.3-0.5-0.6-0.7-0.9
                  c-0.2-0.3-0.4-0.7-0.5-1c-0.3-0.7-0.4-1.5-0.4-2.3c0-1.2,0.3-2.3,1-3.3c0.1-0.1,0.2-0.2,0.3-0.4c0.6-0.8,1.3-1.4,2.2-1.7
                  c0.3-0.1,0.7-0.3,1-0.3C127.1-0.8,127.5-0.8,127.9-0.8 M127.9-2.8c-0.5,0-1,0.1-1.5,0.2c-0.5,0.1-1,0.3-1.4,0.5
                  c-1.1,0.5-2.2,1.3-3,2.3c-0.2,0.2-0.3,0.4-0.4,0.5c-0.8,1.3-1.3,2.8-1.3,4.4c0,1.1,0.2,2.1,0.6,3c0.2,0.5,0.4,0.9,0.7,1.3
                  c0.3,0.4,0.6,0.8,0.9,1.2c0.2,0.2,0.4,0.4,0.7,0.6c0.3,0.2,0.6,0.4,0.9,0.6c1.2,0.7,2.5,1.1,3.9,1.1c2.3,0,4.4-1.1,5.9-2.9
                  c0.2-0.2,0.3-0.4,0.4-0.6c0.3-0.4,0.5-0.9,0.7-1.3c0.4-1,0.6-2,0.6-3C135.5,0.7,132.1-2.8,127.9-2.8L127.9-2.8z"/>
              </Svg.G>
              <Svg.G>
                <Svg.Path {...st1} d="M116.4,21.9l0.1-1.5c0.4-3.8,3.4-7.1,7.7-8.3l0.1,0l0.3,0l7,0l0.1,0c1.6,0.5,3,1.2,4.1,2.1
                  c0.3,0.2,0.5,0.5,0.8,0.8c0.3,0.3,0.5,0.5,0.7,0.7c0.2,0.3,0.4,0.6,0.6,0.9c0.1,0.2,0.3,0.5,0.4,0.7c0.1,0.2,0.2,0.5,0.3,0.7
                  c0.3,0.8,0.5,1.6,0.6,2.4l0.1,1.5H116.4z"/>
                <Svg.Path {...st2} d="M124.6,13.1l6.8,0c1.4,0.4,2.7,1.1,3.8,1.9c0.2,0.2,0.5,0.4,0.7,0.7c0.2,0.2,0.4,0.4,0.6,0.7
                  c0.2,0.2,0.4,0.5,0.6,0.8c0.1,0.2,0.3,0.4,0.4,0.6c0.1,0.2,0.2,0.4,0.3,0.6c0.3,0.7,0.5,1.4,0.5,2.1l0,0.4h-20.9l0-0.4
                  c0.3-3.4,3-6.3,6.9-7.4L124.6,13.1 M124.4,11.1l-0.2,0l-0.2,0l-0.1,0l-0.1,0c-4.7,1.3-8,4.9-8.4,9.2l0,0.4l-0.2,2.2h2.2h20.9h2.2
                  l-0.2-2.2l0-0.4c-0.1-0.9-0.3-1.8-0.7-2.7c-0.1-0.3-0.2-0.5-0.4-0.8c-0.1-0.3-0.3-0.5-0.5-0.8c-0.2-0.4-0.5-0.7-0.7-1
                  c-0.2-0.3-0.5-0.5-0.7-0.8c-0.3-0.3-0.6-0.6-0.9-0.8c-1.3-1-2.8-1.8-4.5-2.3l-0.3-0.1l-0.3,0l-6.8,0L124.4,11.1L124.4,11.1z"/>
              </Svg.G>
            </Svg.G>
          </Svg.G>
        </Svg>
    )
  }
}
