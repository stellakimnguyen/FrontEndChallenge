import React, { Component } from "react";
import $ from 'jquery'; 
import searchicon from './icons/search.svg'
import './App.css';
import styled from 'styled-components';
import MovieCandidate from './components/MovieCandidate.js';
 
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: {},
    }

    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress = (event) => {
    let _this = this; // scope of *this* not available in callback for AJAX request
    if(event.key === 'Enter'){
      $.getJSON(`http://www.omdbapi.com/?i=tt3896198&apikey=cb6b4a03&s=${event.target.value}`, function(movieResults) {
        // JSON result in `data` variable
        _this.setState({ searchResults: movieResults });
      });
    }
  }

  render() {
    // const testTest = this.state.searchResults.forEach(function(data, index) {
    //   console.log(data);
    // });
    console.log(this.state.searchResults.Response);

    let results = <div></div>;

    if (this.state.searchResults.Response === 'True') {
      // results = this.state.searchResults.Search.forEach(function(data, index) {
      //   <MovieCandidate title={data.Title} year={data.Year} />
      // });

      results = this.state.searchResults.Search.map((movie, index) => {
        return (
          <MovieCandidate key={index} title={movie.Title} year={movie.Year} />
        );
      });
    } else {
      results = <div>No results found. Please try again.</div>
    }

    return (
      <Container>
        <MainTitle>The Shoppies</MainTitle>
        <SearchContainer>
          <SearchIcon src={searchicon} className="search-logo" alt="search" />
          <TextInput type="text" onChange={this.test} onKeyPress={this.handleKeyPress} />
        </SearchContainer>
        <ResultsContainer>
          <Results>
            <Subtitle>Results</Subtitle>
            <FilteredMovies>
              {results}
            </FilteredMovies>
          </Results>
        </ResultsContainer>
      </Container>
    );
  }
}

//STYLED-COMPONENTS
const Container = styled.div `
padding: 100px;
height: calc(100vh - 200px);
`
const MainTitle = styled.div `
  font-family: Proxima Nova;
  font-size: 24pt;
  font-weight: 700;
`

const SearchContainer = styled.div `
  width: 100%;
  background: #F0F4FA;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`

const SearchIcon = styled.img `
  background-color: #fff;
  border-radius: 10px 0 0 10px;
  padding-left: 10px;
`

const TextInput = styled.input `
  font-family: Proxima Nova;
  border: 0;
  border-radius: 0 10px 10px 0;
  padding: 10px;
  width: calc(100% - 20px);
  transition: 250ms;

  &:focus {
    outline: none;
    transition: 250ms;
  }
`

const ResultsContainer = styled.div `
  width: 100%;
  background: #F0F4FA;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
`

const Results = styled.div `
  background-color: #fff;
  border-radius: 10px 0 0 10px;
  width: calc(100% - 20px);
  padding: 10px;
`

const FilteredMovies = styled.div `
  margin-top: 10px;
  overflow-y: scroll;
  height: 400px;

  &::-webkit-scrollbar {
    width: 17px;
  }

  &::-webkit-scrollbar-track {
    background: #fff; // #e8e8e8
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d1d1;
    border-radius: 10px;
    border: 5px solid white;

    :hover {
      background: #a8a8a8;
    }
  }
`

const Subtitle = styled.div `
font-family: Proxima Nova;
font-size: 16pt;
font-weight: 700;
`

export default App;
