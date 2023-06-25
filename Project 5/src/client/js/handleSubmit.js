import { nameChecker } from "./nameChecker";

const handleSubmit = (event) => {
  event.preventDefault();

  // check what text was put into the form field
  let dateTime = document.getElementById("date").value;
  const locationText = document.getElementById("location").value;
  // console.log(date);
  console.log(locationText);
  // POST request
  const postData = async (url = '', dataReq = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': "application/json",
        },
        // Body data type must match "Content-Type" header
        body: JSON.stringify(dataReq),
    });

    try {
      const dataRes = await response.json();

      return dataRes;

  } catch (error) {
      console.log('error', error);
  }
};

  postData('/getLocation', {locationText}).then((data) => {
    if (data.status != '404') {
        const dataLocation = {
            lon: data.lon,
            lat: data.lat
        };
        // console.log(dataLocation);
  postData('/getWeather', dataLocation).then((data) => {
      console.log('data weather' + data);

      // console.log(data.data[0].skin_temp_max);
      document.getElementById('myTripTo').innerHTML ='my trip in '+ locationText;
      document.getElementById('departing').innerHTML = 'Departing: ' + dateTime;
      document.getElementById('weatherResult').innerHTML = 'cao - ' + data.data[0].skin_temp_max + ', tahp - ' + data.data[0].skin_temp_min;
                                                             
  });

  postData('/getPhoto', {locationText}).then((data) => {
    console.log('1111111111111111111111111');
    console.log('data photo' + data);
     console.log('============================');
    // console.log(data.hits[0].previewURL);
    // document.getElementById('mainImage').src = data.hits[0].previewURL;

    document.getElementById("image").innerHTML =
    `
    <img id="mainImage"/>
      <img id="1"/>
      <img id="2"/>           
    `
    document.getElementById('mainImage').src = data.hits[0].previewURL;
    document.getElementById('2').src = data.hits[2].previewURL;
    // document.getElementById('3').src = data.hits[3].previewURL;

});
};

});

}

export { handleSubmit };
