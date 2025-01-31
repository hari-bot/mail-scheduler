"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import MailingItem from "./MailingItem";

export default function MailingList() {
  const {
    items: mailings,
    status,
    error,
  } = useSelector((state: RootState) => state.mailings);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <ul className="space-y-4 mt-4">
        {mailings.map((mailing) => (
          <MailingItem key={mailing.id} mailing={mailing} />
        ))}
      </ul>
    </div>
  );
}
