
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("ipInput").value = "";
});

var ipAddressSpan = document.getElementById('ip_address');
var locationSpan = document.getElementById('location');
var timezoneSpan = document.getElementById('timezone');
var ispSpan = document.getElementById('isp');
var mapdisplay=document.getElementById('map');


var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
 attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
 
var marker=L.marker([50.5, 30.5]).addTo(map);


//function fetch the data 
function getData(ipAddress)
{ 
  const ip=ipAddress;
  const apikey = 'at_kZKxsvkTvSfGjK3sUYEmSjbemfWVH';
  const apiUrl = 'https://geo.ipify.org/api/v2/country,city?';

  const url=apiUrl+'apiKey='+apikey+'&ipAddress='+ip;
  fetch(url)
    .then(data => {
      return data.json();
    })
    .then(data => {
      mapinfo(data);
      mapview(data);
    })
    
} 

 function mapinfo(data)
 {
  ipAddressSpan.innerHTML=data.ip;
  var country= `${data.location.country},${data.location.region}`
  locationSpan.innerHTML=(country);
  timezoneSpan.innerHTML="UTC "+data.location.timezone;
  ispSpan.innerHTML=data.isp;
 }

 function mapview(data)
 {
  setTimeout(() => {
    map.setView([data.location.lat, data.location.lng], 13);
  }, 1000); // Adjust the delay as needed
  marker.setLatLng([data.location.lat, data.location.lng]);
 }

 document.getElementById("fetchButton").addEventListener("click", (e) => {
  e.preventDefault();

  var inputValue = document.getElementById("ipInput").value;
  console.log(inputValue);
  getData(inputValue);
}
)