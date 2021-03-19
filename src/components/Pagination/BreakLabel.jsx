import React from "react";
import { Link } from "gatsby";

class BreakLabel extends React.Component {
  render() {
    return(
      <li className="pagination-break-label">
        <span>
          {"..."}
        </span>
      </li>
    );
  }
}

export default BreakLabel;