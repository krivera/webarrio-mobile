import React from 'react';
import { Svg } from 'expo';

export default class MessageIcon extends React.Component{
  render() {
    return(
      <Svg width="80" height="80" viewBox="0 0 80 80">
        <Svg.G stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <Svg.Path d="M0,9.54731033 L0,78.0654134 C0,78.8550406 0.470187088,79.5549374 1.18802997,79.849253 C1.42132891,79.949751 1.67257392,80 1.93458657,80 C2.4406658,80 2.9395666,79.7954148 3.30207726,79.4329041 L17.9640181,64.7745525 L70.4526897,64.7745525 C76.6081924,64.7745525 80,61.3827449 80,55.2236529 L80,9.54731033 C80,3.39180762 76.6081924,0 70.4526897,0 L9.54731033,0 C3.39180762,0 0,3.39180762 0,9.54731033" id="Fill-451" fill="#F86913"></Svg.Path>
        </Svg.G>
      </Svg>);
  }
}
