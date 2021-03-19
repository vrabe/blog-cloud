import React from "react";
import { Link } from "gatsby";
import _ from "lodash";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import PageLabel from "./PageLabel";
import BreakLabel from "./BreakLabel";
import "./Pagination.scss";

class Pagination extends React.Component {
  pagination() {
    const pageRangeDisplayed = 5;
    const marginPagesDisplayed = 1;
    const { currentPageNum, pageCount } = this.props;
    let items = [];

    // main pages' range
    let leftmost = Math.floor(currentPageNum + 1 - pageRangeDisplayed / 2);
    let rightmost = leftmost + pageRangeDisplayed;
    leftmost = Math.max(1, leftmost);
    rightmost = Math.min(pageCount + 1, rightmost);
    const mainRange = _.range(leftmost, rightmost);

    // left margin pages
    const leftMarginRange = _.range(1, Math.min(leftmost, marginPagesDisplayed + 2));
    leftMarginRange.map(element => {
      if(element === marginPagesDisplayed + 1) {
        items.push( <BreakLabel /> );
      }else{
        items.push( <PageLabel pageNumber={element} /> );
      }
    });

    // main pages
    mainRange.map(element => {
      items.push( <PageLabel pageNumber={element} isCurrentPage={element === currentPageNum} /> );
    });

    // right margin pages
    const rightMarginRange = _.range(Math.max(rightmost, pageCount - marginPagesDisplayed), pageCount + 1);
    rightMarginRange.map(element => {
      if(element === pageCount - marginPagesDisplayed) {
        items.push( <BreakLabel /> );
      }else{
        items.push( <PageLabel pageNumber={element} /> );
      }
    });

    return items;
  }

  render() {
    const { currentPageNum, pageCount } = this.props;
    const prevPage = currentPageNum - 1 === 1 ? "/" : `/${currentPageNum - 1}/`;
    const nextPage = `/${currentPageNum + 1}/`;
    const isFirstPage = currentPageNum === 1;
    const isLastPage = currentPageNum === pageCount;
    return (
      <nav aria-label="pagination">
        <ul className="pagination">
        <div className="prev-page-container">
          {!isFirstPage && 
            <li className="pagination-link">
              <Link to={prevPage}><FontAwesomeIcon icon={faChevronLeft} /> 上一頁</Link>
            </li>
          }
        </div>
        <div className="paging-container">
          { this.pagination() }
        </div>
        <div className="next-page-container">
          {!isLastPage && 
            <li className="pagination-link">
              <Link to={nextPage}>下一頁 <FontAwesomeIcon icon={faChevronRight} /></Link>
            </li>
          }
        </div>
        </ul>
      </nav>
    );
  }
}

export default Pagination;