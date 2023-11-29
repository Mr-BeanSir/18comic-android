import axios from 'axios';

const baseUrl = 'https://18comic-now.net';

const requestUtils = axios.create({
  baseURL: baseUrl,
  timeout: 1000 * 5,
});

requestUtils.interceptors.request.use(
  request => {
    console.log('request：');
    console.log(request);
    return request;
  },
  error => {
    console.log(error);
    return error;
  },
);

requestUtils.interceptors.response.use(
  response => {
    console.log('response：');
    console.log(response);
    return response;
  },
  error => {
    console.log(error);
    return error;
  },
);

const easyRequest = (api, params, otherData) => {
  return requestUtils({
    method: api.method,
    url: api.url,
    data: api.method == 'POST' ? params : {},
    params: api.method == 'GET' ? params : {},
    ...otherData,
  });
};

export {baseUrl, requestUtils, easyRequest};
