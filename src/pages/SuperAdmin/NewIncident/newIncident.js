import React, { useState } from 'react'
import { Card, CardBody, Col, Row, FormFeedback, Form, Input, Label, Button, FormGroup } from 'reactstrap'
import * as Yup from "yup";
import { useFormik } from "formik";
import Dropzone from "react-dropzone"
import { Link, } from 'react-router-dom'
import { request } from '../../../services/utilities';
import { USER_COOKIE } from '../../../services/constants';
import SSRStorage from '../../../services/storage';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { updateLoader } from '../../../store/actions';
import { Spinner } from "reactstrap";
const storage = new SSRStorage();


const NewPost = (props) => {
    const dispatch = useDispatch();
    const { loader } = useSelector((state) => ({
        loader: state.visibility.show
    }));
    const [selectedFiles, setselectedFiles] = useState([])
    const [allFiles] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [housenumber, setHousenumber] = useState('');
    const [landmark, setLandmark] = useState('');
    const [lga, setLga] = useState('');
    const [rname, setRname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');



    function handleAcceptedFiles(files) {
        setselectedFiles(files);
    }
    /**
     * Formats the size
     */
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
    }
    const uploadedFiles = () => {
        if (!(selectedFiles.length >= 1)) {
            return props.showToast('error', 'kindly attach a media File');
        }
        dispatch(updateLoader(''));
        let count = 0;
        const filteredD = selectedFiles.filter(i => !i.id)
        const files_ = selectedFiles.length > 1 ? filteredD : selectedFiles;
        const formData = new FormData();
        for (let i = 0; i < files_.length; i++) {
            let file = files_[i];
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
                        dispatch(updateLoader('none'))
                        saveIncident();

                    }
                });

        }
    }

    const clearForm = () => {
        validation.values.title = '';
        validation.values.description = '';
        validation.values.city = '';
        validation.values.state = '';
        validation.values.lga = '';
        validation.values.housenumber = '';
        validation.values.landmark = '';
        setSelectedCategory(null);
        setselectedFiles([]);

    }
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            title,
            description,
            city,
            state,
            housenumber,
            landmark,
            lga
            // categories: ''
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Please Enter Child Name"),
            description: Yup.string().required("Please Enter Description"),
            city: Yup.string().required("Please Enter Your City"),
            state: Yup.string().required("Please Enter Your State"),
            housenumber: Yup.string().required("Please Enter Your House Number"),
            landmark: Yup.string().required("Please Enter Your Landmark"),
            lga: Yup.string().required("Please Enter Your LGA"),
            // categories: Yup.string().required("Please Select Categories"),
        }),
        onSubmit: e => uploadedFiles()

    });
   
    const saveIncident = async e => {
        dispatch(updateLoader(''))

        const user = await storage.getItem(USER_COOKIE);
        let data = {
            childname: title, categoryId: parseInt(selectedCategory), sex: "M", age: 20, description, child_address: "mm", landmark, city, state, lga,
            isMobile: false, reporter_phone: user.payload.phone, reporter_name: user.payload.name, media_file: "media_file", reporter_mail: user.payload.email, media: allFiles, userId: user.payload.id

        };
        let url = `incident/create`;
        try {
            const rs = await request(url, 'POST', false, data);
            if (rs.success === true) {
                dispatch(updateLoader('none'))
                clearForm();
                props.showToast('success', 'Successfully saved');
            }
        } catch (err) {
            console.log(err);
            if (err.message === 'SMS Sending error Occured (check if you added a proper phone digit)') {
                dispatch(updateLoader('none'))
                props.showToast('error', err.message);

            } else {
                dispatch(updateLoader('none'))
                props.showToast('error', 'Failed to save');

            }
        }
    }
    const onChange = e => {
        console.log(e.target.files);
    }
    return (
        <React.Fragment>

            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            {/* <h4 className="card-title"> Report Incident</h4> */}
                            <h5 className=''>Child Labour Adolescent Details</h5>
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
                                            <Label htmlFor="validationCustom01">Name of Child</Label>
                                            <Input
                                                name="title"
                                                placeholder="Name of Child"
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
                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Label htmlFor="validationCustom01"> Categories</Label>
                                            <div className="mb-3">
                                                <select
                                                    className="form-select"
                                                    id={`floatingSelectGrid`}
                                                    // aria-label="Select Categories"
                                                    name="categories"
                                                    style={{ height: '30px' }}
                                                    onChange={e => {
                                                        setSelectedCategory(e.target.value);
                                                    }}
                                                // id="validationCustom01"
                                                // onChange={validation.handleChange}
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
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Label htmlFor="validationCustom02">Incident Description</Label>
                                            <Input
                                                name="description"
                                                placeholder="Incident Description"
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
                                                            <h4>Attach Media File.</h4>
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

                                        {/* <div className="float-end mt-4">
                                            <button
                                                type="button" onClick={() => uploadedFiles()}
                                                className="btn btn-success waves-effect waves-light" >
                                                Upload Document
                                            </button>
                                        </div> */}

                                    </Col>
                                </Row>
                                <h5>Address where child is found</h5>
                                <Row>
                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Label htmlFor="validationCustom01">House Number</Label>
                                            <Input
                                                name="housenumber"
                                                placeholder="House Number"
                                                type="text"
                                                className="form-control"
                                                id="validationCustom01"
                                                onChange={e => setHousenumber(e.target.value)}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.housenumber || ""}
                                                invalid={
                                                    validation.touched.housenumber && validation.errors.housenumber ? true : false
                                                }
                                            />
                                            {validation.touched.housenumber && validation.errors.housenumber ? (
                                                <FormFeedback type="invalid">{validation.errors.housenumber}</FormFeedback>
                                            ) : null}
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Label htmlFor="validationCustom01">Landmark</Label>
                                            <Input
                                                name="landmark"
                                                placeholder="Landmark"
                                                type="text"
                                                className="form-control"
                                                id="validationCustom01"
                                                onChange={e => setLandmark(e.target.value)}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.landmark || ""}
                                                invalid={
                                                    validation.touched.landmark && validation.errors.landmark ? true : false
                                                }
                                            />
                                            {validation.touched.landmark && validation.errors.landmark ? (
                                                <FormFeedback type="invalid">{validation.errors.landmark}</FormFeedback>
                                            ) : null}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Label htmlFor="validationCustom01">City</Label>
                                            <Input
                                                name="city"
                                                placeholder="City"
                                                type="text"
                                                className="form-control"
                                                id="validationCustom01"
                                                onChange={e => setCity(e.target.value)}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.city || ""}
                                                invalid={
                                                    validation.touched.city && validation.errors.city ? true : false
                                                }
                                            />
                                            {validation.touched.city && validation.errors.city ? (
                                                <FormFeedback type="invalid">{validation.errors.city}</FormFeedback>
                                            ) : null}
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Label htmlFor="validationCustom01">State</Label>
                                            <Input
                                                name="state"
                                                placeholder="State"
                                                type="text"
                                                className="form-control"
                                                id="validationCustom01"
                                                onChange={e => setState(e.target.value)}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.state || ""}
                                                invalid={
                                                    validation.touched.state && validation.errors.state ? true : false
                                                }
                                            />
                                            {validation.touched.state && validation.errors.state ? (
                                                <FormFeedback type="invalid">{validation.errors.state}</FormFeedback>
                                            ) : null}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Label htmlFor="validationCustom01">Local Government Area</Label>
                                            <Input
                                                name="lga"
                                                placeholder="LGA"
                                                type="text"
                                                className="form-control"
                                                id="validationCustom01"
                                                onChange={e => setLga(e.target.value)}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.lga || ""}
                                                invalid={
                                                    validation.touched.lga && validation.errors.lga ? true : false
                                                }
                                            />
                                            {validation.touched.lga && validation.errors.lga ? (
                                                <FormFeedback type="invalid">{validation.errors.lga}</FormFeedback>
                                            ) : null}
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Button className='float-end' color="success" type="submit">
                                    Submit
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

export default NewPost