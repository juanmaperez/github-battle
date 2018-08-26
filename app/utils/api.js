import axios from 'axios';

const id = 'YOUR_CLIENT_ID';
const secret = 'YOUR_SECRET_ID';
const params = `?client_id=${id}&client_secret=${secret}`;

async function getProfile(username){
  const profile = await axios.get(`https://api.github.com/users/${username}${params}`)
  return profile.data;
}

function getRepos(username) {
  return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
}

function getStartCount(repos) {
  return repos.data.reduce((count, {stargazers_count}) => count + stargazers_count, 0)
}

function calculateScore({followers}, repos){
  return (followers * 3) + getStartCount(repos) + repos.data.length;
}

function handleError(error){
  console.warn(error)
  return null;
}

async function getUserData(player){
  const [profile, repos] = await Promise.all([
    getProfile(player),
    getRepos(player)
  ])
  return {
    profile,
    score: calculateScore(profile, repos)
  }
}

function sortPlayers(players){
  return players.sort((a, b)=> b.score - a.score)
}

const api = {
  async battle (players) {
    const results = await Promise.all(players.map(getUserData))
      .catch(handleError)
    
    return results === null
    ? results
    : sortPlayers(results)

  },
  async fetchPopularRepos (language) {
    const encodeURI = window.encodeURI(`https://api.github.com/search/repositories?q=starts>1+language:${language}&sort=starts&order=desc&type0Repositories`);
    const { data } = await axios.get(encodeURI)
    return data.items;
  }
}

export default api;