import { ProspectInput } from '../types/dossier';

export const generateDossier = async (input: ProspectInput) => {
  // 👇 REPLACE THIS WITH YOUR ACTUAL RENDER URL! 👇
  const API_URL = "https://prospect-dossier-backend.onrender.com/api/generate";

  try {
    const response = await fetch(https://prospect-dossier-backend.onrender.com/api/generate, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`Server responded with a ${response.status} error.`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error talking to the Python Brain:", error);
    throw error;
  }
};