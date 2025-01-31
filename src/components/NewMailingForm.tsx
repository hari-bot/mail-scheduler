"use client";

import { createMailing } from "@/lib/api";
import { getMailers, getLists } from "@/lib/api";
import { useState, useEffect, useRef } from "react";
import type { Mailer, List, Mailing } from "@/lib/types";

export default function NewMailingForm({
  onMailingAdded,
}: {
  onMailingAdded: (newMailing: Mailing) => void;
}) {
  const [mailers, setMailers] = useState<Mailer[]>([]);
  const [lists, setLists] = useState<List[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [mailersData, listsData] = await Promise.all([
        getMailers(),
        getLists(),
      ]);
      setMailers(mailersData);
      setLists(listsData);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const newMailing = await createMailing({
      mailer: formData.get("mailer"),
      list: formData.get("list"),
      schedule: formData.get("schedule"),
    });

    setIsSubmitting(false);
    formRef.current?.reset();
    onMailingAdded(newMailing); // Pass new mailing to parent
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="mailer" className="block mb-1">
          Mailer Template
        </label>
        <select
          name="mailer"
          id="mailer"
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select a mailer</option>
          {mailers.map((mailer) => (
            <option key={mailer.id} value={mailer.id}>
              {mailer.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="list" className="block mb-1">
          Mailing List
        </label>
        <select
          name="list"
          id="list"
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select a list</option>
          {lists.map((list) => (
            <option key={list.id} value={list.id}>
              {list.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="schedule" className="block mb-1">
          Schedule Date and Time
        </label>
        <input
          type="datetime-local"
          name="schedule"
          id="schedule"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isSubmitting ? "Scheduling..." : "Schedule Mailing"}
      </button>
    </form>
  );
}
