

import { useState, useEffect } from "react";
import axios from 'axios';

// Types (unchanged)
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

// Base API URL
const API_BASE_URL = "http://192.168.29.82:8000/api";

// Create axios instance with common config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/* Custom hook to fetch static data */
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
      const response = await api.get('/static/all/');
      setData(response.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message || "Failed to load options";
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

/* Custom hook to create meals (single or multiple) */
export const useCreateMeal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createMeal = async (mealData: MealFormData[]) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.post('/meals/', mealData);
      setSuccess(true);
      return { success: true, data: response.data };
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message || "Failed to create meal";
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