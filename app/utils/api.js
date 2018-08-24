const axios = require('axios');

const id = 'YOUR_CLIENT_ID';
const secret = 'YOUR_SECRET_ID';
const params = '?client_id=' + id + '&client_secret=' + secret;

function getProfile(username){
  return axios.get('https://api.github.com/users/' + username + params)
    .then((user)=>{
      return user.data
    })
}

function getRepos(username) {
  return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100')
  
}

function getStartCount(repos) {
  return repos.data.reduce((count, repo)=>{
    return count + repo.stargazers_count;
  }, 0)
}

function calculateScore(profile, repos){
  const followers = profile.followers;
  const totalStars = getStartCount(repos);

  return (followers * 3) + totalStars + repos.data.length;
}

function handleError(error){
  console.warn(error)
  return null;
}

function getUserData(player){
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then((data)=>{
    const profile = data[0];
    const repos = data[1];
    return{
      profile: profile,
      score: calculateScore(profile, repos)
    }
  })
}

function sortPlayers(players){
  return players.sort((a, b)=>{
    return b.score - a.score
  })
}

module.exports = {
  battle: function (players) {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError)
  },
  fetchPopularRepos : function (language) {
    const encodeURI = window.encodeURI('https://api.github.com/search/repositories?q=starts>1+language:' + language + '&sort=starts&order=desc&type0Repositories');
    return axios.get(encodeURI)
      .then((res)=> {
        return res.data.items;
      })
  }
}