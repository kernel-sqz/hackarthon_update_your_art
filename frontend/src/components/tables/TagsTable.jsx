import React, { useState, useMemo, useEffect } from "react";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import "bootstrap/dist/css/bootstrap.min.css";

import { useTable, useFilters, usePagination, useSortBy } from "react-table";
import {
  Table,
  Card,
  Pagination,
  Nav,
  InputGroup,
  Row,
  Col,
  Form,
  Spinner,
  Button,
  FloatingLabel,
  Image,
} from "react-bootstrap";

import axios from "axios";

const fetchData = async () =>
  await axios.get("http://localhost:8000/api/tags/");

const TableQuery = () => {
  const queryClient = useQueryClient();

  const [tableData, setTableData] = useState(null);
  const { data: apiResponse, isLoading } = useQuery("wagon", fetchData, {
    enabled: !tableData,
  });

  useEffect(() => {
    setTableData(apiResponse?.data);
  }, [apiResponse]);

  if (isLoading || !tableData) {
    return (
      <Row xl={12} className="d-flex mt-5">
        <Col xl={12} className="justify-content-center">
          <Card className="own_blue2">
            <Card.Body>
              <Row xl={12} className="justify-content-center">
                <Col xl={6} className="text-end">
                  <p>Ładowanie danych</p>{" "}
                </Col>
                <Col xl={6} className="text-start">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
  return <TableInstance tableData={tableData} />;
};

export const TableInstance = ({ tableData }) => {
  const [columns, data] = useMemo(() => {
    const columns = [
      {
        Header: "Tag",
        accessor: "tag",
      },
    ];
    return [columns, tableData];
  }, [tableData]);

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <>
      <div className="TanksTable">
        <TableLayout {...tableInstance} />
      </div>
    </>
  );
};

const TableLayout = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  page,
  prepareRow,
  setFilter,
  state: { pageIndex, pageSize },
  canPreviousPage,
  canNextPage,
  pageOptions,
  gotoPage,
  nextPage,
  setPageSize,
}) => {
  const [filterInput, setFilterInput] = useState("");
  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter("tag", value);
    setFilterInput(value);
  };

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
      window.location.reload();
      setTag("");
    });
  };

  return (
    <>
      <Row xl={12} className="">
        <Col
          xs={12}
          md={12}
          lg={12}
          xl={12}
          className="pb-4"
          style={{ paddingRight: "10%", marginRight: "50%" }}
        >
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Szukaj..."
              value={filterInput}
              onChange={handleFilterChange}
            />
          </InputGroup>
        </Col>
        <Card className="table-wrapper  table-responsive text-center">
          <Card.Body className="pt-0">
            <Table
              hover
              responsive
              className="user-table align-items-center mb-6"
              {...getTableProps()}
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        className={
                          column.isSorted
                            ? column.isSortedDesc
                              ? "sort-desc  ⬇️"
                              : "sort-asc ⬆️"
                            : " ↕️"
                        }
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <>
                      <tr className="table_row" {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td
                              style={{ fontSize: "large" }}
                              {...cell.getCellProps()}
                              onClick={(e) =>
                                sessionStorage.setItem(
                                  "europeana",
                                  JSON.stringify(cell.value)
                                )
                              }
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
            <Card.Footer className="px-3 border-0 d-flex align-items-center ">
              <Row className="d-flex justify-content-between w-100">
                <Col xl={6} md={6} xs={6}>
                  <Nav>
                    <Pagination className="mb-2 mb-lg-0">
                      <Pagination.Prev
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                      >
                        Wstecz
                      </Pagination.Prev>
                      <Pagination.Next
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                      >
                        Dalej
                      </Pagination.Next>
                      <div className="px-2">
                        <Form.Select
                          className="border border-glassy"
                          value={pageSize}
                          onChange={(e) => {
                            setPageSize(Number(e.target.value));
                          }}
                        >
                          {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                              Pokaż {pageSize}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                    </Pagination>
                  </Nav>
                </Col>
                <Col xl={6} md={6} xs={6} className="text-end">
                  <div>
                    <span>
                      Ilość wierszy: <strong>{page.length}</strong>
                    </span>
                  </div>
                  <div>
                    <span>
                      Strona{" "}
                      <strong>
                        {pageIndex + 1} z {pageOptions.length}
                      </strong>{" "}
                    </span>
                  </div>
                </Col>
              </Row>
            </Card.Footer>
          </Card.Body>
        </Card>
        <Row className="mx-1 mt-2">
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
        </Row>
      </Row>
    </>
  );
};
const client = new QueryClient();
export const TagsTable = () => {
  return (
    <QueryClientProvider client={client}>
      <TableQuery />
    </QueryClientProvider>
  );
};
export default TagsTable;

export const GetFromEuropeana = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/europeana?query=${sessionStorage.getItem(
          "europeana"
        )}`
      )
      .then((res) => {
        console.log("res", res.data.art.items);
        for (let i = 0; i < res.data.art.items.length; i++) {
          setData((oldArr) => [...oldArr, res.data.art.items[i]["full"][0]]);
        }
      });
  }, []);
  console.log("rtrg", data);
  return (
    <>
      <Row>
        {data.map((item, index) => (
          <Col>
            <Card className="d-flex text-center">
              <Card.Body>
                <Image src={item} id={index} className="image_own mx-2 my-2" />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};
