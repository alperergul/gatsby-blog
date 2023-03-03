const axios = require("axios");

exports.createPages = async ({ actions: { createPage } }) => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  const posts = res.data;

  posts.forEach((post) => {
    createPage({
      path: `/posts/${post.id}`,
      component: require.resolve("./src/templates/post.js"),
      context: { post },
    });
  });

  createPage({
    path: "/posts",
    component: require.resolve("./src/templates/posts.js"),
    context: { posts },
  });
};

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  const posts = res.data;

  posts.forEach((post) => {
    const node = {
      title: post.title,
      body: post.body,
      // The node ID must be globally unique
      id: createNodeId(`Post-${post.id}`),
      // id: `Post-${post.id}`,
      // ID to the parent Node
      parent: null,
      // ID to the children Nodes
      children: [],
      // internal fields are not usualy interesting for consumers
      // but are very important for Gatsby Core
      internal: {
        // globbaly unique node type
        type: "Post",
        // "Hash" or short digital summary of this node
        contentDigest: createContentDigest(post),
        // content exposing raw content of this node
        content: JSON.stringify(post),
      },
    };

    actions.createNode(node);
  });
};

// ************************************************
// ************************************************
// ************************************************
// ********* CREATE SCHEMA AND TEST DATA***********
// ************************************************
// ************************************************
// ************************************************

// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions;
//   const typeDefs = `

//     type PostJson {
//       id: ID,
//       title: String
//       body: String!
//     }

//     input TitleFilter {
//       eq: String
//       in: String

//     }

//   `;

//   createTypes(typeDefs);
// };

// exports.createResolvers = ({ createResolvers }) => {
//   const resolvers = {
//     Query: {
//       allPosts: {
//         type: ["PostJson"],
//         args: {
//           filter: `input PostFilterInput { title: TitleFilter } `,
//           limit: "Int",
//         },
//         async resolve(source, { filter }, context, info) {
//           const { title } = filter || {};
//           const { eq } = title || {};

//           const res = await axios.get(
//             "https://jsonplaceholder.typicode.com/posts"
//           );

//           const posts = res.data;

//           if (eq) {
//             return posts.filter((post) => post.title === eq);
//           }

//           return posts;
//         },
//       },
//     },
//   };

//   createResolvers(resolvers);
// };
