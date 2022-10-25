import React from "react";
import { Card, CardBody, Table, CardTitle, Label, Input, Row, Col, Button, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";

const IndividualSubmission = () => {
    return (
        <Row>
            <Col lg={12}>
                <Card>
                    <CardBody>
                        <CardTitle className="h4 mb-4">Video's</CardTitle>
                        <div className="table-responsive">
                            <Table className="table-centered table-nowrap mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Id</th>
                                        <th>Title</th>
                                        <th>Embed Link</th>
                                        <th> Date Published</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>

                                        <td>#rer444</td>
                                        <td>
                                            News Video
                                        </td>
                                        <td>
                                            video.mp4
                                        </td>
                                        <td>
                                            10 Oct, 2019
                                        </td>
                                        <td>
                                            <div className="d-flex gap-3 users">
                                                <ul className="list-inline font-size-20 contact-links mb-0">

                                                    <li className="list-inline-item">
                                                        <Link
                                                            to="/admin-edit-post/1"
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
                                        </td>
                                    </tr>
                                    <tr>

                                        <td>#rer444</td>
                                        <td>
                                            News Video
                                        </td>
                                        <td>
                                            video.mp4
                                        </td>
                                        <td>
                                            10 Oct, 2019
                                        </td>
                                        <td>
                                            <div className="d-flex gap-3 users">
                                                <ul className="list-inline font-size-20 contact-links mb-0">

                                                    <li className="list-inline-item">
                                                        <Link
                                                            to="/admin-edit-post/1"
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
                                        </td>
                                    </tr>  <tr>

                                        <td>#rer444</td>
                                        <td>
                                            News Video
                                        </td>
                                        <td>
                                            video.mp4
                                        </td>
                                        <td>
                                            10 Oct, 2019
                                        </td>
                                        <td>
                                            <div className="d-flex gap-3 users">
                                                <ul className="list-inline font-size-20 contact-links mb-0">

                                                    <li className="list-inline-item">
                                                        <Link
                                                            to="/admin-edit-post/1"
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
                                        </td>
                                    </tr>  <tr>

                                        <td>#rer444</td>
                                        <td>
                                            News Video
                                        </td>
                                        <td>
                                            video.mp4
                                        </td>
                                        <td>
                                            10 Oct, 2019
                                        </td>
                                        <td>
                                            <div className="d-flex gap-3 users">
                                                <ul className="list-inline font-size-20 contact-links mb-0">

                                                    <li className="list-inline-item">
                                                        <Link
                                                            to="/admin-edit-post/1"
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
                                        </td>
                                    </tr>  <tr>

                                        <td>#rer444</td>
                                        <td>
                                            News Video
                                        </td>
                                        <td>
                                            video.mp4
                                        </td>
                                        <td>
                                            10 Oct, 2019
                                        </td>
                                        <td>
                                            <div className="d-flex gap-3 users">
                                                <ul className="list-inline font-size-20 contact-links mb-0">

                                                    <li className="list-inline-item">
                                                        <Link
                                                            to="/admin-edit-post/1"
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
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default IndividualSubmission;