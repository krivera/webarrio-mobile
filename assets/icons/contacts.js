import React from 'react';
import { Svg } from 'expo';

export default class ContactsIcon extends React.Component{
  render() {
    const width = this.props.size * 17 / 20;
    const height = this.props.size;
    return(
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Svg.G id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <Svg.G id="agenda">
          <Svg.Path d="M0,6.6368 C0,7.3696 0.72,7.9648 1.6064,7.9648 L3.2128,7.9648 L3.2128,13.2736 L1.6064,13.2736 C0.72,13.2736 0,13.8688 0,14.6016 C0,15.3344 0.72,15.9264 1.6064,15.9264 L3.2128,15.9264 L3.2128,21.2352 L1.6064,21.2352 C0.72,21.2352 0,21.8304 0,22.5632 C0,23.296 0.72,23.8912 1.6064,23.8912 L3.2128,23.8912 L3.2128,29.2 L1.6064,29.2 C0.72,29.2 0,29.7952 0,30.528 C0,31.2608 0.72,31.856 1.6064,31.856 L3.2128,31.856 L3.2128,37.1648 L1.6064,37.1648 C0.72,37.1648 0,37.7568 0,38.4928 C0,39.2224 0.72,39.8176 1.6064,39.8176 L3.2128,39.8176 L3.2128,45.1264 L1.6064,45.1264 C0.72,45.1264 0,45.7216 0,46.4544 C0,47.1872 0.72,47.7824 1.6064,47.7824 L3.2128,47.7824 L3.2128,53.0912 L1.6064,53.0912 C0.72,53.0912 0,53.6832 0,54.4192 C0,55.1488 0.72,55.744 1.6064,55.744 L3.2128,55.744 L3.2128,61.0528 L1.6064,61.0528 C0.72,61.0528 0,61.648 0,62.3808 C0,63.1136 0.72,63.7088 1.6064,63.7088 L3.2128,63.7088 L3.2128,69.0176 L1.6064,69.0176 C0.72,69.0176 0,69.6096 0,70.3424 C0,71.0752 0.72,71.6704 1.6064,71.6704 L3.2128,71.6704 L3.2128,76.9792 C3.2128,78.4448 4.6496,79.6352 6.4256,79.6352 L64.2496,79.6352 C66.0224,79.6352 67.4624,78.4448 67.4624,76.9792 L67.4624,2.656 C67.4624,1.1904 66.0224,0 64.2496,0 L6.4256,0 C4.6496,0 3.2128,1.1904 3.2128,2.656 L3.2128,5.3088 L1.6064,5.3088 C0.72,5.3088 0,5.904 0,6.6368" id="Fill-452" fill="#F86913"></Svg.Path>
          <Svg.Path d="M64.25024,2.6528 L6.42624,2.6528 L6.42624,5.3088 L11.24224,5.3088 C12.13184,5.3088 12.84864,5.9008 12.84864,6.6368 C12.84864,7.3664 12.13184,7.9648 11.24224,7.9648 L6.42624,7.9648 L6.42624,13.2736 L11.24224,13.2736 C12.13184,13.2736 12.84864,13.8656 12.84864,14.6016 C12.84864,15.3312 12.13184,15.9232 11.24224,15.9232 L6.42624,15.9232 L6.42624,21.2352 L11.24224,21.2352 C12.13184,21.2352 12.84864,21.8304 12.84864,22.56 C12.84864,23.2928 12.13184,23.888 11.24224,23.888 L6.42624,23.888 L6.42624,29.2 L11.24224,29.2 C12.13184,29.2 12.84864,29.7952 12.84864,30.528 C12.84864,31.2576 12.13184,31.8528 11.24224,31.8528 L6.42624,31.8528 L6.42624,37.1648 L11.24224,37.1648 C12.13184,37.1648 12.84864,37.7568 12.84864,38.4928 C12.84864,39.2224 12.13184,39.8144 11.24224,39.8144 L6.42624,39.8144 L6.42624,45.1232 L11.24224,45.1232 C12.13184,45.1232 12.84864,45.7216 12.84864,46.4512 C12.84864,47.1872 12.13184,47.7792 11.24224,47.7792 L6.42624,47.7792 L6.42624,53.088 L11.24224,53.088 C12.13184,53.088 12.84864,53.6864 12.84864,54.416 C12.84864,55.152 12.13184,55.744 11.24224,55.744 L6.42624,55.744 L6.42624,61.0496 L11.24224,61.0496 C12.13184,61.0496 12.84864,61.6448 12.84864,62.3808 C12.84864,63.1136 12.13184,63.7088 11.24224,63.7088 L6.42624,63.7088 L6.42624,69.0144 L11.24224,69.0144 C12.13184,69.0144 12.84864,69.6096 12.84864,70.3424 C12.84864,71.0784 12.13184,71.6672 11.24224,71.6672 L6.42624,71.6672 L6.42624,76.9792 L64.25024,76.9792 L64.25024,2.6528 Z M62.65024,4.2528 L62.65024,75.3792 L8.02624,75.3792 L8.02624,73.2672 L11.24224,73.2672 C13.01184,73.2672 14.44864,71.9584 14.44864,70.3424 C14.44864,68.7296 13.01184,67.4144 11.24224,67.4144 L8.02624,67.4144 L8.02624,65.3088 L11.24224,65.3088 C13.01184,65.3088 14.44864,63.9936 14.44864,62.3808 C14.44864,60.7648 13.01184,59.4496 11.24224,59.4496 L8.02624,59.4496 L8.02624,57.344 L11.24224,57.344 C13.01184,57.344 14.44864,56.0288 14.44864,54.416 C14.44864,52.8 13.01184,51.488 11.24224,51.488 L8.02624,51.488 L8.02624,49.3792 L11.24224,49.3792 C13.01184,49.3792 14.44864,48.0672 14.44864,46.4512 C14.44864,44.8384 13.01184,43.5232 11.24224,43.5232 L8.02624,43.5232 L8.02624,41.4144 L11.24224,41.4144 C13.01184,41.4144 14.44864,40.1024 14.44864,38.4928 C14.44864,36.8736 13.01184,35.5648 11.24224,35.5648 L8.02624,35.5648 L8.02624,33.4528 L11.24224,33.4528 C13.01184,33.4528 14.44864,32.1376 14.44864,30.528 C14.44864,28.9152 13.01184,27.6 11.24224,27.6 L8.02624,27.6 L8.02624,25.488 L11.24224,25.488 C13.01184,25.488 14.44864,24.1792 14.44864,22.56 C14.44864,20.9504 13.01184,19.6352 11.24224,19.6352 L8.02624,19.6352 L8.02624,17.5232 L11.24224,17.5232 C13.01184,17.5232 14.44864,16.2144 14.44864,14.6016 C14.44864,12.9856 13.01184,11.6736 11.24224,11.6736 L8.02624,11.6736 L8.02624,9.5648 L11.24224,9.5648 C13.01184,9.5648 14.44864,8.2496 14.44864,6.6368 C14.44864,5.6576 13.91744,4.7872 13.10464,4.2528 L62.65024,4.2528 L62.65024,4.2528 Z" id="Fill-454" fill="#FFFFFF"></Svg.Path>
        </Svg.G>
      </Svg.G>
    </Svg>);
  }
}
