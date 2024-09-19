import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
    params: {id:string}
}

const IssueDetailPage = async ({params} : Props) => {
    const issue = await prisma.issue.findUnique({where: {id: parseInt(params.id)}})
    // if(typeof parseInt(params.id) !== 'number') notFound()
    if(!issue)
      notFound()
  return (
    <div>
      <p>{issue?.title ?? 'Issue not found'}</p>
      <p>Description: {issue?.description}</p>
      <p>Status: {issue?.status}</p>
      <p>Created at: {issue?.createdAt.toDateString()}</p>
    </div>
  )
}

export default IssueDetailPage
