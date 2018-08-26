const id = 'YOUR_CLIENT_ID';
const secret = 'YOUR_SECRET_ID';
const params = `?client_id=${id}&client_secret=${secret}`;

async function getProfile(username){
  const profile = await fetch(`https://api.github.com/users/${username}${params}`)
  return profile.json();
}

async function getRepos(username) {
  const response = await fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
  return response.json()
}

function getStartCount(repos) {
  return repos.reduce((count, {stargazers_count}) => count + stargazers_count, 0)
}

function calculateScore({followers}, repos){
  return (followers * 3) + getStartCount(repos) + repos.length;
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
    const response = await fetch(encodeURI)
      .catch(handleError)

    const repos = await response.json();
    return repos.items;
  }
}

export default api;