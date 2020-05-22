## Testing Mantra
"The more your tests resemble the way your software is used, the more confidence they can give you."

- Kent C. Dodds

## About the Project
This simple application was built to help myself and my team members at work learn simple principles
and tricks to do when testing components in React. After initial research, we decided to use the React
testing library instead of other testing libraries and tool available because we found it to be
simple, and agree with Kent C. Dodds' mantra.

The app uses the pokeAPI to fetch pokemon data based on user input. A context runs the state of the application,
and a reducer is used to update state as the application recieves new data.

As a disclaimer, this application is not 100% tested, but it highlights some of the basics to React testing.
On the master branch you will find some notes to help explain some of what is going on.

To learn even more, I recommend building more onto this simple application, and then testing your own stuff.
You can also create a branch that you can try to test the app as is and refer to my other branches for possible
solutions for testing the app.

Here are the best resources I found:
- https://testing-library.com/docs/react-testing-library/intro
- https://jestjs.io/en/

## Setup Locally
To setup simply clone the repo and run the following:

- **_yarn install_**
- **_yarn start_**

From here you should be able to use the application in your browser locally on port 3000.
To test run the following:

- **_yarn test_**

press _a_ after first run through of tests to make sure all tests are run.

