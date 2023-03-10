import React from "react";
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";

export default function Seo({ title, image, description, meta = [] }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );

  const defaultTitle = title
    ? `${title} | ${site.siteMetadata?.title}`
    : `${site.siteMetadata?.title}`;
  const defaultDescription = description || site.siteMetadata?.description;
  const defaultImage = image || "https://thrangra.sirv.com/VueReactAng.jpeg";

  return (
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title={defaultTitle}
      meta={[
        {
          name: "description",
          content: defaultDescription,
        },
        {
          name: "og:title",
          content: defaultTitle,
        },
        {
          name: "og:description",
          content: defaultDescription,
        },
        {
          name: "og:type",
          content: "website",
        },
        {
          name: "og:image",
          content: defaultImage,
        },
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:creator",
          content: "Code Space",
        },
        {
          name: "twitter:title",
          content: defaultTitle,
        },
        {
          name: "twitter:descriptşon",
          content: defaultDescription,
        },
        {
          name: "twitter:image",
          content: defaultImage,
        },
      ].concat(meta)}
    />
  );
}
