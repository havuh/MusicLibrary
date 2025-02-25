export interface ILogin {
  email: string; 
  password: string;
}

export interface IUserLogin {
  token: string;
  id: number;
  name: string;
  lastName: string;
  email: string;
}
