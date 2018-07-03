import Axios from 'axios'
import { API_URL } from 'react-native-dotenv'

export const NEIGHBORS_LOADED = 'NEIGHBORS_LOADED'
export const REQUESTING = 'REQUESTING'

function isRequesting() {
  return {
    type: REQUESTING
  }
}

function receiveNeighbors(neighbors) {
  return {
    type: NEIGHBORS_LOADED,
    neighbors: neighbors
  }
}

export function fetchNeighbors(neighborhood, authToken) {
  return dispatch => {
    dispatch(isRequesting())
    Axios.get(`${API_URL}/neighborhoods/${neighborhood}/neighbors`,
      {
        headers: {
          Authorization: authToken
        }
      }
    ).then(response => {
      dispatch(receiveNeighbors(response.data.neighbors))
    })
  }
}
