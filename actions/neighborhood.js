export const SET_NEIGHBORHOOD_TREE = 'SET_NEIGHBORHOOD_TREE';
export const SET_NEIGHBORHOODS = 'SET_NEIGHBORHOODS';

export function setNeighborhoodTree(data){
  return {
    type: SET_NEIGHBORHOOD_TREE,
    data: data
  }
}

export function setNeighborhoods(neighborhoods){
  return {
    type: SET_NEIGHBORHOODS,
    neighborhoods: neighborhoods,
  };
}
