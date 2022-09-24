import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Card, FloatingLabel } from "react-bootstrap";
import axios from "axios";

export const AddTagForm = () => {
  const [tag, setTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagJson = {
      tag,
    };
    fetch("http://localhost:8000/api/tags/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tagJson),
    }).then(() => {
      console.log("Zarejestrowano tag");
    });
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group>
                  <FloatingLabel label="Tag">
                    <Form.Control
                      required
                      id="tag"
                      type="text"
                      name="tag"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
            <Row className="d-flex">
              <Button variant="success" type="submit">
                Dodaj Tag
              </Button>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
