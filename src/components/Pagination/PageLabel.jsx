import React from "react";
import { Link } from "gatsby";

class PageLabel extends React.Component {
  render() {
    const { pageNumber, isCurrentPage } = this.props;
    if(isCurrentPage){
      return (
        <li className="pagination-current-page">
          <span>{pageNumber}</span>
        </li>
      );
    }else{
      return (
        <li className="pagination-link">
          <Link
            key={`listing-page-${pageNumber}`}
            to={pageNumber === 1 ? "/" : `/${pageNumber}/`}
          >
            {pageNumber}
          </Link>
        </li>
      );
    }
  }
}

export default PageLabel;