# Weather Buddy 

<img src="https://img.shields.io/badge/Licence-MIT%20License-green"><br>

This assignment was to create a weather application using server-side APIs from OpenWeather.

## Contents
<p>
The app is composed of three files:
index.html script.js style.css
</p>

## Design
<p>It is aimed at the traveller market, so the design has been kept casual and fun, so a handwritten style font has been used. Keeping the traveller in mind, photos have been used to display information and drive engagement in the app.</p>

## Usability
<p> On first time use, the user is presented with Random town, that is the town of Random in the United Kingdom. Users can seacrh using the the search bar on the top left, and by looking up their previous searches listed below.

NB: Due to the high number of APIs to the same provider, the app can run slow and in testing the call failed at peak times. In the real world, this would be raised as a risk, but the performance has been left as is for the purpose of this assignment.</p>

## User Story
    
```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```

GIVEN a weather dashboard with form inputs

WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history

WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity

WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast

```

### Link to the App
https://dukewilki.github.io/weather-buddy

## Screenshots
![Screenshot 1](https://github.com/DukeWilki/weather-buddy/blob/master/assets/random.JPG)
![Screenshot 2](https://github.com/DukeWilki/weather-buddy/blob/master/assets/berlin.JPG)


### Updates
* V2.0 - Enter key disabled as it was deleting data in input feild but not commencing search.
* V2.0 - 404 error was sitting on the binocular image with previous search. Changed to show a lost image with an appropriate image in results panel.
* V2.0 - Note to help people find the right city so people can find the right place for cities with common names (e.g. San Juan, Hamilton, Newport etc) 

### Future Updates
* Mobile responsiveness
* Limit items in local storage
* option to delete previous cities
* Enter key commences search
* input feilds for country/state 



### Licence
MIT License | Copyright (c) 2020 Luke Wilkinson | https://github.com/DukeWilki/weather-buddy/blob/master/LICENSE

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Built With
* [VScode](https://code.visualstudio.com/) - The editor of choice
* [Terminal](https:///) - What would we do without our bash?

## Authors
* **LUKE WILKINSON**

## Credits and links
### UV Index
who.int
### API
openweathermaps.com
### Images
* thunder: accuweather.com
* sunny: tripadvisor.com
* stars: phys.org
* couldy: thetimesherald.com
* rainy: medium.com
* snow: mentalfloss.com
* mist: earth.com
* rainy night: unsplash.com
* cloudy night: pinterest.com.au
* snowy night: pinterest.com.au
* thunder day digital-photo-secrets.com
* binoculars: Shutterstock.com
* Polar image: medium.com
* Tropical image: lovetoknow.com
* Derert image: britanica.com
* Mountian image: britanica.com
* weather icons: openweathermaps.com
* lost in a boat: depositphotos.com
