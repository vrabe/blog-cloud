import React, { Component } from "react";
import _ from "lodash";
import { Link } from "gatsby";
import "./PostTags.scss";

class PostTags extends Component {
  render() {
    const { tags } = this.props;
    return (
      <ul className="post-tags">
        {tags &&
          tags.map(tag => (
            <Link
              key={tag}
              style={{ textDecoration: "none" }}
              to={`/tags/${_.kebabCase(tag)}`}
            >
              <li>{tag}</li>
            </Link>
          ))}
      </ul>
    );
  }
}

export default PostTags;
