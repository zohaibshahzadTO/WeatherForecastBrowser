# Weather Forecast Browser

<b>Brief Overview:</b>At the top, a user is going to be able to search for a city such as New York or San Francisco, they submit the city by clicking "search here" or enter. We're going to submit a query to a third party API that's going to serve us back forecasted weather data for the next 5 days. Once we get that weather back, we're going to add a row on a table with information about that particular cities forecast for the next 5 days. The user can search for many different cities over time and for each search it'll just add an additional row. The table will consist of the city, and graphs for temperature, pressure and humidity.

# Challenges

First challenge is figuring out a way to make AJAX request with redux. With redux, we need to centralize all of our logic into reducers and actions as much as possible and instead our react components are only responsible for showing data, they're not responsible for fetching data at all. Second challenge is that we're going to use a third party library to draw the graphs for us and so we need to learn how to work with a react component that has been created by another developer and integrate it into our own project. Third challenge is that we need to figure out how to deal with a redux application where state changes significantly over time. We'll be adding on to cities every time the user searches one. We'll be gathering state over time.

In the following diagram, we've divided up the application into a few components: SearchBar, App, Chart, and ForecastList.

SearchBar is going to be responsible for showing search input and search button. Also responsible for kicking off for calling an action creator in redux. Whenever we enter a city name and try to submit that search, it needs to have the ability to tell redux that something just happened and it needs to go fetch some data.

Next we have the ForecastList, which is the general overall table of the data for each city searched. Third, we have chart that accounts for the three charts for each city. The overall app component takes all of these components and simply renders them onto the page (glue component).

# SearchBar

Is it a component or container. It needs to have the ability to modify the state of our application by dispatching actions. It needs to be able to call an action creator and say "hey, someone just entered a search term, we need to make an API request". Hence it needs to talk to redux and so it needs to be a container.
