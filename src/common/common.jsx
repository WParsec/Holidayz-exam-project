// Fetch url's

const loginUrl = 'https://api.noroff.dev/api/v1/holidaze/auth/login';
const registerUrl = 'https://api.noroff.dev/api/v1/holidaze/auth/register';
const getAllVenuesUrl =
  'https://api.noroff.dev/api/v1/holidaze/venues?_bookings=true&sort=created&sortOrder=desc';
const bookingsUrl = 'https://api.noroff.dev/api/v1/holidaze/bookings';
const profileUrl = 'https://api.noroff.dev/api/v1/holidaze/profiles/';

export { loginUrl, registerUrl, getAllVenuesUrl, bookingsUrl, profileUrl };
