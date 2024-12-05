declare namespace Express {
    interface Request {
      user: {
        id: string;
        role: string;
      };
      body: Record<string, unknown>;
    }
  }