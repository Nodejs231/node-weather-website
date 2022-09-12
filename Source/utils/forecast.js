const request = require('request')

const forecast = (latitude,longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=1b7889e2d61164edf803f8ff5fbe21a3&query=' + latitude + ',' + longitude +'&units=f'

request({ url: url, json: true},  (error, response) => {
  if(error) {
        callback('Unable to connect the location services', undefined)
  }else if(response.body.error){
    callback('unable to find location. Try another search', undefined)
  }else{
    callback(undefined,response.body.current.weather_descriptions[0] + ' It is currently ' + response.body.current.temperature + ' degrees out ' + ' It feels like ' + response.body.current.feelslike + ' degrees out ')
  }

})

}

module.exports = forecast