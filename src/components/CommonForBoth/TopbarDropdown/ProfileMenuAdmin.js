import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// users
import user4 from "../../../assets/images/users/avatar-4.jpg"
import SSRStorage from "../../../services/storage"
import { USER_COOKIE } from "../../../services/constants"
const storage = new SSRStorage();

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)

  const [username, setusername] = useState("Admin")

  const logOut = () => {
    storage.removeItem(USER_COOKIE);
    window.location.href = '/admin-login';
  }

  const loggedUser = async () => {
    let user = await storage.getItem(USER_COOKIE);
    if (!user) {
      window.location.href = '/home'
    } else if (user.payload.userType !== 'admin') {
      window.location.href = '/home'
    }
    else {
      let value = user.payload.stakeholder
      setusername(value);
    }
    console.log(user);
  }
  useEffect(() => {
    loggedUser();
  }, []);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={user4}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-1 fw-medium font-size-15">{'admin'}</span>{" "}
          {/* <i className="uil-angle-down d-none d-xl-inline-block font-size-15"></i> */}
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/profile">
            {" "}
            <i className="uil uil-user-circle font-size-18 align-middle text-muted me-1"></i>
            {props.t("View Profile")}{" "}
          </DropdownItem>
          <div className="dropdown-divider" />
          <Link to="#" onClick={logOut} className="dropdown-item">
            <i className="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted"></i>
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)
