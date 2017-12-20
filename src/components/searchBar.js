import React, { Component } from 'react';
import { Navbar, FormGroup, FormControl, Button } from 'react-bootstrap';

class SearchBar extends Component {
    render() {
        return(
            <Navbar>
                <Navbar.Collapse>
                    <Navbar.Form>
                        <FormGroup>
                            <FormControl type="text" placeholder="Search" />
                        </FormGroup>
                        {' '}
                        <Button type="submit">Submit</Button>
                    </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default SearchBar;

