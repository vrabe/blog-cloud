import React from "react";
import ReactDOM from 'react-dom';
import { Link } from "gatsby";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import config from "../../../data/SiteConfig";

class PostListing extends React.Component {
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach(postEdge => {
      postList.push({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.fields.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead
      });
    });
    return postList;
  }

  render() {
    const postList = this.getPostList();
    return (
      <ul className="posts">
        {/* Your post list here. */
        postList.map(post => (
          <li key={post.title}>
            <div className="post-meta">
              <Link to={post.path} className="post-link">
                <h3 className="post-title">{post.title}</h3>
              </Link>
              <div className="post-date">
                <FontAwesomeIcon icon={faCalendar} />
                {moment(post.date, moment.ISO_8601).local().format(config.dateFormat)}
              </div>
            </div>
            { config.showExcerpts &&
              <div className="post">
                <p>{post.excerpt}</p>
              </div>
            }
          </li>
        ))
      }
      </ul>
    );
  }
}

export default PostListing;
