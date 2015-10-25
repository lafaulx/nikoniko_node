import axios from 'axios';

function getAPIUrl(endpoint) {
  // We on the server-side
  if (process.env.API_ORIGIN) {
    if (endpoint.indexOf(process.env.API_ORIGIN) === -1) {
      return process.env.API_ORIGIN + endpoint;
    }
  }

  return endpoint;
}


export default {
  submitMood: function(mood) {
    return axios.post(getAPIUrl('/api/submit'), {mood: mood});
  },

  getStats: function() {
    return axios.get(getAPIUrl('/api/stats'));
  }
};