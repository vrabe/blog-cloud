import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import moment from "moment";
import Layout from "../layout";
import UserInfo from "../components/UserInfo/UserInfo";
import Disqus from "../components/Disqus/Disqus";
import PostTags from "../components/PostTags/PostTags";
import SocialLinks from "../components/SocialLinks/SocialLinks";
import SEO from "../components/SEO/SEO";
import Header from "../components/Header/Header";
import config from "../../data/SiteConfig";
import "./prism-base16-atelierforest.light.css";
import "./prism-line-numbers.css";
import "katex/dist/katex.min.css";
import "prismjs/plugins/command-line/prism-command-line.css";

export default class PostTemplate extends React.Component {

  displayPostDate(createdDate, modifiedDate) {
    // Format these dates
    createdDate = moment(createdDate, config.dateFromFormat).format(config.dateFormat);
    modifiedDate = moment(modifiedDate, config.dateFromFormat).format(config.dateFormat);
    // If createdDate and modifiedDate are in the same day, only show one date.
    if(createdDate === modifiedDate)
      return `${createdDate} 發佈`;

    return `${createdDate} 發佈．${modifiedDate} 更新`;
  }

  render() {
    const { data, pageContext } = this.props;
    const { slug } = pageContext;
    const postNode = data.markdownRemark;
    const post = postNode.frontmatter;
    const dateString = this.displayPostDate(post.created, post.updated);
    if (!post.id) {
      post.id = slug;
    }
    return (
      <Layout>
        <div>
          <Helmet>
            <title>{`${post.title} | ${config.siteTitle}`}</title>
          </Helmet>
          <SEO postPath={slug} postNode={postNode} postSEO />
          <Header showBackButton={true}>
            <h1>{post.title}</h1>
            <div className="post-date">
              {dateString}
            </div>
            <PostTags tags={post.tags} />
          </Header>
          <main>
            <div className="container">
              <div className="post-container" dangerouslySetInnerHTML={{ __html: postNode.html }} />
              {/*
              <div className="post-meta">
                <SocialLinks postPath={slug} postNode={postNode} />
              </div>
              <UserInfo config={config} />
              */}
            </div>
          </main>
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        created
        updated
        categories
        tags
      }
      fields {
        slug
        date
      }
    }
  }
`;
