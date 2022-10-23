export interface RegisterInput {
  registerInput: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}

export interface loginInput {
  loginInput: {
    email: string;
    password: string;
  };
}

export interface UserData {
  id: string;
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}
