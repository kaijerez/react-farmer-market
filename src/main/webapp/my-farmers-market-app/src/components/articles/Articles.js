import React from 'react';
import Axios from 'axios';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default class Articles extends React.Component{

     _isMounted = false;
    constructor(props){
        super(props)
        this.state = {
            wikiSearchResult: [],
        }

        this.getPageUrl = this.getPageUrl.bind(this);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

  componentDidMount = () => {
    this._isMounted = true;
        var url = "https://en.wikipedia.org/w/api.php"; 
        var params = {
            action: "query",
            list: "search",
            srsearch: "Agriculture in Philippines",
            format: "json"
        }
        
        let newThis = this;
        url = url + "?origin=*";

        Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
        
        Axios(url)
		.then(function(response) {
			for (var key in response.data.query.search) {
				newThis.state.wikiSearchResult.push({
					queryResultPageFullURL: 'no link',
					queryResultPageID: response.data.query.search[key].pageid,
					queryResultPageTitle: response.data.query.search[key].title,
					queryResultPageSnippet: response.data.query.search[key].snippet
				});
				}
			}
		)
		.then(
			function (response) {
				for (var key in newThis.state.wikiSearchResult) {
					let page = newThis.state.wikiSearchResult[key];
					let pageID = page.queryResultPageID;
					let urlForRetrievingPageURLByPageID = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=info&pageids=${pageID}&inprop=url&format=json`;

					Axios(urlForRetrievingPageURLByPageID)
					.then(
						function (response) {
							return response.json();
						}
					)
					.then(
						function (response) {
							page.queryResultPageFullURL = response.data.query.pages[pageID].fullurl;


						if (newThis._isMounted) {
							newThis.forceUpdate();
						}
					})
				}
			}
		)
    }   

    getPageUrl = (wikiDataSearch,array)=>{
        for (var key in wikiDataSearch) {
            let pageID = wikiDataSearch[key].queryResultPageID;
            let urlForRetrievingPageURLByPageID = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=info&pageids=${pageID}&inprop=url&format=json`;

            Axios(urlForRetrievingPageURLByPageID)
              .then(function (res) {
                    array.push({
                        queryResultPageFullURL: res.data.query.pages[pageID].fullurl,
                        queryResultPageID: wikiDataSearch[key].queryResultPageID,
                        queryResultPageTitle: wikiDataSearch[key].queryResultPageTitle,
                        queryResultPageSnippet: wikiDataSearch[key].queryResultPageSnippet
                    });
                }
            )
        }
    }
   
	render() {
		let wikiSearch = [];
		for (var key3 in this.state.wikiSearchResult) {
			wikiSearch.push(
		<div key={key3}>
			<h5>
				<a href={this.state.wikiSearchResult[key3].queryResultPageFullURL}>
					{this.state.wikiSearchResult[key3].queryResultPageTitle}
				</a></h5>
			<p className="description" dangerouslySetInnerHTML={{__html: this.state.wikiSearchResult[key3].queryResultPageSnippet}}></p>
			</div>

		)}
		return (
			<Container>
				<Card>
					<Card.Header>
						Related Articles
					</Card.Header>
					<Card.Body>
				{wikiSearch}</Card.Body>
				</Card>
			</Container>
		);
	}
}