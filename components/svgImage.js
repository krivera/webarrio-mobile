import React from 'react';
import {
  StyleSheet,
  WebView
} from 'react-native';

export default class SvgImage extends React.Component{
  render(){
    const openingHtml = `<html>
      <head>
        <style>
          html, body { margin:0; padding:0; overflow:hidden }
          svg { position:fixed; top:0; left:0; height:100%; width:100% }
        </style>
      </head>
      <body>`;
    const closingHtml = '</body></html>';
    return (
      <WebView
        source={{html: `${openingHtml}${this.props.source.default}${closingHtml}`}}
        scrollEnabled={false}
        style={[styles.container, this.props.style]}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: 150,
    height: 50
  }
});