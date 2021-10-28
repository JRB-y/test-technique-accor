const HOTELS = require('./data/hotels.json').hotels;
const { distance: getDistance } = require('./helper');

const getHotels = () => {
	return HOTELS;
}

const getNerbyHotels = (lat, lng, radius) => {
  const nearbyHotels = [];
  for (const hotel of getHotels()) {
    const distance = getDistance(lat, lng, hotel.latitude, hotel.longitude);
    if (distance <= radius) {
      const { ridCode, countryCode, localRating, address, commercialName } = hotel
      nearbyHotels.push({
        ridCode,
        countryCode,
        localRating,
        address,
        commercialName,
        distance: parseInt(distance),
      });
    }
  }
  return nearbyHotels;
}

module.exports = {
	getHotels: getHotels,
  getNerbyHotels,
}
