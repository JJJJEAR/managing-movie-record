import React from 'react';
import { useHistory } from 'react-router-dom';

export default function LocateLogin() {
  const history = useHistory();

  const handleLogin = async (formData) => {
    try {
      const response = await fetch('/api/db/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        history.push('/MovieLogin');
      } else {
        console.error('Login failed:', result.error);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
 
  );
}