import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";

export default function About({ data }) {
  console.log(data.site);
  return (
    <Layout>
      <h1>{data.site.siteMetadata.title} </h1>
    </Layout>
  );
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        body {
          content
        }
      }
    }
  }
`;
