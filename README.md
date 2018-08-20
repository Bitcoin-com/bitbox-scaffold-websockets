## BITBOX Scaffold WebSockets

Used for events, meetups etc to display BCH addresses and notify when donations are received.

## Setup

1. [Install `bitbox-cli`](https://www.npmjs.com/package/bitbox-cli) globally
    * `npm install bitbox-cli --global`
2. Scaffold an WebSockets app w/ BITBOX web bindings
    * `bitbox new myApp --scaffold websockets`
3. `cd` in to the newly created app
    * `cd myApp`
4. Install dependencies
    * `npm install`
5. Edit the `src/donations.js` file with images, names and addresses
6. Start the app
    * `npm start`
7. Open a browser to `http://localhost:3000/`
8. Win
