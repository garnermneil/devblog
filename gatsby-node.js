const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const createPaginatedPages = require('gatsby-paginate')
const userConfig = require('./config')
const tagTemplate = path.resolve(`src/templates/tagTemplate.js`);

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions

    return new Promise((resolve, reject) => {
        const blogPost = path.resolve('./src/templates/blog-post.js')
        resolve(
            graphql(
                `
                    {
                        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
                            edges {
                                node {
                                    fields {
                                        slug
                                    }
                                    excerpt
                                    frontmatter {
                                        title
                                        date(formatString: "MMMM D, YYYY")
                                        tags
                                        featuredImage {
                                            childImageSharp {
                                                sizes(maxWidth: 850) {
                                                    base64
                                                    aspectRatio
                                                    src
                                                    srcSet
                                                    sizes
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                `
            ).then(result => {
                if (result.errors) {
                    console.log(result.errors)
                    reject(result.errors)
                }

                // Create blog posts pages.
                const posts = result.data.allMarkdownRemark.edges
                let tags = []

                _.each(posts, (post, index) => {
                    const previous = index === posts.length - 1 ? null : posts[index + 1].node
                    const next = index === 0 ? null : posts[index - 1].node

                    createPaginatedPages({
                        edges: result.data.allMarkdownRemark.edges,
                        createPage: createPage,
                        pageTemplate: 'src/templates/index.js',
                        pageLength: userConfig.postsPerPage
                    })

                    tags = tags.concat(post.node.frontmatter.tags)

                    createPage({
                        path: post.node.fields.slug,
                        component: blogPost,
                        context: {
                            slug: post.node.fields.slug,
                            previous,
                            next
                        }
                    })
                })

                tags = _.uniq(tags)

                // Make tag pages
                tags.forEach(tag => {
                    createPage({
                        path: `/tags/${_.kebabCase(tag)}/`,
                        component: tagTemplate,
                        context: {
                            tag
                        }
                    })
                })
            })
        )
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode })
        createNodeField({
            name: `slug`,
            node,
            value
        })
    }
}
