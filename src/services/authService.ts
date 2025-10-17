import type { User } from "../types/user";

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

export const auth = {
  getUsers: (): User[] => {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  register: (userData: Omit<User, "id" | "createdAt">): User | null => {
    const users = auth.getUsers();

    if (users.some((u) => u.username === userData.username)) {
      return null;
    }

    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

    return newUser;
  },

  login: (username: string, password: string): User | null => {
    const users = auth.getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      return user;
    }

    return null;
  },

  update: (updatedUser: Omit<User, "id" | "createdAt">): void => {
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  },

  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },
};
