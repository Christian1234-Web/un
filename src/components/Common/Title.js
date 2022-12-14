import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Row, Col } from "reactstrap"
import { Translate } from "react-auto-translate"


const Title = props => {
  return (
    <Row className="">
      <Col xl={1} className="d-flex flex-row-reverse pt-1">
        <div
          className="p-2 mt-2"
          style={{ width: "13px", height: "18px", backgroundColor: "#65C843" }}
        ></div>
      </Col>
      
      <Col xl={3}>
        <h5 className="p-2 text-nowrap"><Translate>{props.title}</Translate></h5>
      </Col>
      <Col xl={8} className="d-flex justify-content-end">
        <hr className="pt-1 " style={{width:'100%'}} />
      </Col>
    </Row>
  )
}

Title.propTypes = {
  title: PropTypes.string,
}

export default Title
