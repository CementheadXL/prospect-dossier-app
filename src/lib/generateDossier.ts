import { ProspectInput } from '../types/dossier';

export const generateDossier = async (input: ProspectInput) => {
  // 👇 This variable holds your string perfectly 👇
  const API_URL = "https://prospect-dossier-backend.onrender.com/api/generate";

  try {
    // 👇 We just pass the variable here instead of the raw URL! 👇
    const response = await fetch(API_URL, {
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
};import { ProspectInput } from '../types/dossier';

export const generateDossier = async (input: ProspectInput) => {
  // 👇 This variable holds your string perfectly 👇
  const API_URL = "https://prospect-dossier-backend.onrender.com/api/generate";

  try {
    // 👇 We just pass the variable here instead of the raw URL! 👇
    const response = await fetch(API_URL, {
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
