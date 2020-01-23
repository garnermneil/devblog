import React from 'react'
import { Link, graphql } from 'gatsby'
import { kebabCase } from 'lodash'
import Layout from '../templates/layout'
import Container from '../components/Container'
import Card from '../components/Card'
import ArticleHeader from '../components/ArticleHeader'

const TagsPage = ({ data }) => {
    const allTags = data.allMarkdownRemark.group

    return (
        <Layout>
            <Container>
                <Card>
                    <ArticleHeader>
                        <h1>Tags</h1>
                    </ArticleHeader>
                    <ul>
                        {allTags.map(tag => (
                            <li key={tag.fieldValue}>
                                <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                                    {tag.fieldValue} ({tag.totalCount})
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Card>
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
