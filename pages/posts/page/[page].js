import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'
import PropTypes from 'prop-types'

import postsPageInitialPaths8ad38Resource from '../../../resources/posts-page-initial-paths-8ad38'
import postsPageInitialProps77002Resource from '../../../resources/posts-page-initial-props-77002'

const Posts11 = (props) => {
  return (
    <>
      <div className="posts11-container">
        <Head>
          <title>Posts1 - Future Optimization Agent</title>
          <meta
            property="og:title"
            content="Posts1 - Future Optimization Agent"
          />
        </Head>
        <DataProvider
          renderSuccess={(params) => (
            <>
              <Repeater
                items={params}
                renderItem={(PostsEntities) => (
                  <>
                    <div className="posts11-container1">
                      <h1>{PostsEntities?.Title}</h1>
                      <span>{PostsEntities?.Title}</span>
                      <span>{PostsEntities?.Preview}</span>
                    </div>
                  </>
                )}
              />
            </>
          )}
          initialData={props.postsEntities}
          persistDataDuringLoading={true}
          key={props?.pagination?.page}
        />
      </div>
      <style jsx>
        {`
          .posts11-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .posts11-container1 {
            gap: 12px;
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

Posts11.defaultProps = {
  postsEntities: [],
}

Posts11.propTypes = {
  postsEntities: PropTypes.array,
}

export default Posts11

export async function getStaticPaths() {
  try {
    const response = await postsPageInitialPaths8ad38Resource({})
    const totalCount = response?.meta?.pagination?.total
    const pagesCount = Math.ceil(totalCount / 10)
    return {
      paths: Array.from(
        {
          length: pagesCount,
        },
        (_, i) => ({
          params: {
            page: (i + 1).toString(),
          },
        })
      ),
      fallback: 'blocking',
    }
  } catch (error) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
}

export async function getStaticProps(context) {
  try {
    const response = await postsPageInitialProps77002Resource({
      ...context?.params,
      start: (context.params.page - 1) * 10,
    })
    if (!response) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        postsEntities: response,
        ...response?.meta,
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
