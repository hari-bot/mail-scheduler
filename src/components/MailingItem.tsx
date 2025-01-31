"use client"

import { deleteMailing } from "@/lib/actions"
import type { Mailing } from "@/lib/types"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function MailingItem({ mailing }: { mailing: Mailing }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    await deleteMailing(mailing.id)
    setIsDeleting(false)
    router.refresh()
  }

  return (
    <li className="bg-white shadow rounded-lg p-4">
      <h3 className="font-semibold">{mailing.mailer.name}</h3>
      <p>List: {mailing.list.name}</p>
      <p>Scheduled for: {new Date(mailing.schedule).toLocaleString()}</p>
      <div className="mt-2">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </li>
  )
}

