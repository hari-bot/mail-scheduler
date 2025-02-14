"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { removeMailing } from "@/lib/slices/mailingsSlice";
import type { Mailing } from "@/lib/types";
import { useState } from "react";

export default function MailingItem({ mailing }: { mailing: Mailing }) {
  const dispatch = useDispatch<AppDispatch>();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await dispatch(removeMailing(mailing.id)).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

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
  );
}
