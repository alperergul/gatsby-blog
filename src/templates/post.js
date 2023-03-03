import React from "react";

import Layout from "../components/Layout";
import { Link } from "gatsby";

export default function Post({ pageContext: { post } }) {
  return (
    <Layout>
      <h1>Post detail page</h1>
      <p>Id: {post.id} </p>
      <p>Title: {post.title} </p>
      <p>Body: {post.body} </p>
    </Layout>
  );
}
