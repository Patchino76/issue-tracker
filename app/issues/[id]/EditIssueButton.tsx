import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const EditIssueButton = ({issueId} : {issueId : number}) => {
  console.log(issueId)
  return (
    <Button className="w-full">
    <Pencil2Icon />
    <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
  </Button>
  )
}

export default EditIssueButton
