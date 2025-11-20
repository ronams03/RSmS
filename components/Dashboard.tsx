import React, { useState, useEffect } from 'react';
import { ReturnItem, User } from '../types';
import { Plus, UploadCloud } from 'lucide-react';
import UploadModal from './UploadModal';
import ItemCard from './ItemCard';
import { getUserItems, addItem, deleteItem, updateItem } from '../services/storage';

interface DashboardProps {
  user: User;
  searchTerm: string;
}

const Dashboard: React.FC<DashboardProps> = ({ user, searchTerm }) => {
  const [items, setItems] = useState<ReturnItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ReturnItem | null>(null);

  // Load items
  const refreshItems = () => {
    const allItems = getUserItems(user.id);
    // Filter out deleted items
    setItems(allItems.filter(i => !i.isDeleted));
  };

  useEffect(() => {
    refreshItems();
  }, [user.id]);

  const handleSave = (itemData: Omit<ReturnItem, 'id' | 'userId' | 'isDeleted'>) => {
    if (editingItem) {
        // Update
        const updated: ReturnItem = {
            ...editingItem,
            ...itemData
        };
        updateItem(user.id, updated);
    } else {
        // Create
        const newItem: ReturnItem = {
            id: crypto.randomUUID(),
            userId: user.id,
            isDeleted: false,
            ...itemData
        };
        addItem(user.id, newItem);
    }
    setIsModalOpen(false);
    setEditingItem(null);
    refreshItems();
  };

  const handleDelete = (id: string) => {
    deleteItem(user.id, id);
    refreshItems();
  };

  const handleEdit = (item: ReturnItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  // Filtering and Categorization Logic
  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group by Month -> Week
  const groupedItems = filteredItems.reduce((acc, item) => {
    const date = new Date(item.date);
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    // Simple Week Calculation: 1-7 = Week 1, etc.
    const day = date.getDate();
    const weekNum = Math.ceil(day / 7);
    const weekKey = `Week ${weekNum}`;

    if (!acc[monthYear]) acc[monthYear] = {};
    if (!acc[monthYear][weekKey]) acc[monthYear][weekKey] = [];
    
    acc[monthYear][weekKey].push(item);
    return acc;
  }, {} as Record<string, Record<string, ReturnItem[]>>);

  // Sort months descending (newest first)
  const sortedMonths = Object.keys(groupedItems).sort((a, b) => {
      return new Date(b).getTime() - new Date(a).getTime(); // Rough sort logic for "Month Year"
  });

  return (
    <div className="p-6 pb-24 md:pb-6 min-h-screen">
      
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>
          <p className="text-gray-400 text-sm mt-1">Manage your return proofs</p>
        </div>
        <button 
          onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
          className="glass-button px-6 py-3 rounded-xl text-white font-medium flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Plus size={20} />
          <span>Upload Proof</span>
        </button>
      </div>

      {/* Content */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 glass-panel rounded-3xl p-8 text-center">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
            <UploadCloud className="text-gray-500" size={40} />
          </div>
          <h3 className="text-xl font-semibold text-gray-300">No items yet</h3>
          <p className="text-gray-500 mt-2 max-w-xs">Upload your first return service proof to get started.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedMonths.map(month => (
            <div key={month} className="animate-fade-in">
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-lg font-bold text-blue-400 uppercase tracking-wider">{month}</h3>
                <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
              </div>
              
              <div className="space-y-6 pl-0 md:pl-4 border-l-2 border-white/5 ml-2">
                {Object.keys(groupedItems[month]).sort().map(week => (
                  <div key={week} className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-3 ml-2">{week}</h4>
                    <div className="grid grid-cols-1 gap-4">
                      {groupedItems[month][week].map(item => (
                        <ItemCard 
                          key={item.id} 
                          item={item} 
                          onDelete={handleDelete}
                          onEdit={handleEdit}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {isModalOpen && (
        <UploadModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSave}
          initialData={editingItem || undefined}
        />
      )}
    </div>
  );
};

export default Dashboard;