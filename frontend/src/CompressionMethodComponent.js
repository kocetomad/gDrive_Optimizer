import {Alert, Button, Card, Col, Form, Row} from "react-bootstrap";
import React, {useState} from "react";

function CompressionMethodComponent(props) {
  const title = "Compression Method"
  const [requestSent, setRequestSent] = useState(false);

  /**
   * @description This function sends the list of files to compress to the backend.
   */
  function sendFiles(files) {
    const data = {
      fileID: files,
      token: props.access_token,
      email: props.user_email
    }

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
        setRequestSent(true);
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
        {requestSent &&
        <Alert key={'primary'} variant={'primary'}>
          Compression Started. You will be notified via email when it's done.
        </Alert>}
      </Card.Body>
      <Card.Footer>
        <Button onClick={() => {
          sendFiles(props.queue)
        }}>Compress</Button>
      </Card.Footer>
    </Card>
  )
}

export default CompressionMethodComponent