import {Carousel, Alert, Button, Card, Col, Form, Row} from "react-bootstrap";
import React, {useState} from "react";

import image1 from './images/1.png';
import image2 from './images/2.png';
import image3 from './images/3.png';

function CompressionMethodComponent(props) {
  const title = "Compression Method"
  const [requestMessage, setRequestMessage] = useState("idle");

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  /**
   * @description This function sends the list of files to compress to the backend.
   */
  function sendFiles(files) {
    const data = {
      fileID: files,
      token: props.access_token,
      email: props.user_email
    }
    console.log(data)
    fetch('http://punchy.servebeer.com:4000/fetchMultipleFiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        //TODO: Add notification when compression fails
        // 204 if data invalid
        // 200 if data valid
        setRequestMessage("sent");
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function getFilesAmountMessage(queue) {
    if (queue.length === 1) {
      return title + " - " + queue.length + " file selected"
    } else if (queue.length > 1) {
      return title + " - " + queue.length + " files selected"
    } else {
      return title
    }
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{getFilesAmountMessage(props.queue)}</Card.Title>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm="4">Compression Level</Form.Label>
            <Col sm="8">
              <Form.Control as="select">
                <option>Maximum Compression</option>
                <option>Balanced Compression</option>
                <option>Low Compression</option>
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>
        <ul>
          {props.queue.map(file => (<li>{file}</li>))}
        </ul>
        {requestMessage === "sent" &&
        <Alert key={'primary'} variant={'primary'}>
          Compression started. You will be notified via email when it's done. In the meantime, check this guide:
        </Alert>}
        {requestMessage === "sent" &&
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <img
              className="d-block w-50"
              style={{marginLeft: 'auto', marginRight: 'auto'}}
              src={image1}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-50"
              style={{marginLeft: 'auto', marginRight: 'auto'}}
              src={image2}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-50"
              style={{marginLeft: 'auto', marginRight: 'auto'}}
              src={image3}
              alt="First slide"
            />
          </Carousel.Item>
        </Carousel>}
      </Card.Body>
      <Card.Footer>
        <Button onClick={() => {sendFiles(props.queue)}}>Compress</Button>
      </Card.Footer>
    </Card>
  )
}

export default CompressionMethodComponent