"use client";

import { useEffect, useState } from "react";
import { getMailings } from "@/lib/api";
import MailingItem from "./MailingItem";
import type { Mailing } from "@/lib/types";

export default function MailingList() {
  const [mailings, setMailings] = useState<Mailing[]>([]);

  useEffect(() => {
    fetchMailings();
  }, []);

  const fetchMailings = async () => {
    const mailingsData = await getMailings();
    setMailings(mailingsData);
  };

  const handleMailingDeleted = (id: string) => {
    setMailings((prevMailings) => prevMailings.filter((m) => m.id !== id));
  };

  return (
    <div>
      <ul className="space-y-4 mt-4">
        {mailings.map((mailing) => (
          <MailingItem
            key={mailing.id}
            mailing={mailing}
            onMailingDeleted={() => handleMailingDeleted(mailing.id)}
          />
        ))}
      </ul>
    </div>
  );
}
