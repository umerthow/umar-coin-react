import React from 'react';
import { handleResponse } from '../../helper';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import Table from './Table';
import Pagination from './Pagination';


class List extends React.Component {

    constructor() {
        super();

        this.state = {
            loading: false,
            currencies: [],
            error: null,
            totalPages: 0,
            page: 1,
        };
        this.handlePaginationClick = this.handlePaginationClick.bind(this);
    }

    componentDidMount() {
        this.fetchCurrencies();
    }

    fetchCurrencies() {
        this.setState({ loading: true });

        const { page } = this.state;

        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
            .then(handleResponse)
            .then((data) => {
                //console.log('Success', data);
                //const { totalPages, currencies } = data;
                this.setState({
                    totalPages: data.totalPages,
                    currencies: data.currencies,
                    loading: false
                });
            })
            .catch((error) => {
                this.setState({
                    error: error.errorMessage,
                    loading: false
                });
                //console.log('Error', error);
            });
    }


    handlePaginationClick(direction) {
        //console.log(this);
        let nextPage = this.state.page;

        nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;

        this.setState({ page: nextPage }, () => {
            //call fetchCurrencies function insede setState callback
            //because to make sure first data is updated
            this.fetchCurrencies();
        });
        
    }

    render() {
        const { loading, error, currencies, page, totalPages } = this.state;
        //console.log(this.state);
        if (loading) {
            return <div className="loading-container"> <Loading /> </div>
        }

        if (this.state.error) {
            return <div className="error"> {this.state.error} </div>
        }
        return (
            <div>
                <Table
                    currencies={currencies}
                />

                <Pagination
                    page={page}
                    totalPages={totalPages}
                    handlePaginationClick={this.handlePaginationClick}
                />
           </div>
        );
    }
}

export default List;