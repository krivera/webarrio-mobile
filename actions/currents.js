import { setNeighborhoodTree } from './neighborhood'

export const SET_CURRENT = 'SET_CURRENT'

export function setCurrent(key, value) {
  return {
    type: SET_CURRENT,
    key: key,
    value: value
  }
}

export function setInitialData(data) {
  return (dispatch) => {
    dispatch(setCurrent('user', data.user))
    dispatch(setNeighborhoodTree(data.neighborhoods))
    if (data.neighborhoods && data.neighborhoods.length) {
      let neighborhood = data.neighborhoods[0]
      dispatch(setCurrent('neighborhood', neighborhood))
      if (neighborhood.neighborhood_units && neighborhood.neighborhood_units.length) {
        let unit = neighborhood.neighborhood_units[0]
        dispatch(setCurrent('unit', unit))
        if (unit.apartments && unit.apartments.length) {
          dispatch(setCurrent('apartment', unit.apartments[0]))
        }
      }
    }
  }
}
