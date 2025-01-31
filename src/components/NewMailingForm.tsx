"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { addMailing } from "@/lib/slices/mailingsSlice";
import { fetchMailers } from "@/lib/slices/mailersSlice";
import { fetchLists } from "@/lib/slices/listsSlice";
import { useState, useEffect, useRef } from "react";

export default function NewMailingForm() {
  const dispatch = useDispatch<AppDispatch>();
  const mailers = useSelector((state: RootState) => state.mailers.items);
  const lists = useSelector((state: RootState) => state.lists.items);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    dispatch(fetchMailers());
    dispatch(fetchLists());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    try {
      await dispatch(
        addMailing({
          mailer: formData.get("mailer") as string,
          list: formData.get("list") as string,
          schedule: formData.get("schedule") as string,
        })
      ).unwrap();
      formRef.current?.reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
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
