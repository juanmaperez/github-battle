const React = require('react');
const PropTypes = require('prop-types');
const api = require('../utils/api');
const Loading = require('./loading')

//====== LanguageList Functional Component

function LanguagesList({selectedLanguage, onSelect}) {
	const languages = ['All', 'Javascript', 'Ruby', 'Java', 'Css', 'Python']
	return(
		<ul className="languages">
			{
				languages.map((lang)=> (
						<li 
						style={lang === selectedLanguage? {color: '#d0021b'}: null}
						className="lang-item" 
						onClick={ ()=> onSelect(lang)} 
						key={lang}> { lang } </li>
					)
				)
			}
		</ul>
	) 
}

//====== RepoGrid Functional Component

function RepoGrid({repos}) {
	return (
		<ul className="popular-list">
			{ 
				repos.map((repo, i)=>{
					return (
						<Repo key={repo.name} index={i} repo={repo} />
					)
				})
			}
		</ul>
	)
}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired
}
//====== Repo Functional Component

function Repo({repo, index}) {
	const { name, stargazerz_count, html_url, owner} = repo;
	return (
		<li className="popular-item">
			<ul className="space-list-items">
				<li>
					<img className="avatar"
						src={ owner.avatar_url }
						alt={ 'Avatar for ' + owner.login} 
					/>
				</li>
				<li># { index + 1 } <a href={ html_url}>{ name}</a></li>
				<li>@{ owner.login}</li>
				<li>{ stargazerz_count} starts</li>
			</ul>
		</li>
	)
}

//====== Proptypes for languageList

LanguagesList.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
}

//====== Popular Component

class Popular extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			selectedLanguage: 'All',
			repos: null    
		}
		this.updateLanguage = this.updateLanguage.bind(this);
	}

	componentDidMount(){
		this.updateLanguage(this.state.selectedLanguage);
	}

	updateLanguage(lang){
		this.setState(()=> ({
				selectedLanguage: lang,
				repos : null
			})
		)
		api.fetchPopularRepos(lang)
			.then((repos)=> this.setState(()=> ({ repos: repos })))
	}

	render(){
		const { selectedLanguage, repos } = this.state;

		return(
			<div>
				<LanguagesList 
					selectedLanguage={ selectedLanguage}
					onSelect={this.updateLanguage}
				/>
				{!repos?
 					<Loading text={`loading ${selectedLanguage}`}/>
 					: <RepoGrid repos={ repos } />
				}
			</div>
		);
	}
}

module.exports = Popular;
