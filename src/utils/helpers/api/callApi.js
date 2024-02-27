import axios from 'axios';

// Set up Axios defaults
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1/';


export const callApi = async (method, url, data) => {

    //store token in localstorage
//   const token = await AsyncStorage.getItem('token');
  
  // const headers = {
  //   'Authorization': `Bearer ${token}`,
  //   'Content-Type': 'application/json',
  //   'Accept': 'application/json',
  // };

  return axios({
    method,
    url,
    data,
    // headers,
  });
};
