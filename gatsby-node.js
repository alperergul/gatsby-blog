exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `);

  const { nodes } = result.data.allMarkdownRemark;
  const itemsPerPage = 3;
  const numOfPage = Math.ceil(nodes.length / itemsPerPage);

  Array.from({ length: numOfPage }).forEach((_, i) => {
    const page = i + 1;

    createPage({
      path: page === 1 ? `/blogs` : `/blogs/${page}`,
      component: require.resolve("./src/templates/blogsPaginated.js"),
      context: {
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        currentPage: page,
        numOfPage,
      },
    });
  });

  nodes.forEach((node) => {
    createPage({
      path: `/blogs/${node.frontmatter.slug}`,
      component: require.resolve("./src/templates/blog.js"),
      context: {
        slug: node.frontmatter.slug,
      },
    });
  });
};
