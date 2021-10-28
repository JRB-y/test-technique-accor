const PRICES = require('./data/prices.json').prices;

const getPrices = () => {
	return PRICES;
}

// get offers by ridCode, fare and date.
const getOffers = (ridCode, fare = 'STANDARD', date) => {
  const price = getPrices().find(price => price.ridCode === ridCode)
  if (price) {
    return price.offers.filter(offer => offer.fare === fare && offer.date === date).sort((a, b) => a.price - b.price);
  }
  return [];
}

module.exports = { getPrices, getOffers }
