import axios from 'axios';

export const HOST = 'http://localhost:9211/';

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

export function get(path, config={}) {
  return axios
  .get(HOST + path, config)
  .then(res => {
    console.log(res);
    return res.data;
  });
}
