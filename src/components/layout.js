import React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  // const [optionsState, setState] = useState(
  //   location?.pathname.replaceAll("/", "")
  // )
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location?.pathname === rootPath
  let header

  // useEffect(() => {
  //   navigate(`/${optionsState}`)
  // }, [optionsState])

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  // const handleOptionChange = event => {
  //   setState(event.target.value)

  //   navigate(`/${event.target.value}`)
  // }
  //console.log(optionsState)
  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      {/* <select value={optionsState} onChange={handleOptionChange}>
        <option value="us">US</option>
        <option value="ua">UA</option>
      </select> */}
      {location?.pathname && (
        <Link to={location.pathname === "/us/" ? "/ua/" : "/us/"}>
          {location.pathname === "/us/" ? "UA" : "US"}
        </Link>
      )}
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
