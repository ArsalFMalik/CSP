const API_URL = import.meta.env.VITE_API_URL;

export type Recipe = {
    _id: string;
    id: string;
    name: string;
    description: string;
    ingredients: string[];
    picture: string;
}

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

export const getRecipes = async (ingredients : string[]) => {

    const response = await fetch(`${API_URL}/recipes`,
        {
            method: 'POST',
            body: JSON.stringify({ ingredients }),
            headers: {
                'Content-Type': 'application/json',
            },
        },

    );

    if (!response.ok) {
        throw new Error('Failed to fetch recipes');
    }
    const data : Recipe[] = await response.json();

    return data;
}