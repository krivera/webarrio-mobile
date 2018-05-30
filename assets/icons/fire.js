import React from 'react';
import { Svg } from 'expo';

export default class FireIcon extends React.PureComponent{
  render() {
    let { color, size } = this.props;
    size = size || 51;
    color = color || 'black';
    return(
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Svg.G id="Page-1" stroke="none" stroke-width="1" fill="none" fillRule="evenodd" scale={size/51}>
          <Svg.G id="Artboard" stroke={color} strokeWidth="1.5" fill="none">
            <Svg.Path d="M20.7250408,22.3849452 C19.9114102,23.4302626 18.8180407,25.2425879 18.0078215,26.829615 C17.2641256,25.5275239 17.2726542,24.2353724 17.6427964,22.7162661 C18.4888359,19.257276 16.6415361,17.1782374 16.6415361,17.1782374 C16.6415361,17.1782374 11.7938668,29.8777672 12.8650618,35.0231806 C13.8270905,39.6467637 17.422758,41.5071305 20.2662009,43.3293954 C20.7233351,43.7170409 21.2111723,44.0549882 21.7194783,44.3349543 C22.2277842,44.7275696 22.6780955,45.1400641 23.0397091,45.5956303 C23.1744614,45.7679172 23.1267011,45.4283133 22.9765973,44.8319357 C23.114761,44.4674827 21.2759899,40.5032282 22.6815069,36.575419 C24.0239122,32.8265231 26.2294141,31.0622394 26.5313274,26.3491997 C27.0737478,27.734121 28.2455806,31.4300056 27.4234214,34.6686673 C26.0179043,40.2100092 27.9436674,44.2885694 27.9436674,44.2885694 C27.9436674,44.2885694 28.4775592,44.369743 30.2770986,42.7628367 C33.545267,40.4170848 36.7997896,37.6091402 37.7055293,33.7376556 C39.6176466,25.5821918 34.4782984,16.8618259 34.4782984,16.8618259 C34.4782984,16.8618259 35.4010954,21.0132767 33.9751096,24.5981688 C33.8540032,24.1558554 33.7209566,23.7433609 33.57597,23.3772513 C31.1828384,17.322362 24.8648345,7.14418414 23.2273388,4.93261719 C24.1313729,9.33587185 27.2937863,13.9511719 20.7250408,22.3849452" id="Stroke-394"></Svg.Path>
          </Svg.G>
        </Svg.G>
      </Svg>
    );
  }
}