export default {
  BASE_PATH: process.env.NODE_ENV === 'local' ? 'http://localhost:4120/api' : '/api'
};
