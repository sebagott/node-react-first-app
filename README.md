# node-react-first-app
## First Node.js &amp; React.js App

The backend is an Express Node.js app acting as a REST API with a local PostgreSQL database accessed by asynchronous queries from the React application. 

The front-end is a React.js application that uses 'react-bootstrap' for layout and 'react-select-search' for the search bar input.

## Some Details

- PostgreSQL has PostGIS extension installed for supporting GPS coordinates.

- A single 'Mountain' model was created and populated using the 'sequelize' and 'sequelize-cli' packages for ORM. The model is used for querying the database whenever search input has more than 4 characters.

- For fetching weather information by coordinates from the OpenWeatherMap API, the package 'react-promise' was used.

- CORS restriction were given on server-side to allow only API queries from the React.js app.

- The packages 'react-leaflet' and 'leaflet' were used for the map component of the front-end.

## Configuration

You will need to add a `config` folder inside the `server` folder and create the following files:
 
1. A `config.json` file with the database connection parameters (I used the development key for sequelize):
    ```
    {
      "development": {
        "username": << INSERT POSTGRES USERNAME HERE >>,
        "password": << INSERT POSTGRES PASSWORD HERE >>,
        "database": << INSERT POSTGRES DATABASE NAME HERE >>,
        "host": "127.0.0.1",
        "port": 5432,
        "dialect": "postgres"
      }
    }
    ```
2. `api_key.json` with your OpenWeatherMap API key (you can get one for free here: https://openweathermap.org/api) :
    ```
     {
        "WEATHER_API_KEY": << INSERT YOUR OPENWEATHERMAP API KEY HERE >>
     }
    ```

Once installed all the dependencies and setting up the database you can run at root directory both client side and server side with:
- `npm run dev` for a local development run.


