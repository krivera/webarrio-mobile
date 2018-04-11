import { Months } from '../constants/utils';

export const camelCase = value =>
  value.replace(/-([a-z])/g, g => g[1].toUpperCase());

export const camelCaseNodeName = ({ nodeName, nodeValue }) => ({
  nodeName: camelCase(nodeName),
  nodeValue,
});

export const removePixelsFromNodeValue = ({ nodeName, nodeValue }) => ({
  nodeName,
  nodeValue: nodeValue.replace('px', ''),
});

export const transformStyle = ({ nodeName, nodeValue, fillProp }) => {
  if (nodeName === 'style') {
    return nodeValue.split(';').reduce((acc, attribute) => {
      const [property, value] = attribute.split(':');
      if (property == '') return acc;
      else
        return {
          ...acc,
          [camelCase(property)]: fillProp && property === 'fill'
            ? fillProp
            : value,
        };
    }, {});
  }
  return null;
};

export const getEnabledAttributes = enabledAttributes => ({ nodeName }) =>
  enabledAttributes.includes(camelCase(nodeName));

export const getDate = time => {
  let date = new Date(time);
  let day = new Date(); // today
  if(date.toDateString() === day.toDateString()){
    date = date.getHours() + ':' + date.getMinutes();
  }
  else{
    day.setDate(date.getDate() - 1); // yesterday
    if(date.toDateString() === day.toDateString()){
      date = 'Ayer';
    }
    else{
      date = `${date.getDate()} ${Months[date.getMonth()]}`
    }
  }
  return date;
}