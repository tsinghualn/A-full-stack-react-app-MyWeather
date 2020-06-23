// Jumbotro: the big theme/title of the whole wehbpage; 
 //h1: add new heading 
 // ``, allow coders to input parameters witha string: in getWeather: fetch(`/api/weather/${city}`)
import React, { Component } from 'react';

import {
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Jumbotron,
  InputGroup, // add new input, such as type in newCityName
  InputGroupAddon,
  Button,
  FormGroup, // display existing group such as show currentWeather
  Input,
  Col
} from 'reactstrap';

import Weather from './Weather';

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
       weather: null,
       cityList: [],
       newCityName: ''
    };
  }

  getCityList = () => {
    fetch('/api/cities')
    .then(res => res.json())
    .then(res => {
      var cityList = res.map(r => r.city_name); // only leave all rows just with city_name
      this.setState({ cityList });// pass to the above this.state to update state
    });
  };

  handleInputChange = (e) => { // e: event
    this.setState({ newCityName: e.target.value });
  };

  handleAddCity = () => {
    fetch('/api/cities', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city: this.state.newCityName })
    })
    .then(res => res.json()) // the response is stored in res.json
    .then(res => {
      this.getCityList(); // update the cityList
      this.setState({ newCityName: '' }); // re-initiate the newCityName, so users can input another new city
    });
  };

  getWeather = (city) => {
    fetch(`/api/weather/${city}`)
    .then(res => res.json())
    .then(weather => {
      console.log(weather);
      this.setState({ weather });
    });
  }

  handleChangeCity = (e) => {
    this.getWeather(e.target.value);// pass the selected city and display the latest weather data
  }

  componentDidMount () {// life cycle method, that fetches data and initiate state
    this.getCityList(); // this ensures that when we start, the state var will be initilized with the cities we have
  }

  
 
  render() {
    return (
      <Container fluid className="centered">
        <Navbar dark color="dark">
          <NavbarBrand href="/">MyWeather</NavbarBrand> 
        </Navbar>
        <Row>
          <Col>
            <Jumbotron> 
              <h1 className="display-3">MyWeather</h1>
              <p className="lead">The current weather for your favorite cities!</p>
              <InputGroup>
                <Input 
                  placeholder="New city name..."
                  value={this.state.newCityName}
                  onChange={this.handleInputChange}
                />
                <InputGroupAddon addonType="append">
                  <Button color="primary" onClick={this.handleAddCity}>Add City</Button>
                </InputGroupAddon>
                
              </InputGroup>
            </Jumbotron> 
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="display-5">Current Weather</h1>
            <FormGroup>
              <Input type="select" onChange={this.handleChangeCity}>
                { this.state.cityList.length === 0 && <option>No cities added yet.</option> }
                { this.state.cityList.length > 0 && <option>Select a city.</option> }
                { this.state.cityList.map((city, i) => <option key={i}>{city}</option>) }
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Weather data={this.state.weather}/>
      </Container>
    );
  }
}

export default App;
