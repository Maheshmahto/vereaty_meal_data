

import React, { useState } from 'react';
import { Plus, CheckCircle, AlertCircle, X, Upload, Download } from 'lucide-react';
import { useStaticData, useCreateMeal } from '../hook/MealManagementAppMealManagementApp';

// Types
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

// Main Component
const MealManagementApp: React.FC = () => {
  const { data: staticData, loading: staticLoading } = useStaticData();
  const { createMeal, loading: submitting, error, success, resetStatus } = useCreateMeal();

  const [activeTab, setActiveTab] = useState<'single' | 'multiple' | 'excel'>('single');
  const [excelFile, setExcelFile] = useState<File | null>(null);
  
  // Single meal form data
  const [singleMealData, setSingleMealData] = useState<MealFormData>({
    name: '',
    description: '',
    cuisine_id: 0,
    dietary_preference_id: 0,
    health_goal_id: 0,
    instructions: [{ step_number: 1, instruction_text: '' }],
    ingredients: [{ category: '', ingredient_name: '', quantity: '', notes: '' }],
    nutrition: [{ nutrient_name: '', unit: '', value: 0 }],
    images: [{ url: '', description: '' }]
  });

  // Multiple meals form data
  const [multipleMealsData, setMultipleMealsData] = useState<MealFormData[]>([
    {
      name: '',
      description: '',
      cuisine_id: 0,
      dietary_preference_id: 0,
      health_goal_id: 0,
      instructions: [{ step_number: 1, instruction_text: '' }],
      ingredients: [{ category: '', ingredient_name: '', quantity: '', notes: '' }],
      nutrition: [{ nutrient_name: '', unit: '', value: 0 }],
      images: [{ url: '', description: '' }]
    }
  ]);

  // Single meal handlers
  const handleSingleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSingleMealData(prev => ({
      ...prev,
      [name]: name.includes('_id') ? parseInt(value) || 0 : value
    }));
  };

  // Single meal array handlers (instructions, ingredients, nutrition, images)
  const addSingleInstruction = () => {
    setSingleMealData(prev => ({
      ...prev,
      instructions: [...prev.instructions, { step_number: prev.instructions.length + 1, instruction_text: '' }]
    }));
  };

  const updateSingleInstruction = (index: number, text: string) => {
    setSingleMealData(prev => ({
      ...prev,
      instructions: prev.instructions.map((inst, i) => 
        i === index ? { ...inst, instruction_text: text } : inst
      )
    }));
  };

  const removeSingleInstruction = (index: number) => {
    if (singleMealData.instructions.length > 1) {
      setSingleMealData(prev => ({
        ...prev,
        instructions: prev.instructions.filter((_, i) => i !== index).map((inst, i) => ({
          ...inst,
          step_number: i + 1
        }))
      }));
    }
  };

  const addSingleIngredient = () => {
    setSingleMealData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { category: '', ingredient_name: '', quantity: '', notes: '' }]
    }));
  };

  const updateSingleIngredient = (index: number, field: keyof Ingredient, value: string) => {
    setSingleMealData(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) => 
        i === index ? { ...ing, [field]: value } : ing
      )
    }));
  };

  const removeSingleIngredient = (index: number) => {
    if (singleMealData.ingredients.length > 1) {
      setSingleMealData(prev => ({
        ...prev,
        ingredients: prev.ingredients.filter((_, i) => i !== index)
      }));
    }
  };

  const addSingleNutrition = () => {
    setSingleMealData(prev => ({
      ...prev,
      nutrition: [...prev.nutrition, { nutrient_name: '', unit: '', value: 0 }]
    }));
  };

  const updateSingleNutrition = (index: number, field: keyof Nutrition, value: string | number) => {
    setSingleMealData(prev => ({
      ...prev,
      nutrition: prev.nutrition.map((nutr, i) => 
        i === index ? { ...nutr, [field]: field === 'value' ? parseFloat(value as string) || 0 : value } : nutr
      )
    }));
  };

  const removeSingleNutrition = (index: number) => {
    if (singleMealData.nutrition.length > 1) {
      setSingleMealData(prev => ({
        ...prev,
        nutrition: prev.nutrition.filter((_, i) => i !== index)
      }));
    }
  };

  const addSingleImage = () => {
    setSingleMealData(prev => ({
      ...prev,
      images: [...prev.images, { url: '', description: '' }]
    }));
  };

  const updateSingleImage = (index: number, field: keyof Image, value: string) => {
    setSingleMealData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => 
        i === index ? { ...img, [field]: value } : img
      )
    }));
  };

  const removeSingleImage = (index: number) => {
    if (singleMealData.images.length > 1) {
      setSingleMealData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    }
  };

  // Multiple meals handlers
  const handleMultipleInputChange = (mealIndex: number, field: string, value: any) => {
    setMultipleMealsData(prev => 
      prev.map((meal, index) => 
        index === mealIndex ? { ...meal, [field]: value } : meal
      )
    );
  };

  // Multiple meals array handlers
  const addMultipleInstruction = (mealIndex: number) => {
    setMultipleMealsData(prev => 
      prev.map((meal, index) => 
        index === mealIndex 
          ? {
              ...meal,
              instructions: [...meal.instructions, { step_number: meal.instructions.length + 1, instruction_text: '' }]
            }
          : meal
      )
    );
  };

  const updateMultipleInstruction = (mealIndex: number, instructionIndex: number, text: string) => {
    setMultipleMealsData(prev => 
      prev.map((meal, index) => 
        index === mealIndex 
          ? {
              ...meal,
              instructions: meal.instructions.map((inst, i) => 
                i === instructionIndex ? { ...inst, instruction_text: text } : inst
              )
            }
          : meal
      )
    );
  };

  const removeMultipleInstruction = (mealIndex: number, instructionIndex: number) => {
    setMultipleMealsData(prev => 
      prev.map((meal, index) => 
        index === mealIndex && meal.instructions.length > 1
          ? {
              ...meal,
              instructions: meal.instructions.filter((_, i) => i !== instructionIndex).map((inst, i) => ({
                ...inst,
                step_number: i + 1
              }))
            }
          : meal
      )
    );
  };

  const addMultipleIngredient = (mealIndex: number) => {
    setMultipleMealsData(prev => 
      prev.map((meal, index) => 
        index === mealIndex 
          ? {
              ...meal,
              ingredients: [...meal.ingredients, { category: '', ingredient_name: '', quantity: '', notes: '' }]
            }
          : meal
      )
    );
  };

  const updateMultipleIngredient = (mealIndex: number, ingredientIndex: number, field: keyof Ingredient, value: string) => {
    setMultipleMealsData(prev => 
      prev.map((meal, index) => 
        index === mealIndex 
          ? {
              ...meal,
              ingredients: meal.ingredients.map((ing, i) => 
                i === ingredientIndex ? { ...ing, [field]: value } : ing
              )
            }
          : meal
      )
    );
  };

  const removeMultipleIngredient = (mealIndex: number, ingredientIndex: number) => {
    setMultipleMealsData(prev => 
      prev.map((meal, index) => 
        index === mealIndex && meal.ingredients.length > 1
          ? {
              ...meal,
              ingredients: meal.ingredients.filter((_, i) => i !== ingredientIndex)
            }
          : meal
      )
    );
  };

  const addMultipleNutrition = (mealIndex: number) => {
    setMultipleMealsData(prev => 
      prev.map((meal, index) => 
        index === mealIndex 
          ? {
              ...meal,
              nutrition: [...meal.nutrition, { nutrient_name: '', unit: '', value: 0 }]
            }
          : meal
      )
    );
  };

  const updateMultipleNutrition = (mealIndex: number, nutritionIndex: number, field: keyof Nutrition, value: string | number) => {
    setMultipleMealsData(prev => 
      prev.map((meal, index) => 
        index === mealIndex 
          ? {
              ...meal,
              nutrition: meal.nutrition.map((nutr, i) => 
                i === nutritionIndex ? { ...nutr, [field]: field === 'value' ? parseFloat(value as string) || 0 : value } : nutr
              )
            }
          : meal
      )
    );
  };

  const removeMultipleNutrition = (mealIndex: number, nutritionIndex: number) => {
    setMultipleMealsData(prev => 
      prev.map((meal, index) => 
        index === mealIndex && meal.nutrition.length > 1
          ? {
              ...meal,
              nutrition: meal.nutrition.filter((_, i) => i !== nutritionIndex)
            }
          : meal
      )
    );
  };

  const addMultipleImage = (mealIndex: number) => {
    setMultipleMealsData(prev => 
      prev.map((meal, index) => 
        index === mealIndex 
          ? {
              ...meal,
              images: [...meal.images, { url: '', description: '' }]
            }
          : meal
      )
    );
  };

  // const updateMultipleImage = (mealIndex: number, imageIndex: number, field: keyof Image, value: string) => {
  //   setMultipleMealsData(prev => 
  //     prev.map((meal, index) => 
  //       index === mealIndex 
  //         ? {
  //             ...meal,
  //             images: meal.images.map((img, i) => 
  //               i === imageIndex ? { ...img, [field]: value } : img
  //             )
  //           }
  //         : meal
  //     )
  //   );
  // };

  // const removeMultipleImage = (mealIndex: number, imageIndex: number) => {
  //   setMultipleMealsData(prev => 
  //     prev.map((meal, index) => 
  //       index === mealIndex && meal.images.length > 1
  //         ? {
  //             ...meal,
  //             images: meal.images.filter((_, i) => i !== imageIndex)
  //           }
  //         : meal
  //     )
  //   );
  // };

  const addNewMealForm = () => {
    setMultipleMealsData(prev => [
      ...prev,
      {
        name: '',
        description: '',
        cuisine_id: 0,
        dietary_preference_id: 0,
        health_goal_id: 0,
        instructions: [{ step_number: 1, instruction_text: '' }],
        ingredients: [{ category: '', ingredient_name: '', quantity: '', notes: '' }],
        nutrition: [{ nutrient_name: '', unit: '', value: 0 }],
        images: [{ url: '', description: '' }]
      }
    ]);
  };

  const removeMealForm = (index: number) => {
    if (multipleMealsData.length > 1) {
      setMultipleMealsData(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Excel handlers
  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setExcelFile(file);
    }
  };

  const downloadExcelTemplate = () => {
    const templateData = [
      ['Name', 'Description', 'Cuisine ID', 'Dietary Preference ID', 'Health Goal ID', 'Instructions', 'Ingredients', 'Nutrition', 'Images'],
      ['Meal 1', 'Description 1', '1', '1', '1', 'Step 1: Instruction', 'Category:Ingredient:Quantity:Notes', 'Nutrient:Unit:Value', 'URL:Description'],
    ];
    
    const csvContent = templateData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'meal_template.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Submit handlers
  const handleSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = [singleMealData];
    const result = await createMeal(payload);
    
    if (result.success) {
      setSingleMealData({
        name: '',
        description: '',
        cuisine_id: 0,
        dietary_preference_id: 0,
        health_goal_id: 0,
        instructions: [{ step_number: 1, instruction_text: '' }],
        ingredients: [{ category: '', ingredient_name: '', quantity: '', notes: '' }],
        nutrition: [{ nutrient_name: '', unit: '', value: 0 }],
        images: [{ url: '', description: '' }]
      });
    }
  };

  const handleMultipleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = multipleMealsData;
    const result = await createMeal(payload);
    
    if (result.success) {
      setMultipleMealsData([
        {
          name: '',
          description: '',
          cuisine_id: 0,
          dietary_preference_id: 0,
          health_goal_id: 0,
          instructions: [{ step_number: 1, instruction_text: '' }],
          ingredients: [{ category: '', ingredient_name: '', quantity: '', notes: '' }],
          nutrition: [{ nutrient_name: '', unit: '', value: 0 }],
          images: [{ url: '', description: '' }]
        }
      ]);
    }
  };

  const handleExcelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!excelFile) {
      alert('Please select an Excel file');
      return;
    }
    alert('Excel upload functionality would be implemented here');
  };

  // Common form sections
  const renderBasicInfo = (mealData: MealFormData, onChange: (field: string, value: any) => void, index?: number) => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Basic Information {index !== undefined && `- Meal ${index + 1}`}
      </h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Meal Name *</label>
        <input
          type="text"
          value={mealData.name}
          onChange={(e) => onChange('name', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
        <textarea
          value={mealData.description}
          onChange={(e) => onChange('description', e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine</label>
          <select
            value={mealData.cuisine_id}
            onChange={(e) => onChange('cuisine_id', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            disabled={staticLoading}
          >
            <option value={0}>Select Cuisine</option>
            {staticData.cuisines.map(cuisine => (
              <option key={cuisine.id} value={cuisine.id}>{cuisine.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Preference</label>
          <select
            value={mealData.dietary_preference_id}
            onChange={(e) => onChange('dietary_preference_id', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            disabled={staticLoading}
          >
            <option value={0}>Select Preference</option>
            {staticData.dietary_preferences.map(pref => (
              <option key={pref.id} value={pref.id}>{pref.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Health Goal</label>
          <select
            value={mealData.health_goal_id}
            onChange={(e) => onChange('health_goal_id', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            disabled={staticLoading}
          >
            <option value={0}>Select Goal</option>
            {staticData.health_goals.map(goal => (
              <option key={goal.id} value={goal.id}>{goal.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderInstructions = (mealData: MealFormData, onAdd: () => void, onUpdate: (index: number, text: string) => void, onRemove: (index: number) => void) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-xl font-semibold text-gray-800">Instructions</h2>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center text-sm text-orange-600 hover:text-orange-700 font-medium"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Step
        </button>
      </div>
      {mealData.instructions.map((instruction, index) => (
        <div key={index} className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Step {index + 1}</label>
            <textarea
              value={instruction.instruction_text}
              onChange={(e) => onUpdate(index, e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          {mealData.instructions.length > 1 && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="mt-8 text-red-500 hover:text-red-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      ))}
    </div>
  );

  const renderIngredients = (mealData: MealFormData, onAdd: () => void, onUpdate: (index: number, field: keyof Ingredient, value: string) => void, onRemove: (index: number) => void) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-xl font-semibold text-gray-800">Ingredients</h2>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center text-sm text-orange-600 hover:text-orange-700 font-medium"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Ingredient
        </button>
      </div>
      {mealData.ingredients.map((ingredient, index) => (
        <div key={index} className="flex gap-2">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg">
            <input
              type="text"
              placeholder="Category"
              value={ingredient.category}
              onChange={(e) => onUpdate(index, 'category', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
            />
            <input
              type="text"
              placeholder="Ingredient Name"
              value={ingredient.ingredient_name}
              onChange={(e) => onUpdate(index, 'ingredient_name', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
            />
            <input
              type="text"
              placeholder="Quantity"
              value={ingredient.quantity}
              onChange={(e) => onUpdate(index, 'quantity', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
            />
            <input
              type="text"
              placeholder="Notes"
              value={ingredient.notes}
              onChange={(e) => onUpdate(index, 'notes', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
            />
          </div>
          {mealData.ingredients.length > 1 && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="mt-4 text-red-500 hover:text-red-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      ))}
    </div>
  );

  const renderNutrition = (mealData: MealFormData, onAdd: () => void, onUpdate: (index: number, field: keyof Nutrition, value: string | number) => void, onRemove: (index: number) => void) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-xl font-semibold text-gray-800">Nutrition Facts</h2>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center text-sm text-orange-600 hover:text-orange-700 font-medium"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Nutrient
        </button>
      </div>
      {mealData.nutrition.map((nutr, index) => (
        <div key={index} className="flex gap-2">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-lg">
            <input
              type="text"
              placeholder="Nutrient Name"
              value={nutr.nutrient_name}
              onChange={(e) => onUpdate(index, 'nutrient_name', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
            />
            <input
              type="text"
              placeholder="Unit (g, mg, etc)"
              value={nutr.unit}
              onChange={(e) => onUpdate(index, 'unit', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Value"
              value={nutr.value}
              onChange={(e) => onUpdate(index, 'value', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
            />
          </div>
          {mealData.nutrition.length > 1 && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="mt-4 text-red-500 hover:text-red-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      ))}
    </div>
  );

  const renderImages = (mealData: MealFormData, onAdd: () => void, onUpdate: (index: number, field: keyof Image, value: string) => void, onRemove: (index: number) => void) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-xl font-semibold text-gray-800">Images</h2>
      
      </div>
      {mealData.images.map((image, index) => (
        <div key={index} className="flex gap-2">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg">
            <input
              type="url"
              placeholder="Image URL"
              value={image.url}
              onChange={(e) => onUpdate(index, 'url', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
            />
            <input
              type="text"
              placeholder="Description"
              value={image.description}
              onChange={(e) => onUpdate(index, 'description', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
            />
          </div>
          {mealData.images.length > 1 && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="mt-4 text-red-500 hover:text-red-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Meal Management</h1>
            <p className="text-gray-600">Add single meal, multiple meals manually, or upload via Excel</p>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6 border-b">
            <nav className="flex space-x-8">
              {['single', 'multiple', 'excel'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab === 'single' && 'Single Meal'}
                  {tab === 'multiple' && 'Multiple Meals'}
                
                </button>
              ))}
            </nav>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-green-800 font-medium">Meal created successfully!</p>
                <p className="text-green-700 text-sm">Your meal has been added to the database.</p>
              </div>
              <button onClick={resetStatus} className="text-green-600 hover:text-green-800">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-red-800 font-medium">Error</p>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
              <button onClick={resetStatus} className="text-red-600 hover:text-red-800">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Single Meal Form */}
          {activeTab === 'single' && (
            <form onSubmit={handleSingleSubmit} className="space-y-6">
              {renderBasicInfo(singleMealData, (field, value) => 
                setSingleMealData(prev => ({ ...prev, [field]: value }))
              )}
              
              {renderInstructions(
                singleMealData,
                addSingleInstruction,
                updateSingleInstruction,
                removeSingleInstruction
              )}
              
              {renderIngredients(
                singleMealData,
                addSingleIngredient,
                updateSingleIngredient,
                removeSingleIngredient
              )}
              
              {renderNutrition(
                singleMealData,
                addSingleNutrition,
                updateSingleNutrition,
                removeSingleNutrition
              )}
              
              {renderImages(
                singleMealData,
                addSingleImage,
                updateSingleImage,
                removeSingleImage
              )}
              
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-green-800 to-green-500 text-white py-3 rounded-lg font-semibold hover:from-green-800 hover:to-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {submitting ? 'Creating Meal...' : 'Create Single Meal'}
                </button>
              </div>
            </form>
          )}

          {/* Multiple Meals Form */}
          {activeTab === 'multiple' && (
            <form onSubmit={handleMultipleSubmit} className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Add Multiple Meals</h2>
                <button
                  type="button"
                  onClick={addNewMealForm}
                  className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Meal
                </button>
              </div>

              {multipleMealsData.map((mealData, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-lg p-6 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Meal {index + 1}</h3>
                    {multipleMealsData.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMealForm(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  
                  {renderBasicInfo(mealData, (field, value) => 
                    handleMultipleInputChange(index, field, value), index
                  )}
                  
                  {renderInstructions(
                    mealData,
                    () => addMultipleInstruction(index),
                    (instructionIndex, text) => updateMultipleInstruction(index, instructionIndex, text),
                    (instructionIndex) => removeMultipleInstruction(index, instructionIndex)
                  )}
                  
                  {renderIngredients(
                    mealData,
                    () => addMultipleIngredient(index),
                    (ingredientIndex, field, value) => updateMultipleIngredient(index, ingredientIndex, field, value),
                    (ingredientIndex) => removeMultipleIngredient(index, ingredientIndex)
                  )}
                  
                  {renderNutrition(
                    mealData,
                    () => addMultipleNutrition(index),
                    (nutritionIndex, field, value) => updateMultipleNutrition(index, nutritionIndex, field, value),
                    (nutritionIndex) => removeMultipleNutrition(index, nutritionIndex)
                  )}
                  
                  {/* {renderImages(
                    mealData,
                    () => addMultipleImage(index),
                    (imageIndex, field, value) => updateMultipleImage(index, imageIndex, field, value),
                    (imageIndex) => removeMultipleImage(index, imageIndex)
                  )} */}
                </div>
              ))}

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-blue-800 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-blue-800 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {submitting ? 'Creating Meals...' : `Create ${multipleMealsData.length} Meals`}
                </button>
              </div>
            </form>
          )}

        
        </div>
      </div>
    </div>
  );
};

export default MealManagementApp;