import React from 'react';
import { Svg } from 'expo';

export default class CarIcon extends React.PureComponent{
  render() {
    let { color, size } = this.props;
    size = size || 51;
    color = color || 'black';
    return(
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Svg.G id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" scale={size / 51}>
          <Svg.G id="Artboard" fill={color}>
            <Svg.Path d="M2.41737942,22.1548086 L8.90347219,11.4453 L30.6056857,11.4453 L36.6581678,20.7510252 L43.9392134,21.8944294 C46.3385257,21.8944294 48.2897737,23.9321794 48.2897737,26.4378573 L48.2897737,31.8152532 L47.6574248,31.8152532 C47.0901175,28.6001365 44.398118,26.2152142 41.2580542,26.2152142 C38.038495,26.2152142 35.3428821,28.6001365 34.8514567,31.8152532 L16.8782949,31.8152532 C16.3109876,28.6001365 13.6189881,26.2152142 10.4789243,26.2152142 C7.25936511,26.2152142 4.56375218,28.6001365 4.06871335,31.8152532 L2.42099284,31.8152532 L2.42099284,22.1661294 L2.41737942,22.1548086 Z M10.399429,28.7397601 C12.7120191,28.7397601 14.5909987,30.7058115 14.5909987,33.1322435 C14.6271329,34.2492324 14.2224296,35.320938 13.4563841,36.1473588 C12.6578178,37.0077422 11.5448838,37.4983116 10.399429,37.4983116 C8.08683878,37.4983116 6.20785926,35.5322602 6.20785926,33.1209226 C6.20785926,30.7058115 8.08683878,28.7397601 10.399429,28.7397601 L10.399429,28.7397601 Z M41.2580542,28.7397601 C43.5670309,28.7397601 45.4496239,30.7058115 45.4496239,33.1209226 C45.4496239,35.5322602 43.5670309,37.4983116 41.2580542,37.4983116 C38.945464,37.4983116 37.0628711,35.5322602 37.0628711,33.1209226 C37.0628711,30.7058115 38.945464,28.7397601 41.2580542,28.7397601 L41.2580542,28.7397601 Z M43.9356,19.4566766 L43.9247597,19.4566766 L37.8144629,18.3698766 L31.7186197,9 L7.7796979,9 L0,21.3887655 L0,34.2605532 L4.00005833,34.2605532 C4.56375218,37.4794436 7.25936511,39.8605922 10.399429,39.8605922 C13.6189881,39.8605922 16.314601,37.4794436 16.8060264,34.2605532 L34.7791882,34.2605532 C35.3428821,37.4794436 38.038495,39.8605922 41.1785589,39.8605922 C44.398118,39.8605922 47.093731,37.4794436 47.5851564,34.2605532 L50.551776,34.2605532 L50.551776,26.4378573 C50.551776,22.5887739 47.556249,19.4566766 43.9356,19.4566766 L43.9356,19.4566766 Z" id="Fill-621"></Svg.Path>
          </Svg.G>
        </Svg.G>
      </Svg>);
  }
}