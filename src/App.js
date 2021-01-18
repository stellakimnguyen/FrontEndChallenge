import React, { Component } from "react";
import $ from 'jquery'; 
import searchicon from './icons/search.svg'
import './App.css';
import styled from 'styled-components';
import MovieCandidate from './components/MovieCandidate.js';
 
class App extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   testTestTest,
    // }
  }

  test(event) {
    console.log(event.target.value);
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      console.log('enter press here! ')
      console.log(event.target.value);
      $.getJSON(`http://www.omdbapi.com/?i=tt3896198&apikey=cb6b4a03&s=${event.target.value}`, function(movieResults) {
        // JSON result in `data` variable
        // this.setState({testTestTest: movieResults});
        var test = JSON.stringify(movieResults);
        console.log(test);
      });
    }
  }

  render() {
    // const testTest = this.state.testTestTest.forEach(function(data, index) {
    //   console.log(data);
    // });

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
              <MovieCandidate title="test0" />
              <MovieCandidate title="test1" />
              <MovieCandidate title="test2" />
              <MovieCandidate title="test3" />
              <MovieCandidate title="test4" />
              <MovieCandidate title="test5" />
              <MovieCandidate title="test6" />
              <MovieCandidate title="test7" />
              <MovieCandidate title="test8" />
              <MovieCandidate title="test9" />
              <MovieCandidate title="test10" />
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
