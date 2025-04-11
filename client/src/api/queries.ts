const API_URL = import.meta.env.VITE_API_URL;

export const getIngredients = async () => {
    const response = await fetch(`${API_URL}/ingredients`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    if (!response.ok) {
        throw new Error('Failed to fetch ingredients');
    }
    return response.json();
}