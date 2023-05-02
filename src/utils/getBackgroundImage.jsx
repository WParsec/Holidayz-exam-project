
// Function returns the background image url based on the continent name
import anywhereImage from '../assets/backgrounds/anywhere-2.jpg';
import asiaImage from '../assets/backgrounds/asia.jpg';
import europeImage from '../assets/backgrounds/europe.jpg';
import africaImage from '../assets/backgrounds/africa.jpg';
import southAmericaImage from '../assets/backgrounds/south-america.jpg';
import northAmericaImage from '../assets/backgrounds/north-america.jpg';
import australiaImage from '../assets/backgrounds/australia.jpg';

const getBackgroundImageUrl = (normalizedContinent) => {
  switch (normalizedContinent) {
    case 'anywhere':
      return anywhereImage;
    case 'asia':
      return asiaImage;
    case 'europe':
      return europeImage;
    case 'africa':
      return africaImage;
    case 'south america':
      return southAmericaImage;
    case 'north america':
      return northAmericaImage;
    case 'australia':
      return australiaImage;
    default:
      return anywhereImage;
  }
};

export default getBackgroundImageUrl;
