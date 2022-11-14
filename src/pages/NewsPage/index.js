import React, { useEffect } from "react"
import { Link, withRouter } from "react-router-dom"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Container,
  Input,
  Label,
  Row,
  Spinner,
  Table,
} from "reactstrap"
import { isEmpty, map } from "lodash"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import axios from "axios"
import newImage1 from "../../assets/images/un/children.png"

//Import Image
import logo from "../../assets/images/logo-dark.png"
import PropTypes from "prop-types"
import { getInvoiceDetail } from "../../store/invoices/actions"
import { connect } from "react-redux"
import { useState } from "react"
import Slidewithcontrol from "../Ui/CarouselTypes/iloslidewithcontrol"
import Title from "../../components/Common/Title"
import VideoCard from "../../components/Common/VideoCard"
import EventsCard from "../../components/Common/EventsCard"
import TopRead from "../../components/Common/TopRead"
import { Translate } from "react-auto-translate"

const InvoiceDetail = props => {
  const {
    invoiceDetail,
    match: { params },
    onGetInvoiceDetail,
  } = props

  const [individualNews, setIndividualNews] = useState(null)
  const [comment, setComment] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    try {
      const fetchIndividualNews = async () => {
        const response = await axios.get(
          `https://unirp.herokuapp.com/sections/?pageId=1&id=${params.id}&language=&events=&commentPage=1&commentLimit=20`
        )
        console.log(response)

        setIndividualNews(response?.data?.result)
      }
      fetchIndividualNews()
    } catch (error) {
      console.log("Fetch Individual Error", error)
    }
  }, [])

  const handleComment = async () => {
    // console.log("malik man", comment)
    const payLoad = {
      sectionId: individualNews?.id,
      name: name,
      comment: comment,
    }
    try {
      setLoading(true)
      const response = await axios.post(
        "https://unirp.herokuapp.com/sections/comment",
        payLoad
      )
      console.log("heyyyy", response)
      setLoading(false)
    } catch (error) {
      console.log("Submit comment error", error)
      setLoading(false)
    }
  }

  console.log("malik", individualNews)

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Minible" breadcrumbItem="Home" />
          <Row>
            <Col xl={12}>
              <Slidewithcontrol />
            </Col>
          </Row>

          <Row>
            <Col xl={8}>
              <Title title="NEWS" />
              <Card>
                <CardImg
                  top
                  className="img-fluid"
                  src={individualNews?.media[0].link}
                  alt="Card image cap"
                />
                <CardBody>
                  <CardTitle className="h4 mt-0">
                    <Translate>{individualNews?.title}</Translate>
                  </CardTitle>
                  <CardText>
                    <Translate>{individualNews?.content}</Translate>
                  </CardText>
                </CardBody>
              </Card>
              <div>
                <Label>Tags: </Label>
                {individualNews?.tags.split(",").map((tag, i) => (
                  <Button
                    color="secondary"
                    className="btn-soft-secondary waves-effect waves-light me-3"
                  >
                    {tag}
                  </Button>
                ))}
                <div className="col-4 mt-2">
                  <Label
                    className="visually-hidden"
                    htmlFor="specificSizeInputName"
                  >
                    Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="specificSizeInputName"
                    placeholder="Enter Name"
                  onChange={e => setName(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <Input
                    type="textarea"
                    id="textarea"
                    maxLength="225"
                    rows="3"
                    placeholder="Write comments here"
                    onChange={e => setComment(e.target.value)}
                  />
                </div>
                <div className="d-flex p-2 justify-content-center">
                  <Button
                    className="btn bg-success waves-effect waves-light w-25 text-dark font-weight-bold"
                    onClick={handleComment}
                  >
                    {loading ? (
                              <Spinner type="grow" size="sm" color="success" />
                            ) : (
                              <Translate>Post Comment</Translate>
                            )}
                    
                  </Button>
                </div>
              </div>
              <Col lg={12}>
                <Card>
                  <CardHeader>Comments</CardHeader>
                  <CardBody>
                    {individualNews?.comment?.map((comment, i) => (
                      <blockquote className="card-blockquote mb-0">
                        <CardText>{comment.comment}</CardText>
                        <footer className="blockquote-footer mt-3 font-size-12">
                          {" "}
                          {comment.name === ""
                            ? "Anonymous"
                            : comment.name}{" "}
                          {/* <cite title="Source Title">Source Title</cite> */}
                        </footer>
                      </blockquote>
                    ))}
                  </CardBody>
                </Card>
              </Col>
            </Col>
            <Col xl={4}>
              <Title title="VIDEO GALLERY" />
              <VideoCard />
              <Title title="EVENTS" />
              <EventsCard />
            </Col>
            <Col xl={12}>
              <Title title="TOP READ" />
              <TopRead />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

InvoiceDetail.propTypes = {
  invoiceDetail: PropTypes.object,
  onGetInvoiceDetail: PropTypes.func,
}

const mapStateToProps = ({ invoices }) => ({
  invoiceDetail: invoices.invoiceDetail,
})

const mapDispatchToProps = dispatch => ({
  onGetInvoiceDetail: id => dispatch(getInvoiceDetail(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InvoiceDetail))
