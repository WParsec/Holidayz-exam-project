# Holidayz Exam Project

My final exam for my 2 years of Front-end Study at Noroff School of Technology and Digital Media.

## Project Brief

A newly launched accommodation booking site called Holidaze has approached you to develop a brand new front end for their application. While they have a list of required features, the design and user experience have not been specified. Working with the official API documentation, plan, design and build a modern front-end accommodation booking application.

There are two aspects to this brief: the customer-facing side of the website where users can book holidays at a venue, and the admin-facing side of the website where users can register and manage venues and bookings at those venues.

### User Stories

The following user stories were required:

- A user may view a list of Venues - [x]
- A user may search for a specific Venue - [x]
- A user may view a specific Venue page by id - [x]
- A user may view a calendar with available dates for a Venue - [x]
- A user with a stud.noroff.no email may register as a customer - [x]
- A registered customer may create a booking at a Venue - [x]
- A registered customer may view their upcoming bookings - [x]
- A user with a stud.noroff.no email may register as a Venue manager - [x]
- A registered Venue manager may create a Venue - [x]
- A registered Venue manager may update a Venue they manage - [x]
- A registered Venue manager may delete a Venue they manage - [x]
- A registered Venue manager may view bookings for a Venue they manage - [x]
- A registered user may log in - [x]
- A registered user may update their avatar - [x]
- A registered user may log out - [x]

The project was bootstrapped with Create React App.

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

#### dependencies

/node_modules
/.pnp
.pnp.js

#### testing

/coverage
/cypress/screenshots
/cypress/videos

#### production

/build

#### misc

.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log
yarn-debug.log
yarn-error.log
