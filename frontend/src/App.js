import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import { TagsTable } from "./components/tables/TagsTable";
import { UpdateFromZacheta } from "./data/ZachetaApiHandler";
import { GetDjangoData } from "./data/DjangoData";
import { WithTags } from "./data/DjangoData";
import { GetFromEuropeana } from "./components/tables/TagsTable";

function App() {
  const [updateApi, setUpdateApi] = useState(null);
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <>
      {updateApi}
      <Tabs defaultActiveKey="pics-form" id="pics" className="mb-3">
        <Tab eventKey="pics" title="Obrazy">
          <WithTags />
        </Tab>
        <Tab eventKey="pics-form" title="Obrazy formularz">
          <Row className="d-flex image_list justify-content-center">
            <GetDjangoData />
          </Row>
        </Tab>
        <Tab eventKey="tags" title="Tagi">
          <Row className="d-flex justify-content-center">
            <Col xl={4} md={4} sm={12}>
              <TagsTable />
            </Col>
          </Row>
          <Row>
            <GetFromEuropeana />
          </Row>
        </Tab>
        <Tab eventKey="collection" title="Moja kolekcja"></Tab>
        <Tab eventKey="update" title="update api">
          <Row className="mt-3 d-flex text-center">
            <Col>
              <span>Aktualizacja z API, strona automatycznie się odświeży</span>
            </Col>
          </Row>
          <Row className="mt-3 d-flex text-center">
            <Col className="mt-3">
              <Button
                variant="success"
                onClick={async (e) => {
                  setUpdateApi(<UpdateFromZacheta />);
                  await sleep(5000);
                  window.location.reload();
                }}
              >
                Update
              </Button>
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </>
  );
}

export default App;
