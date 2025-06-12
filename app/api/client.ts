const API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('EXPO_PUBLIC_API_URL environment variable is not set');
}

export const apiClient = {
  async getPgVersion() {
    const response = await fetch(`${API_URL}/api/version`);
    if (!response.ok) {
      throw new Error('Failed to fetch PostgreSQL version');
    }
    return response.json();
  },

  // Add more API methods here as needed
  async createUser(userData: {
    name: string;
    email: string;
    password: string;
  }) {
    const response = await fetch(`${API_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    return response.json();
  },
};
