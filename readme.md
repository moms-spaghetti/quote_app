# Quote App

A quote app with a front and backend hosted out of express\
[View Demo](https://moms-spaghetti-quotes.herokuapp.com/)
<br/><br/>

## Details

After learning the basics of express and how it can host frontend pages and an event driven backend I created this quote app. It captures a name and a quote from a frontend interface and uses functions to send data to express routes. These routes then pass the data to functions which uses a node postgres implementation to commit the data to a database. Quotes are then updated on the homepage ui.
<br/><br/>

## Built With

- HTML
- CSS
- Javascript
- Postgres SQL
- express
- dotenv
- nodemon
- node postgress
  <br/><br/>

## Getting Started

See the prerequisites and installation guides.
<br/><br/>

## Prerequisites

You will need a postgres table to utilise this repo. It will need three columns:

- id: set type to SERIAL PRIMARY KEY
- quote: set type to TEXT
- username: set type TEXT

You will also need a URI string for the database (depending on where you host it). If you already have a postgres database hosted somewhere I have included a createTable.js script which you can run from the console.

You will need to create a .env in the root folder with two entries:

- DATABASE_URL=(enter your database database URI here)
- PORT=(set a port number to access the app locally, I recommend 5000)
  <br/><br/>

## Installation

1. Clone the repo.
   ```sh
   git clone https://github.com/moms-spaghetti/quote_app.git
   ```
2. Download npm modules.
   ```sh
   npm i
   ```
3. Create a postgres database as described in the getting started section. If you already have a postgres database you can create the correct table with the included script.
   ```sh
   npm run createTable
   ```
4. Create an .env file in the root folder. Apply the URI connection string from your database and port as described in the getting started section.
5. Start the application from the root folder in your console
   ```sh
   npm start
   ```
6. Access the application from http://localhost:5000/
   <br/><br/>

## Usage

Quotes can be added by entering a name in the user box and the quote in the quote box. Once both boxes have values click 'save quote' and it will be shown in a list below. Quotes can be removed by ticking the checkbox next to them and clicking 'remove selected quote'.
<br/><br/>

## Contact

[Email](mailto:williamedwards36@aol.com)
<br/><br/>
