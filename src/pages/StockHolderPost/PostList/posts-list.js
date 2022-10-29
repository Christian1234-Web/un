import React from "react"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, UncontrolledTooltip, Table, Input, Pagination, PaginationItem, PaginationLink, Button } from "reactstrap"
import { MDBDataTable } from "mdbreact"
import { Link } from 'react-router-dom'
// import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"


function PostList() {
  const actionIcon = <div className="d-flex gap-3 users">
    <ul className="list-inline font-size-20 contact-links mb-0">
      <li className="list-inline-item">
        <Link
          to="/view-post/1"
          className="text-primary"
        // onClick={() => {
        //   const users = cellProps.row.original
        //   // handleUserClick(users)
        // }}
        >
          <i className="uil-eye font-size-18" id="edittooltip" />
          <UncontrolledTooltip placement="top" target="edittooltip">
            View Details
          </UncontrolledTooltip>
        </Link>
      </li>
      <li className="list-inline-item">
        <Link
          to="/edit-post/1"
          className="text-primary"
        // onClick={() => {
        //   const users = cellProps.row.original
        //   // handleUserClick(users)
        // }}
        >
          <i className="uil uil-pen font-size-18" id="edittooltip" />
          <UncontrolledTooltip placement="top" target="edittooltip">
            Edit
          </UncontrolledTooltip>
        </Link>
      </li>
      <li className="list-inline-item">
        <Link
          to="#"
          className="text-danger"
        // onClick={() => {
        //   const users = cellProps.row.original
        //   onClickDelete(users)
        // }}
        >
          <i
            className="uil uil-trash-alt font-size-18"
            id="deletetooltip"
          />
          <UncontrolledTooltip placement="top" target="deletetooltip">
            Delete
          </UncontrolledTooltip>
        </Link>
      </li>
    </ul>
  </div>
  const data = {
    columns: [
      {
        label: "Title",
        field: "title",
        sort: "asc",
        width: 150,
      },
      {
        label: "Author",
        field: "author",
        sort: "asc",
        width: 270,
      },
      {
        label: "Categories",
        field: "categories",
        sort: "asc",
        width: 200,
      },
      {
        label: "Tag",
        field: "tag",
        sort: "asc",
        width: 100,
      },
      {
        label: "Date",
        field: "date",
        sort: "asc",
        width: 150,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 100,
      },
    ],
    rows: [
      {
        title: "Tiger Nixon",
        author: "System Architect",
        categories: "Edinburgh",
        tags: "61",
        date: "2011/04/25",
        action: actionIcon,
      },


    ],
  }

  return (
    <React.Fragment>
      <Row className="d-none">
        <Col className="col-12">
          <Card>
            <CardBody>
              {/* <CardTitle>Stripped example </CardTitle>
              <CardSubtitle className="mb-3">
                mdbreact DataTables has most features enabled by default, so
                all you need to do to use it with your own tables is to call
                the construction function:{" "}
                <code>&lt;MDBDataTable striped /&gt;</code>.
              </CardSubtitle> */}
              <div>
                <Link to='/admin-new-post' className="btn btn-primary float-end">
                  Add New
                </Link>
              </div>
              <MDBDataTable responsive striped bordered data={data} />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col className="col-12">
          <Card>
            <CardBody>
              <CardTitle>
                <div className="d-flex float-end mb-2">
                  <div className="mx-2">
                    <Input type="text" placeholder="search post" style={{ borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }} />
                    {/* <Button color="primary" style={{ borderRadius: '0px', borderTopRightRadius: '10px' }}> Search</Button> */}
                  </div>
                  <div>
                    <Link to='/admin-new-post' className="btn btn-primary">
                      Add New
                    </Link>
                  </div>
                </div>
              </CardTitle>
              <div className="">
                <Table bordered striped>
                  <thead>
                    <tr>
                      <th>
                        <Input type="checkbox" />
                      </th>
                      <th>
                        Title
                      </th>
                      <th>
                        Author
                      </th>
                      <th>
                        Categories
                      </th>
                      <th>
                        Tags
                      </th>
                      <th>
                        Date
                      </th>
                      <th>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <Input type="checkbox" />
                      </th>
                      <td>
                        Micheal
                      </td>
                      <td>
                        News
                      </td>
                      <td>
                        News
                      </td>
                      <td>
                        Child Trafficking
                      </td>
                      <td>
                        21-02-2022

                      </td>
                      <td>
                        <div className="d-flex gap-3 users">
                          <ul className="list-inline font-size-20 contact-links mb-0">
                            <li className="list-inline-item">
                              <Link
                                to="/view-post/1"
                                className="text-dark"
                              // onClick={() => {
                              //   const users = cellProps.row.original
                              //   // handleUserClick(users)
                              // }}
                              >
                                <i className="uil-expand-arrows-alt font-size-18" id="edittooltip" />
                                <UncontrolledTooltip placement="top" target="edittooltip">
                                  View Details
                                </UncontrolledTooltip>
                              </Link>
                            </li>
                            <li className="list-inline-item">
                              <Link
                                to="/edit-post/1"
                                className="text-dark"
                              // onClick={() => {
                              //   const users = cellProps.row.original
                              //   // handleUserClick(users)
                              // }}
                              >
                                <i className="uil-edit-alt font-size-18" id="edittooltip" />
                                <UncontrolledTooltip placement="top" target="edittooltip">
                                  Edit
                                </UncontrolledTooltip>
                              </Link>
                            </li>
                            <li className="list-inline-item">
                              <Link
                                to="#"
                                // onClick={() => {
                                //   const users = cellProps.row.original
                                //   onClickDelete(users)
                                // }}
                                className="text-dark"

                              >
                                <i
                                  className="uil uil-trash-alt font-size-18"
                                  id="deletetooltip"
                                />
                                <UncontrolledTooltip placement="top" target="deletetooltip">
                                  Delete
                                </UncontrolledTooltip>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <div className="d-flex justify-content-between">
                  <div>Showing 1 to 10 of 57 entries</div>
                  <Pagination aria-label="Page navigation example">
                    <PaginationItem disabled>
                      <PaginationLink
                        first
                        href="#"
                      />
                    </PaginationItem>
                    <PaginationItem disabled>
                      <PaginationLink
                        href="#"
                        previous
                      />
                    </PaginationItem>
                    <PaginationItem active>
                      <PaginationLink href="#">
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">
                        2
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem disabled>
                      <PaginationLink href="#">
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">
                        4
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">
                        5
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        next
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        last
                      />
                    </PaginationItem>
                  </Pagination>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default PostList