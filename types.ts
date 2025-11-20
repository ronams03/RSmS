export interface User {
  id: string;
  email: string;
  password: string; // In a real app, this would be hashed. Storing plain for demo local storage logic.
  name: string;
}

export interface ReturnItem {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string; // ISO String
  isDeleted: boolean;
  deletedAt?: string;
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  TRASH = 'TRASH',
  PROFILE = 'PROFILE',
  ABOUT = 'ABOUT'
}
