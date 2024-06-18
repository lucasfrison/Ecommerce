export interface Auth {
  id: string;
  email: string;
  password: string;
  profileType: string;
}

export interface NewAuth {
  email: string;
  password: string;
  profileType: string;
}
