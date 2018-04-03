# Weather Forecast Browser

<b>Brief Overview:</b>At the top, a user is going to be able to search for a city such as New York or San Francisco, they submit the city by clicking "search here" or enter. We're going to submit a query to a third party API that's going to serve us back forecasted weather data for the next 5 days. Once we get that weather back, we're going to add a row on a table with information about that particular cities forecast for the next 5 days. The user can search for many different cities over time and for each search it'll just add an additional row. The table will consist of the city, and graphs for temperature, pressure and humidity.

# Challenges

First challenge is figuring out a way to make AJAX request with redux. With redux, we need to centralize all of our logic into reducers and actions as much as possible and instead our react components are only responsible for showing data, they're not responsible for fetching data at all. Second challenge is that we're going to use a third party library to draw the graphs for us and so we need to learn how to work with a react component that has been created by another developer and integrate it into our own project. Third challenge is that we need to figure out how to deal with a redux application where state changes significantly over time. We'll be adding on to cities every time the user searches one. We'll be gathering state over time.

In the following diagram, we've divided up the application into a few components: SearchBar, App, Chart, and ForecastList.

SearchBar is going to be responsible for showing search input and search button. Also responsible for kicking off for calling an action creator in redux. Whenever we enter a city name and try to submit that search, it needs to have the ability to tell redux that something just happened and it needs to go fetch some data.

Next we have the ForecastList, which is the general overall table of the data for each city searched. Third, we have chart that accounts for the three charts for each city. The overall app component takes all of these components and simply renders them onto the page (glue component).

# SearchBar

Is it a component or container. It needs to have the ability to modify the state of our application by dispatching actions. It needs to be able to call an action creator and say "hey, someone just entered a search term, we need to make an API request". Hence it needs to talk to redux and so it needs to be a container.

We have our input now and we're going to turn it into a controlled field which is a form element where the value of the input is set by the state of our component, not the other way around. We just set the initial state using a constructor in the SearchBar container and can also change the state over time by adding a change handler on the input fields. Placeholder will tell the user what the inputs for. The next two properties will turn it into a controlled component, first assigning a value to which will be *this.state.term* and whenever someone changes the input which is represented by the *onChange* property and named *this.onInputChange*. We're going to now bind the context of *onInputChange* to the component to be able to use setState by creating a function called *onInputChange(event)* and inside we'll setState using *this*. However, when using the *this* keyword inside that function, it doesn't refer to the component context necessarily but rather a mysterious context. So in order to use the *this* keyword outside of the component context, we binded it using *this.onInputChange.bind(this)* to use it.

# Binding Context (*this*)

Essentially, that line says that *this* which is an instance of the SearchBar component has a function called *onInputChange* and it binds that function to *this* which is SearchBar and then replace *onInputChange* with this new bound instance of this function.

# Form Elements in React

Right now if we enter a city and click on "Submit" or enter, the form clears and we see a question mark on localhost:8080/?. Turns out that the browser actually thinks you're submitting the information and is making a POST request in which it then clears the form and re-renders. We can prevent this by adding an event handler to the form element. We want to handle the submit event on the form. So following the normal react nomenclature for DOM events. We're going to add a new function handler to the property named *onSubmit*. We get free functionality for using a form. Whenever a user sees a search bar, they have an expectation that they can type something in and just hit enter. Using a form element, we get that behavior for free so using a form element is better than using a div element.

# Working with API's

We signed up for an account on OpenWeatherMap.org and generated our own API key in order to access the 5 day forecast data that we want to import into our application.

# Middleware

Doing AJAX requests with redux is quite complicated. Middleware's are function that take an action and depending on the actions type and actions payload or any other number of factors, the middleware can choose to let the action pass through, it can manipulate the action, it can console log it or stop it all together. It can do all of these types of little tasks on these actions before they reach any reducer. Its acts like a gatekeeper. Lets import a piece of middleware called Redux Promise into the project.

# AJAX Requests with Axios

In this section, we're going to work on creating that actual AJAX request and temporarily bench the topic of middlewares and redux promises. Here we'll focus on making the actual request. Remember, our app state holds all the data of our application which includes stuff like weather data. We only change our app state via reducers and actions. To load our weather data and to actually change our app state, we need to dispatch an action creator which is going to be responsible for making that AJAX request. After setting up the API key and Root URL as well as the action creator in charge of making the ajax request. JQuery is an extensive library and has great features when it comes to making AJAX requests but here we're going to use a library called Axios which is a library solely made for making AJAX requests from the browser.

# Redux Promise

So what we've done so far is setup a new action creator called "fetchWeather" which is responsible for creating an action that contains a request to the back end API. Its type was FETCH_WEATHER. Also note that the fetchWeather action creator takes a city which is a string and uses it as part of the search query like so. We also installed the Axios library which essentially behaves like the jQuery's AJAX method. It just reaches out in and does the ajax request in the form of a "GET" to the URL that we supply and it returns a promise and we pass that promise into the actions payload property.

Lets go back to the SearchBar. The goal is now to call the action creator whenever the user submits the form. Lets wire up the *onFormSubmit* function we created earlier so that whenever a user types something in and submits, we fire that action creator and make our actual API request. We're working on a container and a container needs to be able to call on an action creator; it needs to be able to reach redux directly. So that means we need to use the connect method from redux and connect the container to the 'react-redux' library. We're also going to bind the AC fetchWeather as a property to this container as we've done previously.  After doing the imports to the SearchBar container, we create the mapDispatchToProps function in order for the container to call upon the action creator and after doing that we wire up our "fetchWeather" action creator to the *onFormSubmit* function and bind the context for *this* to the constructor of the container.


# (con't)...

Right now, we're going to create a new reducer (reducer_weather.js) responsible for handling the *fetchWeather* action. After connecting this new reducer to the *combineReducers* in *index.js*. One thing to note is that when *fetchWeather* is called, we make an AJAX request which axios returns a promise. A promise is data structure that deosnt yet have any of our request data but in sometime will guarantee that particular data. We are returning the promise under the payload property in the *fetchWeather* action creator. That then goes to the reducers. However, before the promise travels to the reducer, it stopped temporarily by Redux Promise which is a middleware. RP sees action incoming and looks specifically at the payload property, if the payload is a promise, then redux promise stops the action entirely. Once the request finishes, it dispatches a new action of the same type but with a payload of the resolved request. It unwraps the promise for us. The reducers dont care about the promise only the data. So once the action gets the real data, it sends that to the reducer instead.

Lets go through middleware process once more. First an action returns from an action creator and flows and enters the middleware (redux promise middleware). Redux promise asks whether the action has a promise as a payload. If it doesn't, it goes through to the reducer since middleware isn't concerned with it (not it job). If it does, stop the action entirely and once the promise resolves, the middleware creates a new action and sends it to the reducers. Helps dramatically simplify the application. The AJAX request we've written is asynchronous in nature and doesn't occur instantly. Normally, we have to pass a callback to it or we have to work with a promise, etc. However, our code looks more synchronous and it helps make our code look simple and not overly complex. That's the point of redux promise, to clean up our code.

# Avoiding State Mutations in Reducers

Looking at the action passed through the reducer, all we care about for the reducers is the data (action.payload.data). Thinking of how we want to structure our data and query a list with each search stacked ontop of each other, we would probably be better of storing the pieces of weather data into an array. Rather than having an initial state of null, we'll have an initial state of an array instead. Next, we'll have a switch statement setup to handle only the fetchWeather action.

# Building a List Container

Our redux side of the application looks good so far. We have an action creator that can make an AJAX request to the weather API and we've got a reducer to handle that as well. Now we need to make a new component to render our list of cities with all of the appropriate data. This new component will be a container since it requires access to the data from redux.

# Adding Sparkline Charts

For the temperature, pressure, and humidity sections of the table, we're going to be adding the graphs using a library called "React-Sparklines". For the most part, its quite simple except that we now need to create arrays for temperature, pressure, and humidity and somehow extract those value from each city entered respectively and input them into the respective arrays.

Since we need to do create similar snippets of sparklines for pressure and humidity, we should make a new component solely for displaying those sparklines graphs. We refactored the chart component to be its own separate functional component. Its reusable. Never good to replicate markup.  

# Labelling of Units

Lets add a little numeric value to the graphs. First, we'll add a line on our chart that's just a single line that indicates the average and then we'll add another line underneath the chart indicating the average of the 5-day forecast for all three attributes. We'll do this using the react-sparklines library.

# Google Maps Intergration

One last feature, I want to implement is replace where it the says the name of the city in the table with a small window of the location on google maps.
