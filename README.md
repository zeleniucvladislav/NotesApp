# Notes Manager App

This application was created using MERN (Mongo, express, react, node) stack.

The client part of the application was created via react typescript using [Create React App Enviroment](https://create-react-app.dev/docs/getting-started/).

The server part of the application was created via node using typescript with help of ts-node and an express framework.For authorization JWT tokens were used, nodemailer to create emails with account confirmation links.

![Desktop view](https://i.ibb.co/TRKYSkP/chrome-9ao-Wz-S7d0d.png)
![Mobile view](https://i.ibb.co/TLMSz63/chrome-EF1-HH488-B5.png)

## Installation

NoteManager [Node.js](https://nodejs.org/) v12+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd client
npm i
cd server
npm i

#To run the app run simply run this command from server folder
npm run dev
```

For production environments...

```sh
cd client
npm run build
cd server
# To transpile server part to js use following command
npm run build
# And finnaly to run server part run :
npm start
```
