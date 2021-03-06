import axios from 'axios';

export const HOST = process.env.REACT_APP_API_URL;
console.log('HOST: ', HOST);

export function getHost() {
  return HOST;
}

export function post(path, data={}, config={}) {
  return axios
  .post(HOST + path , data, config)
  .then(res => {
    console.log(res);
    return res.data;
  });
}

export function put(path, data={}, config={}) {
  return axios
  .put(HOST + path , data, config)
  .then(res => {
    console.log(res);
    return res.data;
  });
}

export function patch(path, data={}, config={}) {
  return axios
  .patch(HOST + path , data, config)
  .then(res => {
    console.log(res);
    return res.data;
  });
}

export function get(path, config={}) {
  return axios
  .get(HOST + path, config)
  .then(res => {
    console.log(res);
    return res.data;
  });
}
