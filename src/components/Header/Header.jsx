import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

class Header extends React.Component {
  render() {
    const { children, showBackButton } = this.props;
    return (
      <header>
        <div className="container">
          {children}
        </div>
        <div className="navbar">
          <ul>
            {/*<Link to="/"><li>首頁</li></Link>*/}
          </ul>
          { showBackButton &&
            <Link to="/" className="backButton">
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
          }
        </div>
      </header>
    );
  }
}

export default Header;
