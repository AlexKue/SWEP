import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Menu,
  Dropdown,
  Container
} from "semantic-ui-react";

import Aufgabe from './Aufgabe.jsx';
import UbungsserieUbersicht from './UbungsserieUbersicht.jsx';

export default class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        {/* Die Menü Komponente muss noch ausgelagert werden und das Andere in einen Container gepackt */}
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as={Link} to="/home">Home</Menu.Item>
            <Dropdown item simple text="Ubungsserien">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <i className='dropdown icon' />
                  <span className='text'>SoSe 2019</span>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/sose19/hellosqrrl">Hello, SQRRL!</Dropdown.Item>
                    <Dropdown.Item disabled>Insert "ACORN" into "ICE"</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item as={Link} to="/login">Logout</Menu.Item>
          </Container>
        </Menu>
      </React.Fragment>
    );
  }
}
