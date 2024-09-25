import { Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from "@/app/components/Skeleton";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
        <Skeleton  height="2.5rem" />
        <Skeleton  height="5rem" />
    </Box>
  )
}

export default IssueFormSkeleton
