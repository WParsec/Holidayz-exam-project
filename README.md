![Project screenshot](https://github.com/WParsec/holidayz-exam-project/blob/main/Holidayz-screenshot.png)

# Holidayz Exam Project

Welcome to the Holidayz Exam Project. This project is the final exam for a 2-year Front-end Study at Noroff School of Technology and Digital Media.

Live site: [Holidayz](https://cerulean-melba-ba6cf3.netlify.app/)

## Description

This is an accommodation booking website named Holidayz. The application consists of two parts: a customer-facing side where users can book holidays at a venue, and an admin-facing side where users can register and manage venues and bookings at those venues.

The project was bootstrapped with Create React App.

## User Stories

The following user stories were required and are fulfilled:

- A user may view a list of Venues [x]
- A user may search for a specific Venue [x]
- A user may view a specific Venue page by id [x]
- A user may view a calendar with available dates for a Venue [x]
- A user with a stud.noroff.no email may register as a customer [x]
- A registered customer may create a booking at a Venue [x]
- A registered customer may view their upcoming bookings [x]
- A user with a stud.noroff.no email may register as a Venue manager [x]
- A registered Venue manager may create a Venue [x]
- A registered Venue manager may update a Venue they manage [x]
- A registered Venue manager may delete a Venue they manage [x]
- A registered Venue manager may view bookings for a Venue they manage [x]
- A registered user may log in [x]
- A registered user may update their avatar [x]
- A registered user may log out [x]

## Installation and Setup Instructions

Clone this repository to your local machine using the following command:

```
git clone https://github.com/WParsec/holidayz-exam-project.git
```

### Installation:

To install the project dependencies, navigate to the project directory, and run:

```
npm install
```

### Start server

To start the server, run:

```
npm start
```

This should start the server at http://localhost:3000/.

## Project Dependencies

This project uses the following dependencies:

- React.js
- react-calendar
- react-date-range
- react-datepicker
- react-helmet
- react-hook-form
- react-router-dom
- sass
- yup
- date-fns

## Development Dependencies

The development dependencies are as follows:

- Cypress (for testing)
- Prettier (for code formatting) Formats on Save

## Testing E2E CYPRESS

The project includes one spec with two tests, login and logout.  
To run tests, first, you need to run the live server. This is done by the following command:

```
npm run start
```

Once the project is running, you can open a second terminal and run the following command:

```
npm run cypress:run
```

The tests should now be running in your terminal and displaying successful 2 out of 2 tests.

## Gitignored files and folders

The following files and folders are git ignored:

- Node modules and dependencies (/node_modules, /.pnp, .pnp.js)
- Test results (/coverage, /cypress/screenshots, /cypress/videos)
- Production build files (/build)
- Miscellaneous system files (.DS_Store, .env. .local, npm-debug.log, yarn-debug.log, yarn-error.log)
