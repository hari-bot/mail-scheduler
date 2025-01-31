import type { Mailing, Mailer, List } from "./types";

// Mock data
const mailers: Mailer[] = [
  { id: "1", name: "Welcome Email" },
  { id: "2", name: "Newsletter" },
  { id: "3", name: "Promotional Offer" },
];

const lists: List[] = [
  { id: "1", name: "New Subscribers" },
  { id: "2", name: "Active Users" },
  { id: "3", name: "VIP Customers" },
];

let mailings: Mailing[] = [
  {
    id: "1",
    mailer: mailers[0],
    list: lists[0],
    schedule: new Date("2023-06-01T10:00:00").toISOString(),
  },
  {
    id: "2",
    mailer: mailers[1],
    list: lists[1],
    schedule: new Date("2023-06-15T14:30:00").toISOString(),
  },
];

// API functions
export async function getMailings(): Promise<Mailing[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mailings), 500);
  });
}

export async function getMailers(): Promise<Mailer[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mailers), 500);
  });
}

export async function getLists(): Promise<List[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(lists), 500);
  });
}

export async function createMailing(data: any): Promise<Mailing> {
  const newMailing: Mailing = {
    id: String(mailings.length + 1),
    mailer: mailers.find((m) => m.id === data.mailer)!,
    list: lists.find((l) => l.id === data.list)!,
    schedule: new Date(data.schedule).toISOString(),
  };
  mailings.push(newMailing);
  console.log(mailings);
  return new Promise((resolve) => {
    setTimeout(() => resolve(newMailing), 500);
  });
}

export async function deleteMailing(id: string): Promise<void> {
  mailings = mailings.filter((m) => m.id !== id);
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 500);
  });
}
