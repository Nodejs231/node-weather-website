const request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidmVua2F0MjgiLCJhIjoiY2w3OG9qa3F3MDZ1ejN1azY3dDI1ejZrNiJ9.WBbjC5MdMI1Xi4ALEG-XWA'
    
   
   request({ url: url, json: true}, (error, response) => {
       if(error){
           callback('Unable to connect the location services', undefined)
       } else if (response.body.features.length === 0) {        // response.body.features.length is path in mapbox.com
               callback('unable to find location. Try another search', undefined)
       } else {
           callback(undefined, {
               longitude: response.body.features[0].center[0],
               latitude: response.body.features[0].center[1],
               location: response.body.features[0].place_name
           })
       }
   })
   
   }

   module.exports = geocode