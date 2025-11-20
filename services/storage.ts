import { ReturnItem, User } from '../types';

const USERS_KEY = 'return_os_users';
const DATA_PREFIX = 'return_os_data_';

// --- USER AUTH MANAGEMENT ---

export const getUsers = (): User[] => {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const updateUserProfile = (updatedUser: User): void => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === updatedUser.id);
  if (index !== -1) {
    users[index] = updatedUser;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
};

// --- ITEM MANAGEMENT ---

const getDataKey = (userId: string) => `${DATA_PREFIX}${userId}`;

export const getUserItems = (userId: string): ReturnItem[] => {
  const data = localStorage.getItem(getDataKey(userId));
  return data ? JSON.parse(data) : [];
};

const saveUserItems = (userId: string, items: ReturnItem[]): void => {
  localStorage.setItem(getDataKey(userId), JSON.stringify(items));
};

export const addItem = (userId: string, item: ReturnItem): void => {
  const items = getUserItems(userId);
  items.push(item);
  saveUserItems(userId, items);
};

export const updateItem = (userId: string, updatedItem: ReturnItem): void => {
  const items = getUserItems(userId);
  const index = items.findIndex(i => i.id === updatedItem.id);
  if (index !== -1) {
    items[index] = updatedItem;
    saveUserItems(userId, items);
  }
};

// Soft delete
export const deleteItem = (userId: string, itemId: string): void => {
  const items = getUserItems(userId);
  const index = items.findIndex(i => i.id === itemId);
  if (index !== -1) {
    items[index].isDeleted = true;
    items[index].deletedAt = new Date().toISOString();
    saveUserItems(userId, items);
  }
};

export const restoreItem = (userId: string, itemId: string): void => {
  const items = getUserItems(userId);
  const index = items.findIndex(i => i.id === itemId);
  if (index !== -1) {
    items[index].isDeleted = false;
    items[index].deletedAt = undefined;
    saveUserItems(userId, items);
  }
};

export const hardDeleteItem = (userId: string, itemId: string): void => {
  let items = getUserItems(userId);
  items = items.filter(i => i.id !== itemId);
  saveUserItems(userId, items);
};

export const restoreAll = (userId: string): void => {
  const items = getUserItems(userId);
  items.forEach(i => {
    if (i.isDeleted) {
      i.isDeleted = false;
      i.deletedAt = undefined;
    }
  });
  saveUserItems(userId, items);
};

export const emptyTrash = (userId: string): void => {
  let items = getUserItems(userId);
  items = items.filter(i => !i.isDeleted);
  saveUserItems(userId, items);
};
