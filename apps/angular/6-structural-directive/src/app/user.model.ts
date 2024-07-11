export type Role = 'ADMIN' | 'MANAGER' | 'WRITER' | 'READER' | 'CLIENT';

export interface User {
  name: string;
  roles: Role[];
}

export const admin: User = {
  name: 'admin',
  roles: ['ADMIN', 'MANAGER', 'WRITER', 'READER', 'CLIENT'],
};

export const manager: User = {
  name: 'manager',
  roles: ['MANAGER'],
};

export const writer: User = {
  name: 'writer',
  roles: ['WRITER'],
};

export const reader: User = {
  name: 'reader',
  roles: ['READER'],
};

export const readerAndWriter: User = {
  name: 'readerAndWriter',
  roles: ['READER', 'WRITER'],
};

export const client: User = {
  name: 'client',
  roles: ['CLIENT'],
};

export const everyone: User = {
  name: 'everyone',
  roles: [],
};
