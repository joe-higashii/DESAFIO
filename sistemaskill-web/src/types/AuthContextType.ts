interface AuthContextType {
    user: any;
    token: string | null;
    login: (username: string, password: string) => void;
    logout: () => void;
  }