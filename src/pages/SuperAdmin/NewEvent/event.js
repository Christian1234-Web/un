import React, { useState } from 'react'
import { Card, CardBody, Col, Row, FormFeedback, Form, Input, Label, Button, FormGroup, InputGroup } from 'reactstrap'
import * as Yup from "yup";
import { useFormik } from "formik";
import Dropzone from "react-dropzone"
import { Link, } from 'react-router-dom'
import Flatpickr from "react-flatpickr"
import { request } from '../../../services/utilities';
import { Spinner } from "reactstrap";

import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { useDispatch, useSelector } from 'react-redux'
import { updateLoader } from "../../../store/actions";


const NewEvent = (props) => {
    const dispatch = useDispatch();
    const { loader } = useSelector((state) => ({
        loader: state.visibility.show
    }));
    const [selectedFiles, setselectedFiles] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null)

    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState('');
    const [starttime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [venue, setVenue] = useState('');
    const [title, setTitle] = useState('');
    const [allFiles] = useState([]);

    function handleAcceptedFiles(files) {
        setselectedFiles(files)
    }

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
    }
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            title: title,
            description: description,
            startdate: startDate,
            enddate: endDate,
            starttime: starttime,
            endtime: endTime,
            venue: venue,
            // categories: ''
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Please Enter Event Title"),
            description: Yup.string().required("Please Enter Description"),
            // startate: Yup.date().required("Please Enter Date"),
            // enddate: Yup.date().required("Please Enter Date"),
            // starttime: Yup.date().required("Please Enter Time"),
            // endtime: Yup.date().required("Please Enter Time"),
            venue: Yup.string().required("Please Enter Venue"),
            // categories: Yup.string().required("Please Select Categories")
        }),

        onSubmit: e => uploadedFiles()
    });
    const uploadedFiles = () => {
        if (!(selectedFiles.length >= 1)) {
            return saveEvent()
        }
        dispatch(updateLoader(''));
        let count = 0;
        // const filteredD = selectedFiles.filter(i => !i.id)
        // const files_ = selectedFiles.length > 1 ? filteredD : selectedFiles;
        const files_ = selectedFiles;

        const formData = new FormData();
        for (let i = 0; i < files_.length; i++) {
            let file = files_[i];
            // console.log(file)
            formData.append("file", file);
            formData.append("upload_preset", "geekyimages");
            fetch(`https://api.cloudinary.com/v1_1/doxlmaiuh/image/upload`, {
                method: "POST",
                body: formData
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    let dataFile = {
                        name: data.original_filename, link: data.secure_url, type: data.format === 'png' || data.format === 'jpeg' ?
                            'image' : data.format === 'mp4' ? 'video' : data.format === 'mp3' ? 'audio' : ''
                    };
                    if (dataFile?.name !== null) {
                        allFiles.push(dataFile);
                    }
                    count++
                    if (count === files_.length) {
                        dispatch(updateLoader('none'));
                        saveEvent();

                    }
                });

        }
    }
    const saveEvent = async () => {
        dispatch(updateLoader(''));
        const data = {
            pageId: 2, title: title, content: description, startDate, endDate, date: startDate,
            media: allFiles,
            location: venue,
            categoryId: parseInt(selectedCategory)
        };
        try {
            let url = `sections`;
            const rs = await request(url, 'POST', true, data);
            if (rs.success === true) {
                dispatch(updateLoader('none'));
                showToast('success', 'Successfully Saved');
            }
        } catch (err) {
            dispatch(updateLoader('none'));
            console.log(err);
            showToast('error', 'Failed to save');

        }
    }
    const showToast = (error, message) => {
        let positionClass = "toast-top-right"
        let toastType
        let showMethod = 'fadeIn'

        toastr.options = {
            positionClass: positionClass,
            timeOut: 5000,
            extendedTimeOut: 1000,
            closeButton: false,
            debug: false,
            progressBar: false,
            preventDuplicates: true,
            newestOnTop: true,
            showEasing: 'swing',
            hideEasing: 'linear',
            showMethod: showMethod,
            hideMethod: 'fadeOut',
            showDuration: 300,
            hideDuration: 1000
        }

        // setTimeout(() => toastr.success(`Settings updated `), 300)
        //Toaster Types
        // if (toastType === "info") toastr.info(message, title)
        // else if (toastType === "warning") toastr.warning(message, title)
        if (error === "error") toastr.error(message)
        else toastr.success(message)
    }

    return (
        <React.Fragment>

            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            {/* <h4 className="card-title"> Report Incident</h4> */}
                            <h5 className=''>Add Event</h5>
                            <Form className="needs-validation"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    validation.handleSubmit();
                                    return false;
                                }}
                            >
                                <Row>
                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Label htmlFor="validationCustom01">Title</Label>
                                            <Input
                                                name="title"
                                                placeholder="Enter Title"
                                                type="text"
                                                className="form-control"
                                                id="validationCustom01"
                                                onChange={e => setTitle(e.target.value)}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.title || ""}
                                                invalid={
                                                    validation.touched.title && validation.errors.title ? true : false
                                                }
                                            />
                                            {validation.touched.title && validation.errors.title ? (
                                                <FormFeedback type="invalid">{validation.errors.title}</FormFeedback>
                                            ) : null}
                                        </FormGroup>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Label htmlFor="validationCustom02">Event Description</Label>
                                            <Input
                                                name="description"
                                                placeholder="Event Description"
                                                type="textarea"
                                                className="form-control"
                                                id="validationCustom02"
                                                rows="10"
                                                onChange={e => setDescription(e.target.value)}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.description || ""}
                                                invalid={
                                                    validation.touched.description && validation.errors.description ? true : false
                                                }
                                            />
                                            {validation.touched.description && validation.errors.description ? (
                                                <FormFeedback type="invalid">{validation.errors.description}</FormFeedback>
                                            ) : null}
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Label
                                    className="form-check-label"
                                    htmlFor="autoSizingCheck2"
                                >
                                    Event Time and Date Start/End
                                </Label>
                                <Row className="row row-cols-lg-auto gx-3 gy-2 align-items-center mt-2 mb-4">

                                    <Col xl={5}>
                                        <Label
                                            className="visually-hidden"
                                            htmlFor="specificSizeInputName"
                                        >
                                            Date & Time
                                        </Label>
                                        <InputGroup>

                                            <Input type='datetime-local' name='startdate'
                                                onChange={e => setStartDate(e.target.value)}
                                            />

                                        </InputGroup>
                                    </Col>


                                    <Col xl={2}>
                                        <div className="form-check text-center">
                                            <Label
                                                className="form-check-label"
                                                htmlFor="autoSizingCheck2"
                                            >
                                                To
                                            </Label>
                                        </div>
                                    </Col>

                                    <Col xl={5}>
                                        <Label
                                            className="visually-hidden"
                                            htmlFor="specificSizeInputName"
                                        >
                                            Date
                                        </Label>
                                        <InputGroup>
                                            <Input type='datetime-local' name='enddate' onChange={e => setEndDate(e.target.value)}
                                            />
                                        </InputGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Label htmlFor="validationCustom01"> Event Categories</Label>
                                            <div className="mb-3">
                                                <select
                                                    className="form-select"
                                                    id="floatingSelectGrid"
                                                    // aria-label="Select Categories"
                                                    name="category"
                                                    style={{ height: '30px' }}
                                                    // id="validationCustom01"
                                                    onChange={e => setSelectedCategory(e.target.value)}
                                                // onBlur={validation.handleBlur}
                                                // value={validation.values.categories || ""}
                                                // invalid={
                                                //     validation.touched.categories && validation.errors.categories ? true : false
                                                // }
                                                >
                                                    <option>Select Categories</option>
                                                    {props.categories?.map(e => {
                                                        return (
                                                            <option key={e.id} value={e.id}>{e.name}</option>
                                                        )
                                                    })}
                                                </select>
                                                {/* {validation.touched.categories && validation.errors.categories ? (
                                                    <FormFeedback type="invalid">{validation.errors.categories}</FormFeedback>
                                                ) : null} */}
                                                {/* <label htmlFor="floatingSelectGrid">
                                                    Categories
                                                </label> */}
                                            </div>

                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Label htmlFor="validationCustom01">Venue</Label>
                                            <Input
                                                name="venue"
                                                placeholder="Venue"
                                                type="text"
                                                className="form-control"
                                                id="validationCustom01"
                                                onChange={e => setVenue(e.target.value)}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.venue || ""}
                                                invalid={
                                                    validation.touched.venue && validation.errors.venue ? true : false
                                                }
                                            />
                                            {validation.touched.venue && validation.errors.venue ? (
                                                <FormFeedback type="invalid">{validation.errors.venue}</FormFeedback>
                                            ) : null}
                                        </FormGroup>
                                    </Col>
                                </Row>

                                {/* image */}

                                <Row>
                                    <Col>
                                        {/* <Card>
                                                    <CardBody> */}
                                        <Form>
                                            <Dropzone
                                                onDrop={acceptedFiles => {
                                                    handleAcceptedFiles(acceptedFiles)
                                                }}
                                            >
                                                {({ getRootProps, getInputProps }) => (
                                                    <div className="dropzone">
                                                        <div
                                                            className="dz-message needsclick"
                                                            {...getRootProps()}
                                                        >
                                                            <input {...getInputProps()} />
                                                            <div className="mb-3">
                                                                <i className="display-4 text-muted uil uil-cloud-upload" />
                                                            </div>
                                                            <h4>Attache Media File.</h4>
                                                        </div>
                                                    </div>
                                                )}
                                            </Dropzone>
                                            <div className="dropzone-previews mt-3" id="file-previews">
                                                {selectedFiles.map((f, i) => {
                                                    return (
                                                        <Card
                                                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                            key={i + "-file"}
                                                        >
                                                            <div className="p-2">
                                                                <Row className="align-items-center">
                                                                    <Col className="col-auto">
                                                                        <img
                                                                            data-dz-thumbnail=""
                                                                            height="80"
                                                                            className="avatar-sm rounded bg-light"
                                                                            alt={f.name}
                                                                            src={URL.createObjectURL(f)}
                                                                        />
                                                                    </Col>
                                                                    <Col>
                                                                        <Link
                                                                            to="#"
                                                                            className="text-muted font-weight-bold"
                                                                        >
                                                                            {f.name}
                                                                        </Link>
                                                                        <p className="mb-0">
                                                                            <strong>{f.formattedSize}</strong>
                                                                        </p>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </Card>
                                                    )
                                                })}
                                            </div>
                                        </Form>

                                        {/* <div className="text-center mt-4">
                                                            <button
                                                                type="button"
                                                                className="btn btn-primary waves-effect waves-light"
                                                            >
                                                                Upload Document
                                                            </button>
                                                        </div> */}
                                        {/* </CardBody>
                                                </Card> */}
                                    </Col>
                                </Row>

                                {/* end of image */}

                                <Button className='float-end' color="success" type="submit">
                                    Publish
                                </Button>
                                <Spinner className="fs-5 float-end mx-2" style={{ display: loader }} color="primary" />

                            </Form>
                        </CardBody>
                    </Card>
                </Col>
                {/* <Col xl={3} >

                </Col> */}
            </Row>
        </React.Fragment >
    )
}

export default NewEvent 