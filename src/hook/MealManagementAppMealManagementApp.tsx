import { useState, useEffect } from "react";

// Types
interface StaticData {
  cuisines: Array<{ id: number; name: string }>;
  dietary_preferences: Array<{ id: number; name: string }>;
  health_goals: Array<{ id: number; name: string; description: string }>;
}

interface Instruction {
  step_number: number;
  instruction_text: string;
}

interface Ingredient {
  category: string;
  ingredient_name: string;
  quantity: string;
  notes: string;
}

interface Nutrition {
  nutrient_name: string;
  unit: string;
  value: number;
}

interface Image {
  url: string;
  description: string;
}

interface MealFormData {
  name: string;
  description: string;
  cuisine_id: number;
  dietary_preference_id: number;
  health_goal_id: number;
  instructions: Instruction[];
  ingredients: Ingredient[];
  nutrition: Nutrition[];
  images: Image[];
}

// Base API URL - can be configured
const API_BASE_URL = "http://192.168.29.82:8000/api";

/**
 * Custom hook to fetch static data (cuisines, dietary preferences, health goals)
 */
export const useStaticData = () => {
  const [data, setData] = useState<StaticData>({
    cuisines: [],
    dietary_preferences: [],
    health_goals: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStaticData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/static/all/`, {
        headers: {
          accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load options";
      setError(errorMessage);
      console.error("Static data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaticData();
  }, []);

  return { data, loading, error, refetch: fetchStaticData };
};

/**
 * Custom hook to create a new meal
 */
export const useCreateMeal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createMeal = async (mealData: MealFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${API_BASE_URL}/meals/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(mealData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      setSuccess(true);
      return { success: true, data: result };
    } catch (err: any) {
      const errorMessage = err.message || "Failed to create meal";
      setError(errorMessage);
      console.error("Create meal error:", err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const resetStatus = () => {
    setSuccess(false);
    setError(null);
  };

  return { createMeal, loading, error, success, resetStatus };
};

export default {
  useStaticData,
  useCreateMeal,
};
