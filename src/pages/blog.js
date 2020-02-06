import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../templates/layout'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Link from '@material-ui/core/Link'
import { kebabCase } from 'lodash'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        // backgroundColor: `#0D1F35`,
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        height: `100%`
    },
    blogItemPaper: {
        maxWidth: `90%`,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
        // backgroundColor: `#1D3456`
    },
    blogItemText: {
        // color: `#8C8131`
    }
}))

const BlogPage = ({ data }) => {
    const posts = data.allMarkdownRemark.edges
    const allTags = data.allMarkdownRemark.group
    const classes = useStyles()

    return (
        <Layout>
            <Container fixed>
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={8} lg={8}>
                            <Paper className={classes.paper}>
                                {posts.map(post => (
                                    <Paper className={[classes.blogItemPaper, classes.blogItemText]}>
                                        <Grid container wrap='nowrap' spacing={2}>
                                            <Grid item>
                                                <Avatar>W</Avatar>
                                            </Grid>
                                            <Grid item xs>
                                                <Typography>{post.node.frontmatter.title}</Typography>
                                            </Grid>

                                            <Link href={post.node.fields.slug}>
                                                <p>Read more</p>
                                            </Link>
                                        </Grid>
                                    </Paper>
                                ))}
                            </Paper>
                        </Grid>

                        {/* Tags */}
                        <Grid item xs>
                            <Paper className={classes.paper}>
                                <List component='nav' className={classes.root} aria-label='tags'>
                                    {allTags.map(tag => (
                                        <Link href={`/tags/${kebabCase(tag.fieldValue)}/`}>
                                            <ListItem
                                                button
                                                className={[classes.blogItemPaper, classes.blogItemText]}
                                                key={tag.fieldValue}
                                            >
                                                <ListItemIcon>
                                                    <Avatar className={classes.square}>J</Avatar>
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={`${tag.fieldValue} (${tag.totalCount})`}
                                                    className={classes.blogItemText}
                                                />
                                            </ListItem>
                                        </Link>
                                    ))}
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </Layout>

        // <Layout>
        //   <div className="post-list">
        //     {posts.map(post => (
        //       <div
        //         key={post.node.id}
        //         className="post-list__item"
        //         style={{ border: "1px solid blue" }}
        //       >
        //         <Link to={post.node.fields.slug}>
        //           <Img
        //             fixed={post.node.frontmatter.thumbnail.childImageSharp.fixed}
        //           />
        //         </Link>
        //         <h2>{post.node.frontmatter.title}</h2>
        //         {post.node.frontmatter.tags ? (
        //           <div className="tags-container">
        //             <ul className="taglist">
        //               {post.node.frontmatter.tags.map(tag => (
        //                 <li key={tag + `tag`}>
        //                   <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
        //                 </li>
        //               ))}
        //             </ul>
        //           </div>
        //         ) : null}
        //         <p>{post.node.frontmatter.date}</p>
        //         <div className="post-list__excerpt">
        //           <p>{post.node.excerpt}></p>
        //         </div>
        //         <Link to={post.node.fields.slug}>Read More</Link>
        //       </div>
        //     ))}
        //   </div>
        // </Layout>
    )
}

export default BlogPage

// Get all markdown data, in descending order by date, and grab the id, excerpt, slug, date, and title
export const pageQuery = graphql`
    query {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
            edges {
                node {
                    id
                    excerpt(pruneLength: 250)
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        title
                        tags
                        # thumbnail {
                        #   childImageSharp {
                        #     fixed(width: 50, height: 50) {
                        #       ...GatsbyImageSharpFixed
                        #     }
                        #   }
                        # }
                    }
                }
            }
            group(field: frontmatter___tags) {
                fieldValue
                totalCount
            }
        }
    }
`
