import { useState, useEffect } from 'react';
import { Plus, Trash2, Tag } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCategories, addCategory, deleteCategory } from '../../services/settingsService';
import { ConfirmationModal } from '../common';

const CategorySettings = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);

    // Delete Modal State
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            toast.error('Failed to load categories');
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!newCategory.trim()) return;

        setAdding(true);
        try {
            const added = await addCategory({ name: newCategory });
            setCategories([...categories, added]);
            setNewCategory('');
            toast.success('Category added successfully');
        } catch (error) {
            toast.error('Failed to add category');
        } finally {
            setAdding(false);
        }
    };

    const handleDeleteClick = (id) => {
        setCategoryToDelete(id);
        setIsConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (!categoryToDelete) return;

        try {
            await deleteCategory(categoryToDelete);
            setCategories(categories.filter(c => c.id !== categoryToDelete));
            toast.success('Category deleted successfully');
        } catch (error) {
            toast.error('Failed to delete category');
        } finally {
            setIsConfirmOpen(false);
            setCategoryToDelete(null);
        }
    };

    // if (loading) return <div className="animate-pulse h-64 bg-gray-100 dark:bg-gray-800 rounded-xl"></div>;

    return (
        <div className="bg-white dark:bg-[#1E1E2D] rounded-xl p-4 sm:p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">Expense Categories</h3>

            {/* Add Category Form */}
            <form onSubmit={handleAddCategory} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="New category name..."
                        className="w-full pl-10 pr-4 py-2.5 sm:py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                    />
                </div>
                <button
                    type="submit"
                    disabled={adding || !newCategory.trim()}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] disabled:opacity-50 transition-colors font-medium"
                >
                    <Plus className="w-4 h-4" />
                    <span>{adding ? 'Adding...' : 'Add Category'}</span>
                </button>
            </form>

            {/* Categories List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
                    >
                        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                            <div className={`w-2 h-2 flex-shrink-0 rounded-full ${category.type === 'system' ? 'bg-blue-500' : 'bg-green-500'}`} />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{category.name}</span>
                            {category.type === 'system' && (
                                <span className="flex-shrink-0 text-xs px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400">System</span>
                            )}
                        </div>

                        {(category.isCustom || category.type === 'custom') && (
                            <button
                                onClick={() => handleDeleteClick(category.id)}
                                className="flex-shrink-0 p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                title="Delete category"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <ConfirmationModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Category"
                message="Are you sure you want to delete this category? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
            />
        </div>
    );
};

export default CategorySettings;
