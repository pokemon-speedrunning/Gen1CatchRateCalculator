import React from 'react'

function NavLink(props: { linkUrl: string; linkName: string; }) {
  return (
    <li className="nav-item active">
      <a className="nav-link" href={props.linkUrl}>{props.linkName}</a>
    </li>
  )
}

export default function Navigation() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="index.html">Gen 1 Catch Rate Calculator</a>
          <button className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbarSupportedContent" className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <NavLink linkName="Home" linkUrl="index.html"></NavLink>
              <NavLink linkName="Advanced" linkUrl="advanced.html"></NavLink>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
