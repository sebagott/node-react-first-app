# node-react-first-app
First Node.js &amp; React.js App

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


