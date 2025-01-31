import { getMailings } from "@/lib/api"
import MailingItem from "./MailingItem"

export default async function MailingList() {
  const mailings = await getMailings()

  return (
    <ul className="space-y-4">
      {mailings.map((mailing) => (
        <MailingItem key={mailing.id} mailing={mailing} />
      ))}
    </ul>
  )
}

