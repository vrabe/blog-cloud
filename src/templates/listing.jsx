import React from "react";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing/PostListing";
import SEO from "../components/SEO/SEO";
import Header from "../components/Header/Header";
import Pagination from "../components/Pagination/Pagination";
import config from "../../data/SiteConfig";

class Listing extends React.Component {

  render() {
    const { currentPageNum, pageCount } = this.props.pageContext;
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const isFirstPage = this.props.pageContext.currentPageNum === 1;

    return (
      <Layout>
        <Helmet title={config.siteTitle} />
        <SEO />
        <Header showBackButton={isFirstPage ? false : true}>
          <h1>{config.siteTitle}</h1>
        </Header>
        <main>
          <div className="container">
            <PostListing postEdges={postEdges} />
            {pageCount > 1 &&
              <Pagination currentPageNum={currentPageNum} pageCount={pageCount} />
            }
          </div>
        </main>
      </Layout>
    );
  }
}

export default Listing;

/* eslint no-undef: "off" */
export const listingQuery = graphql`
  query ListingQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            created
            updated
          }
        }
      }
    }
  }
`;
