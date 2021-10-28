const hotelService = require('./services/hotel-service');
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
    const nearbyHotels = hotelService.getNerbyHotels(lat, lng, radius);
    return nearbyHotels.sort((a, b) => a.distance - b.distance)
  } catch (error) {
    throw new Error(error);
  }
}

function findHotelNearbyWithBestOffer(lat, lng, radius, date) {
    // TODO implement me
    return null;
}

module.exports = {
  findHotelsNearby: findHotelsNearby,
  findHotelNearbyWithBestOffer: findHotelNearbyWithBestOffer
}
