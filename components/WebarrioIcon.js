import React from 'react';
import { View } from 'react-native';
import EventIcon from '../assets/icons/event';
import PetIcon from '../assets/icons/pet';
import RecommendationIcon from '../assets/icons/recommendation';
import CarIcon from '../assets/icons/car';
import AnnouncementIcon from '../assets/icons/announcement';
import ListingIcon from '../assets/icons/listing';

export default class WebarrioIcon extends React.PureComponent{
  render(){
    switch (this.props.name){
      case 'pet':
        return (<PetIcon {...this.props} />);
      case 'event':
        return (<EventIcon {...this.props} />);
      case 'recommendation':
        return (<RecommendationIcon {...this.props} />);
      case 'car':
        return (<CarIcon {...this.props} />);
      case 'announcement':
        return (<AnnouncementIcon {...this.props} />);
      case 'listing':
        return (<ListingIcon {...this.props} />);
      default:
        return (<View />);
    }
  }
}