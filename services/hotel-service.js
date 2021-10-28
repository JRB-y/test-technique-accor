const HOTELS = require('./data/hotels.json').hotels;
const { distance: getDistance } = require('./helper');
const { getOffers } = require('./price-service')

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

/**
 * Accept a list of hotels and filter them by offers's 'fare' and 'date'.
 *
 * @param {Array} hotels array of hotels to filter.
 * @param {string} fare type of offers to find in hotel list.
 * @param {string} date date of offers to find in hotel list.
 * @returns {Array} List of hotels that have offer with fare and date.
 */
const getHotelsByOffer = (hotels, fare = 'STANDARD', date) => {
  const matchedHotels = [];
  for (const hotel of hotels) {
    const offers = getOffers(hotel.ridCode, fare, date)
    if (offers.length) {
      matchedHotels.push({ ...hotel, offers })
    }
  }
  return matchedHotels;
}

module.exports = {
	getHotels: getHotels,
  getNerbyHotels,
  getHotelsByOffer,
}
