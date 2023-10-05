import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'

import testPageResource from '../resources/test-page'

const TestPage = (props) => {
  return (
    <>
      <div className="test-page-container">
        <Head>
          <title>test-page - Future Optimization Agent</title>
          <meta
            property="og:title"
            content="test-page - Future Optimization Agent"
          />
        </Head>
        <DataProvider
          renderSuccess={(context_x94wh) => (
            <>
              <h1>{context_x94wh?.Name}</h1>
            </>
          )}
          initialData={props.contextX94whProp}
          persistDataDuringLoading={true}
          key={props?.contextX94whProp?.id}
        />
      </div>
      <style jsx>
        {`
          .test-page-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

export default TestPage

export async function getStaticProps(context) {
  try {
    const contextX94whProp = await testPageResource({
      ...context?.params,
    })
    return {
      props: {
        contextX94whProp: contextX94whProp?.data?.[0],
      },
    }
  } catch (errro) {
    return {
      notFound: true,
    }
  }
}
