## Testing Mantra
"The more your tests resemble the way your software is used, the more confidence they can give you."

- Kent C. Dodds

## About the Project
This simple application was built to help myself and my team members at work learn simple principle
and tricks to do when testing components in React. After researching online, we decided to use implement
the React testing library instead of other testing libraries and tool available because we found it to be
simple, and agree with Kent C. Dodds' mantra.

The app uses the pokeAPI to fetch pokemon data based on a input search. A context runs the state of the application,
and a reducer is used to update state as the application recieves new data.

As a disclaimer, this application is not 100% tested with the included tests, but it highlights some basics
to React testing with some notes for you to follow.

## Setup Locally
To setup simply clone the repo and run the following:

_yarn install_
_yarn start_

From here you should be able to use the application in your browser locally on port 3000.
To test run the following:
_yarn test_
press _a_ after first run through of tests to make sure all tests are run.

