const Apis = {
  login: {
    method: 'POST',
    url: '/login',
  },
  testLoginOk: {
    method: 'GET',
    url: '/user',
  },
  lastComic: {
    method: 'GET',
    url: '/albums?o=mr',
  },
};

export default Apis;
