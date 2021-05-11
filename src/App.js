import React, { Component } from "react";
import $ from 'jquery'; 
import searchicon from './icons/search.svg'
import './App.css';
import styled from 'styled-components';
import MovieCandidate from './components/MovieCandidate.js';
import MovieNominee from './components/MovieNominee.js';
import backgroundSVG from './images/background.svg';
 
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: {},
      hasNominaton: false,
      currentNominations: this.fetchNominations(),
    }

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.addNomination = this.addNomination.bind(this);
    this.removeNomination = this.removeNomination.bind(this);
    this.fetchNominations = this.fetchNominations.bind(this);
  }

  handleKeyPress = (event) => {
    let _this = this; // scope of *this* not available in callback for AJAX request
    if(event.key === 'Enter'){
      $.getJSON(`http://www.omdbapi.com/?i=tt3896198&apikey=cb6b4a03&s=${event.target.value}`, function(movieResults) {
        // JSON result in `data` variable
        _this.setState({ searchResults: movieResults }, function() {
          console.log(this.state.searchResults);
        });
      });
    }
  }

  fetchNominations() {
    // let fetchedNominations = [];
    let fetchedNominations = new Map();

    if (localStorage.getItem("nominations") !== null) {
      fetchedNominations = new Map(JSON.parse(localStorage.getItem("nominations")));
    }
    
    return fetchedNominations;
  }

  addNomination(imdbID, movie) {
    console.log(this.state.currentNominations);
    if (!this.state.currentNominations.has(imdbID) && this.state.currentNominations.size < 5) {
      this.state.currentNominations.set(imdbID, movie);
      localStorage.setItem("nominations", JSON.stringify(Array.from(this.state.currentNominations.entries())));

      this.setState({ hasNominaton: true });
    }
  }

  removeNomination(imdbID) {
    console.log('we are here');
    // const index = this.state.currentNominations.indexOf(imdbID);

    // if (index > -1) {
    //   this.setState({ currentNominations: this.state.currentNominations.splice(index, 1) });
    //   localStorage.setItem("nominations", JSON.stringify(this.state.currentNominations));
    // } else {
    //   console.log(JSON.stringify(this.state.currentNominations));
    // }
  }

  render() {
    let results = <div></div>;
    let nominations = <div></div>;

    if (this.state.searchResults.Response === 'True') {
      results = this.state.searchResults.Search.map((movie, index) => {
        return (
          <MovieCandidate
            key={index}
            title={movie.Title}
            year={movie.Year}
            imdbID={movie.imdbID}
            movieInfo={movie}
            nominate={this.addNomination} />
        );
      });
    } else {
      results = <div>No results found. Please try again.</div>
    }

    if (this.state.currentNominations.length > 0) {
      nominations = this.state.currentNominations.map((movie, index) => {
        return (
          <MovieNominee
            key={index}
            title={movie.Title}
            year={movie.Year}
            imdbID={movie.imdbID}
            withdraw={this.removeNomination} />
        );
      });
    }

    return (
      <Container>
        <MainTitle>The Shoppies</MainTitle>
        <SearchContainer>
          <img src={searchicon} className="search-logo" alt="search" />
          <TextInput type="text" onChange={this.test} onKeyPress={this.handleKeyPress} />
        </SearchContainer>
        <NominationContainer isVisible={localStorage.getItem("nominations") !== null}>
          <Nominations>
            {nominations}
          </Nominations>
        </NominationContainer>
        <ResultsContainer>
          <Subtitle>Results</Subtitle>
          <FilteredMovies>
            {results}
          </FilteredMovies>
        </ResultsContainer>
      </Container>
    );
  }
}

//STYLED-COMPONENTS
const Container = styled.div `
  padding: 100px;
  height: calc(100vh - 200px);
  background-image: url(${backgroundSVG});
  background-size: cover;
  background-color: #fdf3ec;

  &:before {
    transform: rotate(180deg);
  }
`
const MainTitle = styled.div `
  font-family: Proxima Nova;
  font-size: 24pt;
  font-weight: 700;
  color: #fdf3ec;
`

const SearchContainer = styled.div `
  width: calc(100% - 40px);
  background: #fff; //F0F4FA
  border-radius: 10px;
  padding: 10px 20px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  box-shadow: 0 0 50px 0 rgba(43, 64, 104, 0.25);
  z-index: 1;
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
  background: transparent;

  &:focus {
    outline: none;
    transition: 250ms;
  }
`

const NominationContainer = styled.div `
  width: calc(100% - 20px);
  background: #fff; //F0F4FA
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
  transition: 250ms;
  // display: ${props => props.isVisible ? '' : 'none'};
  padding: ${props => props.isVisible ? '10px' : '0'};
  max-height:  ${props => props.isVisible ? '200px' : '0'};
  box-shadow: 0 0 50px 0 rgba(43, 64, 104, 0.25);
  
  div:first-child {
    display: ${props => props.isOpen ? '' : 'none'};
  }
`

const Nominations = styled.div `
  background-color: #fff;
  border-radius: 10px;
  width: calc(100% - 20px);
  padding: 10px;
`

const ResultsContainer = styled.div `
  width: calc(100% - 60px);
  background: #fff; //F0F4FA
  border-radius: 10px;
  padding: 30px;
  margin-top: 10px;
  box-shadow: 0 0 50px 0 rgba(43, 64, 104, 0.25);
`

const Results = styled.div `
  background-color: #fff;
  border-radius: 10px 0 0 10px;
  width: calc(100%);
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
