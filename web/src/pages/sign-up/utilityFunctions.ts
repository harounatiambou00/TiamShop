import { Neighborhood } from "../../data/models/Neighborhood";

export const getNeighborhoods = async () => {
  let url = `${process.env.REACT_APP_API_URL} + Neighborhood`;
  let response = await fetch(url);
  let content = await response.json();
  let data = content.data;
  let neighborhoods = [];
  if (data != null) {
    for (var neighborhood of data) {
      neighborhoods.push({
        neighborhoodId: neighborhood.neighborhoodId,
        neighborhoodName: neighborhood.neighborhoodName,
      } as Neighborhood);
    }
  }

  return neighborhoods as Neighborhood[];
};
