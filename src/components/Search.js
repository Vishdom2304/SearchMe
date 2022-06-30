import React, { Component } from 'react'
import SearchItems from './SearchItems'
import Spinner from './Spinner';
import { motion } from 'framer-motion'
const axios = require("axios").default;
const ls = require('localstorage-ttl');
export class Search extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      totalResults: 0,
      query: 'google',
      pageSize: 5,
      page: 10
    }
    this.typingTimeout = 0
  }

  handleChange = (event) => {

    clearTimeout(this.typingTimeout);
    this.setState(
      {
        query: event.target.value,
        page: 10
      });

  }
  loadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 10
    }));
    // console.log(this.state.page)
  };
  async componentDidUpdate(prevProps, prevState) {

    if ((prevState.page !== this.state.page || prevState.query !== this.state.query) && this.state.query.length >= 3) {

      this.typingTimeout = setTimeout(() => {
        // console.log(prevState.page)
        // console.log(this.state.page)
        if (prevState.query !== this.state.query) {
          prevState.articles = [];
          // console.log('present1')
        }

        // console.log('present2')
        const cache = ls.get(this.state.query)
        if (cache != null && prevState.query !== this.state.query) {
          // console.log(this.state.query)
          this.setState(
            {
              articles: cache.data.results,
              totalResults: cache.data.total,
              loading: false
            }
          )
          return;
        }

        const options = {
          method: 'GET',
          url: `https://google-search3.p.rapidapi.com/api/v1/search/q=${this.state.query}&num=${this.state.pageSize}&start=${this.state.page}`,
          headers: {
            'X-User-Agent': 'desktop',
            'X-Proxy-Location': 'IN',
            'X-RapidAPI-Key': 'ca6939f69amshcd8f87417461612p1ce41fjsn6b13e63ea135 ',
            'X-RapidAPI-Host': 'google-search3.p.rapidapi.com'
          }
        };
        this.setState({ loading: true })
        axios.request(options).then((response) => {
          console.log(response)
          if (prevState.query !== this.state.query) ls.set(this.state.query, response, [60000]);
          this.setState(
            {
              articles: [...prevState.articles, ...response.data.results],
              totalResults: response.data.total,
              loading: false
            }
          )
        }).catch(function (error) {
          console.error(error);
        });

      }, 3000);
    }
  }


  render() {
    return (
      <>
        <div className="container my-3 py-3">
          <div className="container my-3" style={{ width: '75%' }}>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.4,
              }}
              exit={{ y: -50, opacity: 0 }}
              className="text-center"
            >
              <h1 className="my-3 text-center fw-bolder" style={{ letterSpacing: '-0.1rem', color: '#2f363f' }}>Enter Your Query to Search :- </h1>
              <input className="form-control form-control-lg" type="text" placeholder="Type atleast 3 letters to begin the Search..." aria-label=".form-control-lg example" onChange={this.handleChange}></input>
            </motion.div>
          </div>
          <div className="row mt-5">
            {this.state.page === 10 && this.state.loading && <Spinner />}
            {this.state.articles.map((element) => {
              if (element.description) {
                // console.log(element.additional_links)
                return <div className="container d-flex flex-column align-items-start" key={element.link}>
                  <SearchItems title={element.title} description={element.description} newsUrl={element.link} />
                </div>
              }
            })}
          </div>
        </div>

        {/* {console.log(this.state.articles.size)} */}
        <div className="container d-flex justify-content-center mb-3">
          {!this.state.loading && this.state.articles.length !== 0 && (
            <button type="button" className="btn btn-md btn-primary" disabled={this.state.page > 100} onClick={this.loadMore}>Load More</button>
          )}

          {this.state.page > 10 && this.state.loading && <Spinner />}
        </div>

      </>
    )
  }
}

export default Search
