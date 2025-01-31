"use server"

import { createMailing as apiCreateMailing, deleteMailing as apiDeleteMailing } from "./api"

export async function createMailing(formData: FormData) {
  const mailer = formData.get("mailer")
  const list = formData.get("list")
  const schedule = formData.get("schedule")

  if (!mailer || !list || !schedule) {
    throw new Error("Missing required fields")
  }

  return apiCreateMailing({ mailer, list, schedule })
}

export async function deleteMailing(id: string) {
  return apiDeleteMailing(id)
}

