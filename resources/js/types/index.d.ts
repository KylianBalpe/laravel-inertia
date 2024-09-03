export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  email_verified_at?: string;
}

export interface Todo {
  id: number;
  content: string;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: User;
  };
  flash: {
    success: string | null;
    error: string | null;
  };
};
