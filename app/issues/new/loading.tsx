import { Box, Button } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";

const LoadingNewIssuesPage = () => {
  return (
    <Box className="max-w-xl">

        <Skeleton  height="2rem" />
        <Skeleton  height="5rem" />


    </Box>
  )
}

export default LoadingNewIssuesPage
