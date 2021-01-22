import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';

class MovieCandidate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Container>
            <MovieInfo>{this.props.title} | {this.props.year}</MovieInfo>
            <NominateButton>nominate</NominateButton>
        </Container>
    );
  }
}

//STYLED-COMPONENTS
const Container = styled.div `
  width: calc(100% - 40px);
  border-radius: 10px;
  background-color: #CFE7CC;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`

const MovieInfo = styled.div`
  font-family: Proxima Nova;
  font-weight: 500;
  text-transform: uppercase;
`

const NominateButton = styled.button `
  background-color: #F15942;
  font-family: Proxima Nova;
  font-weight: 500;
  text-transform: uppercase;
  border-radius: 10px;
  border: 0;
  letter-spacing: 0.2em;
  color: white;
  cursor: pointer;
  padding: 8px;

  &:focus {
    outline: none;
    transition: 250ms;
  }
`

MovieCandidate.propTypes = {
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};

export default MovieCandidate;
