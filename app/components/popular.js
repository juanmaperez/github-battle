const React = require('react');
const PropTypes = require('prop-types');
const api = require('../utils/api');

//====== LanguageList Functional Component

function LanguagesList(props) {
	const languages = ['All', 'Javascript', 'Ruby', 'Java', 'Css', 'Python']
	return(
		<ul className="languages">
			{
				languages.map((lang)=>{
					return (
						<li 
						style={lang === props.selectedLanguage? {color: '#d0021b'}: null}
						className="lang-item" 
						onClick={ props.onSelect.bind(null, lang)} 
						key={lang}> { lang } </li>
					)
				})
			}
		</ul>
	) 
}

//====== RepoGrid Functional Component

function RepoGrid(props) {
	return (
		<ul className="popular-list">
			{ 
				props.repos.map((repo, i)=>{
					return (
						<Repo key={repo.name} index={i}repo={repo} />
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

function Repo(props) {
	return (
		<li className="popular-item">
			<ul className="space-list-items">
				<li>
					<img className="avatar"
						src={ props.repo.owner.avatar_url }
						alt={ 'Avatar for ' + props.repo.owner.login} 
					/>
				</li>
				<li># {props.index + 1 } <a href={ props.repo.html_url}>{props.repo.name}</a></li>
				<li>@{props.repo.owner.login}</li>
				<li>{props.repo.stargazerz_count} starts</li>
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
		this.setState(()=>{
			return {
				selectedLanguage: lang,
				repos : null
			}
		})
		api.fetchPopularRepos(lang)
			.then((repos)=> {
				this.setState(function(){
					return {
						repos: repos
					}
				}.bind(this))
			})
	}

	render(){
		return(
			<div>
				<LanguagesList 
					selectedLanguage={this.state.selectedLanguage}
					onSelect={this.updateLanguage}
				/>
				{!this.state.repos?
					<p>Loading...</p>
					: <RepoGrid repos={this.state.repos} />
				}
			</div>
		);
	}
}

module.exports = Popular;
