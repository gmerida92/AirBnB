import React from "react";
import { NavLink } from "react-router-dom";
// import { Link } from "react-router-dom";
import './Footer.css'

function Footer() {
    return (
        <div className='footer_container'>
            <NavLink
                id="external_link"
                to="/"
                onClick={() =>
                    (window.location.href = "https://github.com/gmerida92/AirBnB")
                }
            >
                About
            </NavLink>

            <NavLink
                id="external_link"
                to="/"
                onClick={() =>
                    (window.location.href = "https://github.com/gmerida92")
                }
            >
                Github
            </NavLink>

            <NavLink
                id="external_link"
                to="/"
                onClick={() =>
                    (window.location.href = "https://www.linkedin.com/in/george-merida-441988140/")
                }
            >
                LinkedIn
            </NavLink>
        </div>
    )
}

export default Footer;