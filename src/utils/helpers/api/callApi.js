import axios from 'axios';

// Set up Axios defaults
axios.defaults.baseURL = 'https://mentist.onrender.com/api/v1/';



export const callApi = async (method, url, data) => {

    //store token in localstorage
//   const token = await AsyncStorage.getItem('token');
  
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  return axios({
    method,
    url,
    data,
    headers,
  });
};
