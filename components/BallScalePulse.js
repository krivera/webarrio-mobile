import React from 'react';
import {
  Animated,
  View
} from 'react-native';

export default class BallScalePulse extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      outerSize: new Animated.Value(props.size),
      innerSize: new Animated.Value(0),
      growing: false
    }
  }

  componentWillMount = () => {
    this._mounted = true;
    this.animate();
  }

  componentWillUnmount = () => {
    this._mounted = false;
  }

  animate = () => {
    if(!this._mounted) return;
    const { size } = this.props;
    const { growing } = this.state;
    this.setState({ growing: !growing }, () => {
      Animated.parallel([
        Animated.timing(this.state.outerSize, {
          toValue: growing ? size : size / 2,
          duration: 500,
        }),
        Animated.timing(this.state.innerSize, {
          toValue: growing ? 0 : size / 2,
          duration: 500,
        })
      ]).start(this.animate)
    });
  }

  render(){
    const { innerColor, outerColor, size } = this.props;
    const { innerSize, outerSize } = this.state;
    const radiusInner = innerSize / 2;
    const radiusOuter = outerSize / 2;
    return (
      <View style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Animated.View style={{
          backgroundColor: outerColor,
          width: outerSize,
          height: outerSize,
          borderRadius: size/2,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Animated.View
            style={{
              backgroundColor: innerColor,
              width: innerSize,
              height: innerSize,
              borderRadius: size/4
            }}
          />
        </Animated.View>
      </View>
    );
  }
}