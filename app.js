const { getNerbyHotels, getHotelsByOffer } = require('./services/hotel-service');
const { isLatitude, isLongitude } = require('./services/helper');

function findHotelsNearby(lat, lng, radius) {
  // returns an empty array *when no args are passed**
  if (!lat && !lng && !radius) {
    return [];
  }

  const errors = [];
  if (!lat || !isLatitude(lat)) errors.push('Invalid latitude format');
  if (!lng || !isLongitude(lng)) errors.push('Invalid longitude format');
  if (!radius) radius = 2000; // default value :)
  if (errors.length) {
    throw new Error('\n' + errors.join('\n'))
  }

  try {
    const nearbyHotels = getNerbyHotels(lat, lng, radius);
    return nearbyHotels.sort((a, b) => a.distance - b.distance)
  } catch (error) {
    throw new Error(error);
  }
}

function findHotelNearbyWithBestOffer(lat, lng, radius, date) {
  if (!lat && !lng && !radius && !date) {
    return null;
  }

  try {
    let nearbyHotels = getNerbyHotels(lat, lng, radius);
    nearbyHotels = getHotelsByOffer(nearbyHotels, 'STANDARD', date);

    // sort by price and if same price sort by distance!
    return nearbyHotels.sort((a, b) => {
      if (a.offers[0].price === b.offers[0].price) {
        return a.distance - b.distance;
      }
      return a.offers[0].price - b.offers[0].price;
    })[0];

  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  findHotelsNearby: findHotelsNearby,
  findHotelNearbyWithBestOffer: findHotelNearbyWithBestOffer
}
