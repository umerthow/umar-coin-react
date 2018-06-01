import React from 'react';
import { API_URL } from '../../config';
import { handleResponse } from '../../helper';
import Loading from '../common/Loading';
import { withRouter } from 'react-router-dom';
import './Search.css';

class Search extends React.Component {

    constructor() {
        super();

        this.state = {
            searchResult : [],
            searchQuery: '',
            loading : false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }



    handleChange(event) {
        const searchQuery = event.target.value;

        this.setState({ searchQuery});

        //jika tidak diisi string tidak dikirim ke server
        if (!searchQuery) {
            console.log('input value is empty');
            return  '';
        }

        this.setState({
            loading: true
        });

        fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
            .then(handleResponse)
            .then((result) => {
               
                //console.log(result);
                this.setState({
                    loading: false,
                    searchResult : result,
                });
            })
    }

    //clear input and close autocomplete form
    handleRedirect(currencyId) {
        this.setState({
            searchQuery : '',
            searchResult : [],
        })

        this.props.history.push(`/currency/${currencyId}`);
    }

    renderSearchResults() {
        const { searchResult, searchQuery, loading } = this.state;
        if (!searchQuery) {
            return '';
        }

        if (searchResult.length > 0) {
            return (

                <div className="Search-result-container">
                    {searchResult.map(result => (

                        <div
                            key={result.id}
                            className="Search-result"
                            onClick={() => this.handleRedirect(result.id)}
                        >
                            {result.name} ({result.symbol})
                    </div>

                    ))}
                </div>

            );

        }

        if (!loading) {
            return (
                <div className="Search-result-container">
                    <div className="Search-no-result">
                        Coin tidak ditemukan
                </div>
                </div>
            );
        }
    }

    render() {
        const { loading,searchQuery } = this.state;
        return (

            <div className="Search">
                <span className="Search-icon" />
                <input
                    className="Search-input"
                    type="text"
                    placeholder="Cari nama currency"
                    onChange={this.handleChange}
                    value={searchQuery}
                />

                  {loading &&
                    <div className="Search-loading">
                        <Loading
                            width="12px"
                            height="12px"
                        />
                    </div>
                }

                { this.renderSearchResults() }

            </div>
            
        );
    }

}

export default withRouter(Search);

