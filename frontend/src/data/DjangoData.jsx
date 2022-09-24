import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Row,
  Col,
  Image,
  Tabs,
  Tab,
  Card,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";

export const GetDjangoData = () => {
  const [data, setData] = useState([]);
  const [tags, setTags] = useState([]);
  const [note_for_teacher, setNote_for_teacher] = useState([]);

  const [apiTags, setApiTags] = useState([]);

  const handleChangeNormalSelect = (e) => {
    const updatedOptions = [...e.target.options]
      .filter((option) => option.selected)
      .map((x) => x.value);
    console.log("tags", updatedOptions);
    setTags(updatedOptions);
  };

  useEffect(() => {
    const getData = () => {
      axios.get("http://localhost:8000/api/zacheta/").then((res) => {
        setData(res.data);
      });
    };
    const getTags = () => {
      axios.get("http://localhost:8000/api/tags/").then((res) => {
        setApiTags(res.data);
      });
    };
    getTags();

    getData();
  }, []);

  const updateWithTags = (id, author, url, tagi) => {
    axios.put(`http://localhost:8000/api/zacheta/${id}/`, {
      id: id,
      author: author,
      url: url,
      tags: tagi,
    });
  };

  return (
    <>
      {data.map((item, index) => (
        <Col>
          <Card className="d-flex text-center">
            <Card.Body>
              <Image
                src={item.url}
                id={index}
                className="image_own mx-2 my-2"
              />
            </Card.Body>
            <Card.Footer className="text-start">
              <Row>
                <Col>
                  <span>
                    Autor:{" "}
                    {item["author"].FirstName + " " + item["author"].LastName}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span>Tytuł: {item.title}</span>
                </Col>
              </Row>

              <hr />
              <Form>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Tagi:</Form.Label>
                      <Form.Select
                        id="form"
                        onChange={handleChangeNormalSelect}
                        multiple
                      >
                        {apiTags.map((option, index) => (
                          <option key={index} value={option.id}>
                            {option.tag}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Button
                    onClick={(e) =>
                      updateWithTags(item.id, item.author, item.url, tags)
                    }
                  >
                    Aktualizuj
                  </Button>
                </Row>
                {/*                 <Row className="mt-2">
                  <Col>
                    <Form.Group id="notes">
                      <Form.Label>Notatki dla nauczyciela</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        value={note_for_teacher}
                        onChange={(e) => setNote_for_teacher(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row> */}
              </Form>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </>
  );
};

export const WithTags = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/zacheta/").then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i]["tags"].length !== 0) {
          setData((oldArr) => [...oldArr, res.data[i]]);
        }
      }
    });
  }, []);
  return (
    <>
      {data.map((item, index) => (
        <Col>
          <Card className="d-flex text-center">
            <Card.Body>
              <Image
                src={item.url}
                id={index}
                className="image_own mx-2 my-2"
              />
              <Row className="d-flex justify-content-center">
                <Col>
                  <Button
                    variant=""
                    onClick={(e) => {
                      localStorage.setItem(`collection`, (collection) => [
                        ...collection,
                        {
                          image: item.url,
                          author:
                            item["author"].FirstName +
                            " " +
                            item["author"].LastName,
                        },
                      ]);
                    }}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </Button>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="text-start">
              <Row>
                <Col>
                  <span>
                    Autor:{" "}
                    {item["author"].FirstName + " " + item["author"].LastName}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span>Tytuł: {item.title}</span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span>Tagi: {item.tags}</span>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </>
  );
};
