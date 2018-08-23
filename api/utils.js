import React from 'react'
import { Months } from '../constants/utils'

export const camelCase = value =>
  value.replace(/-([a-z])/g, g => g[1].toUpperCase())

export const camelCaseNodeName = ({ nodeName, nodeValue }) => ({
  nodeName: camelCase(nodeName),
  nodeValue
})

export const removePixelsFromNodeValue = ({ nodeName, nodeValue }) => ({
  nodeName,
  nodeValue: nodeValue.replace('px', '')
})

export const transformStyle = ({ nodeName, nodeValue, fillProp }) => {
  if (nodeName === 'style') {
    return nodeValue.split(';').reduce((acc, attribute) => {
      const [property, value] = attribute.split(':')
      if (property === '') {
        return acc
      }
      return {
        ...acc,
        [camelCase(property)]: fillProp && property === 'fill'
          ? fillProp
          : value
      }
    }, {})
  }
  return null
}

export const getEnabledAttributes = enabledAttributes => ({ nodeName }) =>
  enabledAttributes.includes(camelCase(nodeName))

export const getDate = time => {
  let date = new Date(time)
  // today
  let day = new Date()
  if (date.toDateString() === day.toDateString()) {
    date = date.getHours() + ':' + date.getMinutes()
  } else {
    // yesterday
    day.setDate(date.getDate() - 1)
    if (date.toDateString() === day.toDateString()) {
      date = 'Ayer'
    } else {
      date = `${date.getDate()} ${Months[date.getMonth()]}`
    }
  }
  return date
}

// Scroll a component into view. Just pass the component ref string.
export const focusInput = (scrollView, input) => {
  setTimeout(() => {
    let scrollResponder = scrollView.getScrollResponder()
    scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
      React.findNodeHandle(input),
      // additionalOffset
      110,
      true
    )
  }, 50)
}
