import {Card} from "react-bootstrap";
import React from "react";

function CompressionMethodComponent(props) {

  return (
    <Card>
      <Card.Body>
        <Card.Title>Compression Method</Card.Title>
        The actual dropdown/form goes here. Just to debug, here's the queue:
        <ul>
          {props.queue.map(file => (<li>{file}</li>))}
        </ul>
      </Card.Body>
    </Card>
  )
}

export default CompressionMethodComponent