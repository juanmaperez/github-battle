const axios = require('axios');

module.exports = {
  fetchPopularRepos : function(language) {
    const encodeURI = window.encodeURI('https://api.github.com/search/repositories?q=starts>1+language:' + language + '&sort=starts&order=desc&type0Repositories');
    return axios.get(encodeURI)
      .then((res)=> {
        return res.data.items;
      })
  }
}