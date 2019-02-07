import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

import 'prismjs/themes/prism-okaidia.css'

export default function Post({ data }) {
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </Layout>
  )
}

export const postQuery = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug }}) {
      html
    }
  }
`
