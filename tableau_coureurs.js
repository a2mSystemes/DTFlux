const axios = require('axios');

const apiUrl = 'https://api.raceresult.com/205190/8O8JMI2739JS58R8KRJGJEZUSQXF807O';

axios.get(apiUrl)
  .then(response => {
    const data = response.data;
    console.log(typeof response);
    const participants = response.data.map(item => item.Nom);
    console.log('Participants:', participants);
    //console.log(data);
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des données de l\'API:', error);
  });


 
