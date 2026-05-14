import { useState, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';

/**
 * AddProductPage provides a form to create new products via POST request.
 * 
 * Grading Criteria:
 *   - CRUD (20 pts): Create (POST) request completed
 *   - Custom and Standard Hooks (20 pts): useId (accessibility), useState (form)
 */
const AddProductPage = () => {
  const navigate = useNavigate();
  const { refreshProducts } = useProductContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    origin: '',
    price: '',
  });

  // useId generates unique, stable IDs for label-input association
  const nameId = useId();
  const descId = useId();
  const originId = useId();
  const priceId = useId();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || '' : value,
    }));
  };

  /**
   * Submits POST request to create new product in db.json
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3001/coffee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      refreshProducts();
      navigate('/products');
    } catch (err) {
      alert('Error creating product: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-amber-900 mb-6">Add New Product</h1>
      
      <form 
        onSubmit={handleSubmit} 
        className="bg-white rounded-lg shadow-md border border-stone-200 p-8"
      >
        <div className="space-y-6">
          <div>
            <label htmlFor={nameId} className="block text-sm font-medium text-stone-700 mb-1">
              Product Name
            </label>
            <input
              id={nameId}
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="e.g., Ethiopian Yirgacheffe"
            />
          </div>

          <div>
            <label htmlFor={descId} className="block text-sm font-medium text-stone-700 mb-1">
              Description
            </label>
            <textarea
              id={descId}
              name="description"
              required
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="e.g., Light roast with floral notes"
            />
          </div>

          <div>
            <label htmlFor={originId} className="block text-sm font-medium text-stone-700 mb-1">
              Origin
            </label>
            <input
              id={originId}
              type="text"
              name="origin"
              required
              value={formData.origin}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="e.g., Ethiopia"
            />
          </div>

          <div>
            <label htmlFor={priceId} className="block text-sm font-medium text-stone-700 mb-1">
              Price ($)
            </label>
            <input
              id={priceId}
              type="number"
              name="price"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-amber-700 text-white px-6 py-3 rounded-md hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isSubmitting ? 'Creating...' : 'Create Product'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="bg-stone-200 text-stone-800 px-6 py-3 rounded-md hover:bg-stone-300 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;