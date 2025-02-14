export interface Mailer {
  id: string;
  name: string;
}

export interface List {
  id: string;
  name: string;
}

export interface Mailing {
  id: string;
  mailer: Mailer;
  list: List;
  schedule: string;
}

export interface AddMailingData {
  mailer: string;
  list: string;
  schedule: string;
}
