import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Dashboard from './Dashboard';

function App() {

  const [searchInput, setSearchInput] = useState("");

  return (

    <Dashboard />
    // <div className="App">
    //   <Container>

    //     <InputGroup className='mb-3' size='lg'>
    //       <FormControl 
    //         placeholder='Search Song Name'
    //         type='input'
    //         onKeyDown={event => {
    //           if(event.key == "Enter"){
    //             console.log("pressed enter")
    //           }
    //         }}
    //         onChange={event => setSearchInput(event.target.value)}
    //       />

    //       <Button onClick={event => {console.log("button clicked")}}>
    //         Search
    //       </Button>
    //     </InputGroup>

    //   </Container>

    //   <Container>

    //         <Card>

    //           <Card.Img src='#' />
    //           <Card.Body>
    //             <Card.Title>Song Name Here</Card.Title>
    //           </Card.Body>

    //         </Card>

    //   </Container>
      
    // </div>

  );
}

export default App;
