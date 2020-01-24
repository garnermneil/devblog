import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import { graphql } from 'gatsby'
import React from 'react'
import ArticleHeader from '../components/ArticleHeader'
// import Card from '../components/Card'
import Paper from "@material-ui/core/Paper";
import Container from '../components/Container'
import Layout from '../templates/layout'
import FolderIcon from '@material-ui/icons/Folder'
import Link from '@material-ui/core/Link'
import { kebabCase } from 'lodash'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      overflow: "hidden",
      padding: theme.spacing(0, 3)
    },
    paper: {
      maxWidth: 400,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2)
    }
  }));

const TagsPage = ({ data }) => {
    const allTags = data.allMarkdownRemark.group
    const classes = useStyles();

    return (
        <Layout>
            <Container>
                <Paper className={classes.paper}>
                    <ArticleHeader>
                        <h1>Tags</h1>
                    </ArticleHeader>

                    <Grid container direction="row" justify="center" alignItems="center">
                        <List classes="tag-list">
                            {allTags.map(tag => (
                                <Link href={`/tags/${kebabCase(tag.fieldValue)}/`}>
                                    <ListItem key={tag.fieldValue}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FolderIcon />
                                            </Avatar>
                                        </ListItemAvatar>

                                        <ListItemText
                                            primary={`${tag.fieldValue} (${tag.totalCount})`}
                                            disableTypography={true}
                                            classes=''
                                        />
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </Grid>
                </Paper>
            </Container>
        </Layout>
    )
}

export default TagsPage

export const pageQuery = graphql`
    query {
        allMarkdownRemark(limit: 2000) {
            group(field: frontmatter___tags) {
                fieldValue
                totalCount
            }
        }
    }
`
