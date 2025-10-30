// import React, { useState } from 'react';
// import { Plus, CheckCircle, AlertCircle, X } from 'lucide-react';
// import { useStaticData, useCreateMeal } from '../hook/MealManagementAppMealManagementApp';
// // Types
// interface Instruction {
//   step_number: number;
//   instruction_text: string;
// }

// interface Ingredient {
//   category: string;
//   ingredient_name: string;
//   quantity: string;
//   notes: string;
// }

// interface Nutrition {
//   nutrient_name: string;
//   unit: string;
//   value: number;
// }

// interface Image {
//   url: string;
//   description: string;
// }

// interface MealFormData {
//   name: string;
//   description: string;
//   cuisine_id: number;
//   dietary_preference_id: number;
//   health_goal_id: number;
//   instructions: Instruction[];
//   ingredients: Ingredient[];
//   nutrition: Nutrition[];
//   images: Image[];
// }

// // Main Component
// const MealManagementApp: React.FC = () => {
//   const { data: staticData, loading: staticLoading } = useStaticData();
//   const { createMeal, loading: submitting, error, success, resetStatus } = useCreateMeal();

//   const [formData, setFormData] = useState<MealFormData>({
//     name: '',
//     description: '',
//     cuisine_id: 0,
//     dietary_preference_id: 0,
//     health_goal_id: 0,
//     instructions: [{ step_number: 1, instruction_text: '' }],
//     ingredients: [{ category: '', ingredient_name: '', quantity: '', notes: '' }],
//     nutrition: [{ nutrient_name: '', unit: '', value: 0 }],
//     images: [{ url: '', description: '' }]
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: name.includes('_id') ? parseInt(value) || 0 : value
//     }));
//   };

//   // INSTRUCTION FUNCTIONS
//   const addInstruction = () => {
//     setFormData(prev => ({
//       ...prev,
//       instructions: [...prev.instructions, { step_number: prev.instructions.length + 1, instruction_text: '' }]
//     }));
//   };

//   const updateInstruction = (index: number, text: string) => {
//     setFormData(prev => ({
//       ...prev,
//       instructions: prev.instructions.map((inst, i) => 
//         i === index ? { ...inst, instruction_text: text } : inst
//       )
//     }));
//   };

//   const removeInstruction = (index: number) => {
//     if (formData.instructions.length > 1) {
//       setFormData(prev => ({
//         ...prev,
//         instructions: prev.instructions.filter((_, i) => i !== index).map((inst, i) => ({
//           ...inst,
//           step_number: i + 1
//         }))
//       }));
//     }
//   };

//   // INGREDIENT FUNCTIONS
//   const addIngredient = () => {
//     setFormData(prev => ({
//       ...prev,
//       ingredients: [...prev.ingredients, { category: '', ingredient_name: '', quantity: '', notes: '' }]
//     }));
//   };

//   const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       ingredients: prev.ingredients.map((ing, i) => 
//         i === index ? { ...ing, [field]: value } : ing
//       )
//     }));
//   };

//   const removeIngredient = (index: number) => {
//     if (formData.ingredients.length > 1) {
//       setFormData(prev => ({
//         ...prev,
//         ingredients: prev.ingredients.filter((_, i) => i !== index)
//       }));
//     }
//   };

//   // NUTRITION FUNCTIONS
//   const addNutrition = () => {
//     setFormData(prev => ({
//       ...prev,
//       nutrition: [...prev.nutrition, { nutrient_name: '', unit: '', value: 0 }]
//     }));
//   };

//   const updateNutrition = (index: number, field: keyof Nutrition, value: string | number) => {
//     setFormData(prev => ({
//       ...prev,
//       nutrition: prev.nutrition.map((nutr, i) => 
//         i === index ? { ...nutr, [field]: field === 'value' ? parseFloat(value as string) || 0 : value } : nutr
//       )
//     }));
//   };

//   const removeNutrition = (index: number) => {
//     if (formData.nutrition.length > 1) {
//       setFormData(prev => ({
//         ...prev,
//         nutrition: prev.nutrition.filter((_, i) => i !== index)
//       }));
//     }
//   };

//   // IMAGE FUNCTIONS - HERE THEY ARE! 👇
//   const addImage = () => {
//     setFormData(prev => ({
//       ...prev,
//       images: [...prev.images, { url: '', description: '' }]
//     }));
//   };

//   const updateImage = (index: number, field: keyof Image, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       images: prev.images.map((img, i) => 
//         i === index ? { ...img, [field]: value } : img
//       )
//     }));
//   };

//   const removeImage = (index: number) => {
//     if (formData.images.length > 1) {
//       setFormData(prev => ({
//         ...prev,
//         images: prev.images.filter((_, i) => i !== index)
//       }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const result = await createMeal(formData);
    
//     if (result) {
//       // Reset form on success
//       setFormData({
//         name: '',
//         description: '',
//         cuisine_id: 0,
//         dietary_preference_id: 0,
//         health_goal_id: 0,
//         instructions: [{ step_number: 1, instruction_text: '' }],
//         ingredients: [{ category: '', ingredient_name: '', quantity: '', notes: '' }],
//         nutrition: [{ nutrient_name: '', unit: '', value: 0 }],
//         images: [{ url: '', description: '' }]
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">Add New Meal</h1>
//             <p className="text-gray-600">Fill in the details to create a new meal entry</p>
//           </div>

//           {/* Success Message */}
//           {success && (
//             <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
//               <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
//               <div className="flex-1">
//                 <p className="text-green-800 font-medium">Meal created successfully!</p>
//                 <p className="text-green-700 text-sm">Your meal has been added to the database.</p>
//               </div>
//               <button onClick={resetStatus} className="text-green-600 hover:text-green-800">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//           )}

//           {/* Error Message */}
//           {error && (
//             <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
//               <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
//               <div className="flex-1">
//                 <p className="text-red-800 font-medium">Error</p>
//                 <p className="text-red-700 text-sm">{error}</p>
//               </div>
//               <button onClick={resetStatus} className="text-red-600 hover:text-red-800">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//           )}

//           <div className="space-y-6">
//             {/* Basic Information */}
//             <div className="space-y-4">
//               <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Basic Information</h2>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Meal Name *</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   rows={3}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine</label>
//                   <select
//                     name="cuisine_id"
//                     value={formData.cuisine_id}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     disabled={staticLoading}
//                   >
//                     <option value={0}>Select Cuisine</option>
//                     {staticData.cuisines.map(cuisine => (
//                       <option key={cuisine.id} value={cuisine.id}>{cuisine.name}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Preference</label>
//                   <select
//                     name="dietary_preference_id"
//                     value={formData.dietary_preference_id}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     disabled={staticLoading}
//                   >
//                     <option value={0}>Select Preference</option>
//                     {staticData.dietary_preferences.map(pref => (
//                       <option key={pref.id} value={pref.id}>{pref.name}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Health Goal</label>
//                   <select
//                     name="health_goal_id"
//                     value={formData.health_goal_id}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     disabled={staticLoading}
//                   >
//                     <option value={0}>Select Goal</option>
//                     {staticData.health_goals.map(goal => (
//                       <option key={goal.id} value={goal.id}>{goal.name}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Instructions */}
//             <div className="space-y-4">
//               <div className="flex justify-between items-center border-b pb-2">
//                 <h2 className="text-xl font-semibold text-gray-800">Instructions</h2>
//                 <button
//                   type="button"
//                   onClick={addInstruction}
//                   className="flex items-center text-sm text-orange-600 hover:text-orange-700 font-medium"
//                 >
//                   <Plus className="w-4 h-4 mr-1" />
//                   Add Step
//                 </button>
//               </div>
//               {formData.instructions.map((instruction, index) => (
//                 <div key={index} className="flex gap-2">
//                   <div className="flex-1">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Step {index + 1}</label>
//                     <textarea
//                       value={instruction.instruction_text}
//                       onChange={(e) => updateInstruction(index, e.target.value)}
//                       rows={2}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>
//                   {formData.instructions.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeInstruction(index)}
//                       className="mt-8 text-red-500 hover:text-red-700"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Ingredients */}
//             <div className="space-y-4">
//               <div className="flex justify-between items-center border-b pb-2">
//                 <h2 className="text-xl font-semibold text-gray-800">Ingredients</h2>
//                 <button
//                   type="button"
//                   onClick={addIngredient}
//                   className="flex items-center text-sm text-orange-600 hover:text-orange-700 font-medium"
//                 >
//                   <Plus className="w-4 h-4 mr-1" />
//                   Add Ingredient
//                 </button>
//               </div>
//               {formData.ingredients.map((ingredient, index) => (
//                 <div key={index} className="flex gap-2">
//                   <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg">
//                     <input
//                       type="text"
//                       placeholder="Category"
//                       value={ingredient.category}
//                       onChange={(e) => updateIngredient(index, 'category', e.target.value)}
//                       className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Ingredient Name"
//                       value={ingredient.ingredient_name}
//                       onChange={(e) => updateIngredient(index, 'ingredient_name', e.target.value)}
//                       className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Quantity"
//                       value={ingredient.quantity}
//                       onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
//                       className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Notes"
//                       value={ingredient.notes}
//                       onChange={(e) => updateIngredient(index, 'notes', e.target.value)}
//                       className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
//                     />
//                   </div>
//                   {formData.ingredients.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeIngredient(index)}
//                       className="mt-4 text-red-500 hover:text-red-700"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Nutrition */}
//             <div className="space-y-4">
//               <div className="flex justify-between items-center border-b pb-2">
//                 <h2 className="text-xl font-semibold text-gray-800">Nutrition Facts</h2>
//                 <button
//                   type="button"
//                   onClick={addNutrition}
//                   className="flex items-center text-sm text-orange-600 hover:text-orange-700 font-medium"
//                 >
//                   <Plus className="w-4 h-4 mr-1" />
//                   Add Nutrient
//                 </button>
//               </div>
//               {formData.nutrition.map((nutr, index) => (
//                 <div key={index} className="flex gap-2">
//                   <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-lg">
//                     <input
//                       type="text"
//                       placeholder="Nutrient Name"
//                       value={nutr.nutrient_name}
//                       onChange={(e) => updateNutrition(index, 'nutrient_name', e.target.value)}
//                       className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Unit (g, mg, etc)"
//                       value={nutr.unit}
//                       onChange={(e) => updateNutrition(index, 'unit', e.target.value)}
//                       className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
//                     />
//                     <input
//                       type="number"
//                       step="0.01"
//                       placeholder="Value"
//                       value={nutr.value}
//                       onChange={(e) => updateNutrition(index, 'value', e.target.value)}
//                       className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
//                     />
//                   </div>
//                   {formData.nutrition.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeNutrition(index)}
//                       className="mt-4 text-red-500 hover:text-red-700"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Images */}
//             <div className="space-y-4">
//               <div className="flex justify-between items-center border-b pb-2">
//                 <h2 className="text-xl font-semibold text-gray-800">Images</h2>
//                 <button
//                   type="button"
//                   onClick={addImage}
//                   className="flex items-center text-sm text-orange-600 hover:text-orange-700 font-medium"
//                 >
//                   <Plus className="w-4 h-4 mr-1" />
//                   Add Image
//                 </button>
//               </div>
//               {formData.images.map((image, index) => (
//                 <div key={index} className="flex gap-2">
//                   <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg">
//                     <input
//                       type="url"
//                       placeholder="Image URL"
//                       value={image.url}
//                       onChange={(e) => updateImage(index, 'url', e.target.value)}
//                       className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Description"
//                       value={image.description}
//                       onChange={(e) => updateImage(index, 'description', e.target.value)}
//                       className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
//                     />
//                   </div>
//                   {formData.images.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeImage(index)}
//                       className="mt-4 text-red-500 hover:text-red-700"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Submit Button */}
//             <div className="pt-6">
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 disabled={submitting}
//                 className="w-full bg-gradient-to-r from-green-800 to-green-500 text-white py-3 rounded-lg font-semibold hover:from-green-800 hover:to-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
//               >
//                 {submitting ? 'Creating Meal...' : 'Create Meal'}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MealManagementApp;




























// import React, { useState } from 'react';
// import { Plus, CheckCircle, AlertCircle, X } from 'lucide-react';
// import { useStaticData, useCreateMeal } from '../hook/MealManagementAppMealManagementApp';
// // Types
// interface Instruction {
//   step_number: number;
//   instruction_text: string;
// }

// interface Ingredient {
//   category: string;
//   ingredient_name: string;
//   quantity: string;
//   notes: string;
// }

// interface Nutrition {
//   nutrient_name: string;
//   unit: string;
//   value: number;
// }

// interface Image {
//   url: string;
//   description: string;
// }

// interface MealFormData {
//   name: string;
//   description: string;
//   cuisine_id: number;
//   dietary_preference_id: number;
//   health_goal_id: number;
//   instructions: Instruction[];
//   ingredients: Ingredient[];
//   nutrition: Nutrition[];
//   images: Image[];
// }

// // Main Component
// const MealManagementApp: React.FC = () => {
//   const { data: staticData, loading: staticLoading } = useStaticData();
//   const { createMeal, loading: submitting, error, success, resetStatus } = useCreateMeal();

//   const [formData, setFormData] = useState<MealFormData>({
//     name: '',
//     description: '',
//     cuisine_id: 0,
//     dietary_preference_id: 0,
//     health_goal_id: 0,
//     instructions: [{ step_number: 1, instruction_text: '' }],
//     ingredients: [{ category: '', ingredient_name: '', quantity: '', notes: '' }],
//     nutrition: [{ nutrient_name: '', unit: '', value: 0 }],
//     images: [{ url: '', description: '' }]
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: name.includes('_id') ? parseInt(value) || 0 : value
//     }));
//   };

//   // INSTRUCTION FUNCTIONS
//   const addInstruction = () => {
//     setFormData(prev => ({
//       ...prev,
//       instructions: [...prev.instructions, { step_number: prev.instructions.length + 1, instruction_text: '' }]
//     }));
//   };

//   const updateInstruction = (index: number, text: string) => {
//     setFormData(prev => ({
//       ...prev,
//       instructions: prev.instructions.map((inst, i) => 
//         i === index ? { ...inst, instruction_text: text } : inst
//       )
//     }));
//   };

//   const removeInstruction = (index: number) => {
//     if (formData.instructions.length > 1) {
//       setFormData(prev => ({
//         ...prev,
//         instructions: prev.instructions.filter((_, i) => i !== index).map((inst, i) => ({
//           ...inst,
//           step_number: i + 1
//         }))
//       }));
//     }
//   };

//   // INGREDIENT FUNCTIONS
//   const addIngredient = () => {
//     setFormData(prev => ({
//       ...prev,
//       ingredients: [...prev.ingredients, { category: '', ingredient_name: '', quantity: '', notes: '' }]
//     }));
//   };

//   const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       ingredients: prev.ingredients.map((ing, i) => 
//         i === index ? { ...ing, [field]: value } : ing
//       )
//     }));
//   };

//   const removeIngredient = (index: number) => {
//     if (formData.ingredients.length > 1) {
//       setFormData(prev => ({
//         ...prev,
//         ingredients: prev.ingredients.filter((_, i) => i !== index)
//       }));
//     }
//   };

//   // NUTRITION FUNCTIONS
//   const addNutrition = () => {
//     setFormData(prev => ({
//       ...prev,
//       nutrition: [...prev.nutrition, { nutrient_name: '', unit: '', value: 0 }]
//     }));
//   };

//   const updateNutrition = (index: number, field: keyof Nutrition, value: string | number) => {
//     setFormData(prev => ({
//       ...prev,
//       nutrition: prev.nutrition.map((nutr, i) => 
//         i === index ? { ...nutr, [field]: field === 'value' ? parseFloat(value as string) || 0 : value } : nutr
//       )
//     }));
//   };

//   const removeNutrition = (index: number) => {
//     if (formData.nutrition.length > 1) {
//       setFormData(prev => ({
//         ...prev,
//         nutrition: prev.nutrition.filter((_, i) => i !== index)
//       }));
//     }
//   };

//   // IMAGE FUNCTIONS - HERE THEY ARE! 👇
//   const addImage = () => {
//     setFormData(prev => ({
//       ...prev,
//       images: [...prev.images, { url: '', description: '' }]
//     }));
//   };

//   const updateImage = (index: number, field: keyof Image, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       images: prev.images.map((img, i) => 
//         i === index ? { ...img, [field]: value } : img
//       )
//     }));
//   };

//   const removeImage = (index: number) => {
//     if (formData.images.length > 1) {
//       setFormData(prev => ({
//         ...prev,
//         images: prev.images.filter((_, i) => i !== index)
//       }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Wrap formData in an array as required by the API
//     const payload = [formData];
    
//     const result = await createMeal(payload);
    
//     if (result) {
//       // Reset form on success
//       setFormData({
//         name: '',
//         description: '',
//         cuisine_id: 0,
//         dietary_preference_id: 0,
//         health_goal_id: 0,
//         instructions: [{ step_number: 1, instruction_text: '' }],
//         ingredients: [{ category: '', ingredient_name: '', quantity: '', notes: '' }],
//         nutrition: [{ nutrient_name: '', unit: '', value: 0 }],
//         images: [{ url: '', description: '' }]
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-orange-50 to-green-50 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">Add New Meal</h1>
//             <p className="text-gray-600">Fill in the details to create a new meal entry</p>
//           </div>

//           {/* Success Message */}
//           {success && (
//             <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
//               <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 shrink-0" />
//               <div className="flex-1">
//                 <p className="text-green-800 font-medium">Meal created successfully!</p>
//                 <p className="text-green-700 text-sm">Your meal has been added to the database.</p>
//               </div>
//               <button onClick={resetStatus} className="text-green-600 hover:text-green-800">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//           )}

//           {/* Error Message */}
//           {error && (
//             <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
//               <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 shrink-0" />
//               <div className="flex-1">
//                 <p className="text-red-800 font-medium">Error</p>
//                 <p className="text-red-700 text-sm">{error}</p>
//               </div>
//               <button onClick={resetStatus} className="text-red-600 hover:text-red-800">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//           )}

//           <div className="space-y-6">
//             {/* Basic Information */}
//             <div className="space-y-4">
//               <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Basic Information</h2>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Meal Name *</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   rows={3}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine</label>
//                   <select
//                     name="cuisine_id"
//                     value={formData.cuisine_id}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     disabled={staticLoading}
//                   >
//                     <option value={0}>Select Cuisine</option>
//                     {staticData.cuisines.map(cuisine => (
//                       <option key={cuisine.id} value={cuisine.id}>{cuisine.name}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Preference</label>
//                   <select
//                     name="dietary_preference_id"
//                     value={formData.dietary_preference_id}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     disabled={staticLoading}
//                   >
//                     <option value={0}>Select Preference</option>
//                     {staticData.dietary_preferences.map(pref => (
//                       <option key={pref.id} value={pref.id}>{pref.name}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Health Goal</label>
//                   <select
//                     name="health_goal_id"
//                     value={formData.health_goal_id}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     disabled={staticLoading}
//                   >
//                     <option value={0}>Select Goal</option>
//                     {staticData.health_goals.map(goal => (
//                       <option key={goal.id} value={goal.id}>{goal.name}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Instructions */}
//             <div className="space-y-4">
//               <div className="flex justify-between items-center border-b pb-2">
//                 <h2 className="text-xl font-semibold text-gray-800">Instructions</h2>
//                 <button
//                   type="button"
//                   onClick={addInstruction}
//                   className="flex items-center text-sm text-orange-600 hover:text-orange-700 font-medium"
//                 >
//                   <Plus className="w-4 h-4 mr-1" />
//                   Add Step
//                 </button>
//               </div>
//               {formData.instructions.map((instruction, index) => (
//                 <div key={index} className="flex gap-2">
//                   <div className="flex-1">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Step {index + 1}</label>
//                     <textarea
//                       value={instruction.instruction_text}
//                       onChange={(e) => updateInstruction(index, e.target.value)}
//                       rows={2}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>
//                   {formData.instructions.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeInstruction(index)}
//                       className="mt-8 text-red-500 hover:text-red-700"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Ingredients */}
//             <div className="space-y-4">
//               <div className="flex justify-between items-center border-b pb-2">
//                 <h2 className="text-xl font-semibold text-gray-800">Ingredients</h2>
//                 <button
//                   type="button"
//                   onClick={addIngredient}
//                   className="flex items-center text-sm text-orange-600 hover:text-orange-700 font-medium"
//                 >
//                   <Plus className="w-4 h-4 mr-1" />
//                   Add Ingredient
//                 </button>
//               </div>
//               {formData.ingredients.map((ingredient, index) => (
//                 <div key={index} className="flex gap-2">
//                   <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg">
//                     <input
//                       type="text"
//                       placeholder="Category"
//                       value={ingredient.category}
//                       onChange={(e) => updateIngredient(index, 'category', e.target.value)}
//                       className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Ingredient Name"
//                       value={ingredient.ingredient_name}
//                       onChange={(e) => updateIngredient(index, 'ingredient_name', e.target.value)}
//                       className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Quantity"
//                       value={ingredient.quantity}
//                       onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
//                       className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Notes"
//                       value={ingredient.notes}
//                       onChange={(e) => updateIngredient(index, 'notes', e.target.value)}
//                       className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
//                     />
//                   </div>
//                   {formData.ingredients.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeIngredient(index)}
//                       className="mt-4 text-red-500 hover:text-red-700"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Nutrition */}
//             <div className="space-y-4">
//               <div className="flex justify-between items-center border-b pb-2">
//                 <h2 className="text-xl font-semibold text-gray-800">Nutrition Facts</h2>
//                 <button
//                   type="button"
//                   onClick={addNutrition}
//                   className="flex items-center text-sm text-orange-600 hover:text-orange-700 font-medium"
//                 >
//                   <Plus className="w-4 h-4 mr-1" />
//                   Add Nutrient
//                 </button>
//               </div>
//               {formData.nutrition.map((nutr, index) => (
//                 <div key={index} className="flex gap-2">
//                   <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-lg">
//                     <input
//                       type="text"
//                       placeholder="Nutrient Name"
//                       value={nutr.nutrient_name}
//                       onChange={(e) => updateNutrition(index, 'nutrient_name', e.target.value)}
//                       className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Unit (g, mg, etc)"
//                       value={nutr.unit}
//                       onChange={(e) => updateNutrition(index, 'unit', e.target.value)}
//                       className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
//                     />
//                     <input
//                       type="number"
//                       step="0.01"
//                       placeholder="Value"
//                       value={nutr.value}
//                       onChange={(e) => updateNutrition(index, 'value', e.target.value)}
//                       className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
//                     />
//                   </div>
//                   {formData.nutrition.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeNutrition(index)}
//                       className="mt-4 text-red-500 hover:text-red-700"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Images */}
//             <div className="space-y-4">
//               <div className="flex justify-between items-center border-b pb-2">
//                 <h2 className="text-xl font-semibold text-gray-800">Images</h2>
//                 <button
//                   type="button"
//                   onClick={addImage}
//                   className="flex items-center text-sm text-orange-600 hover:text-orange-700 font-medium"
//                 >
//                   <Plus className="w-4 h-4 mr-1" />
//                   Add Image
//                 </button>
//               </div>
//               {formData.images.map((image, index) => (
//                 <div key={index} className="flex gap-2">
//                   <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg">
//                     <input
//                       type="url"
//                       placeholder="Image URL"
//                       value={image.url}
//                       onChange={(e) => updateImage(index, 'url', e.target.value)}
//                       className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Description"
//                       value={image.description}
//                       onChange={(e) => updateImage(index, 'description', e.target.value)}
//                       className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
//                     />
//                   </div>
//                   {formData.images.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeImage(index)}
//                       className="mt-4 text-red-500 hover:text-red-700"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Submit Button */}
//             <div className="pt-6">
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 disabled={submitting}
//                 className="w-full bg-linear-to-r from-green-800 to-green-500 text-white py-3 rounded-lg font-semibold hover:from-green-800 hover:to-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
//               >
//                 {submitting ? 'Creating Meal...' : 'Create Meal'}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MealManagementApp;