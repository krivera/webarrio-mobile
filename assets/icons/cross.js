import React from 'react';
import { Svg } from 'expo';

export default class CrossIcon extends React.PureComponent{
  render() {
    let { color, size } = this.props;
    size = size || 51;
    color = color || 'black';
    return(
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Svg.G id="Page-1" stroke="none" stroke-width="1" fill="none" fillRule="evenodd">
          <Svg.G id="Artboard" fill={color}>
            <Svg.Path d="M14.0682557,29.1422348 L14.0682557,21.6692921 L22.4433636,21.6692921 C22.8169173,21.6692921 23.122242,21.3727599 23.122242,21.0099635 L23.122242,12.8760356 L30.8167657,12.8760356 L30.8167657,21.0099635 C30.8167657,21.3727599 31.1203847,21.6692921 31.4956441,21.6692921 L39.8690462,21.6692921 L39.8690462,29.1422348 L31.4956441,29.1422348 C31.1203847,29.1422348 30.8167657,29.438767 30.8167657,29.8015634 L30.8167657,37.9354913 L23.122242,37.9354913 L23.122242,29.8015634 C23.122242,29.438767 22.8169173,29.1422348 22.4433636,29.1422348 L14.0682557,29.1422348 Z M22.4433636,39.2524918 L31.4956441,39.2524918 C31.8691978,39.2524918 32.1728168,38.9576162 32.1728168,38.5948199 L32.1728168,30.4608919 L40.5479246,30.4608919 C40.9214783,30.4608919 41.226803,30.1643598 41.226803,29.8015634 L41.226803,21.0099635 C41.226803,20.6471671 40.9214783,20.3506349 40.5479246,20.3506349 L32.1728168,20.3506349 L32.1728168,12.216707 C32.1728168,11.8539106 31.8691978,11.559035 31.4956441,11.559035 L22.4433636,11.559035 C22.0698099,11.559035 21.7644852,11.8539106 21.7644852,12.216707 L21.7644852,20.3506349 L13.3893773,20.3506349 C13.0158237,20.3506349 12.710499,20.6471671 12.710499,21.0099635 L12.710499,29.8015634 C12.710499,30.1643598 13.0158237,30.4608919 13.3893773,30.4608919 L21.7644852,30.4608919 L21.7644852,38.5948199 C21.7644852,38.9576162 22.0698099,39.2524918 22.4433636,39.2524918 L22.4433636,39.2524918 Z" id="Fill-390"></Svg.Path>
          </Svg.G>
        </Svg.G>
      </Svg>
    );
  }
}