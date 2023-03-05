import { graphql, Link } from "gatsby";
import React from "react";
import BlogListing from "../components/BlogListing";
import Layout from "../components/Layout";

export default function BlogsPaginated({ pageContext, data }) {
  const { currentPage, numOfPage } = pageContext;
  const { nodes } = data.allMarkdownRemark;

  const isFirst = currentPage === 1;
  const isLast = currentPage === numOfPage;

  const prevPage = currentPage - 1 === 1 ? "" : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();

  return (
    <Layout>
      <BlogListing blogs={nodes} />
      <Link
        className="button is-small"
        disabled={isFirst}
        to={`/blogs/${prevPage}`}
        rel="prev"
      >
        Previous
      </Link>{" "}
      <Link
        className="button is-small"
        disabled={isLast}
        to={`/blogs/${nextPage}`}
        rel="next"
      >
        Next
      </Link>
    </Layout>
  );
}

export const query = graphql`
  query BlogListingQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___date }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        id
        frontmatter {
          subtitle
          title
          slug
          date(formatString: "DD MMMM, YYYY")
          author
        }
      }
    }
  }
`;
