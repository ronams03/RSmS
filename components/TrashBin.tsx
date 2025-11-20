import React, { useEffect, useState } from 'react';
import { ReturnItem, User } from '../types';
import { getUserItems, restoreItem, hardDeleteItem, restoreAll, emptyTrash } from '../services/storage';
import { RefreshCw, Trash, AlertTriangle } from 'lucide-react';

interface TrashBinProps {
  user: User;
}

const TrashBin: React.FC<TrashBinProps> = ({ user }) => {
  const [deletedItems, setDeletedItems] = useState<ReturnItem[]>([]);

  const refreshTrash = () => {
    const allItems = getUserItems(user.id);
    setDeletedItems(allItems.filter(i => i.isDeleted));
  };

  useEffect(() => {
    refreshTrash();
  }, [user]);

  const handleRestore = (id: string) => {
    restoreItem(user.id, id);
    refreshTrash();
  };

  const handleHardDelete = (id: string) => {
    if(window.confirm("Permanently delete this item? This cannot be undone.")) {
        hardDeleteItem(user.id, id);
        refreshTrash();
    }
  };

  const handleRestoreAll = () => {
    restoreAll(user.id);
    refreshTrash();
  };

  const handleEmptyTrash = () => {
    if(window.confirm("Permanently delete all items in trash?")) {
        emptyTrash(user.id);
        refreshTrash();
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Trash className="text-red-400" /> Recently Deleted
            </h2>
            <p className="text-gray-400 text-sm mt-1">Items are safe here until permanently deleted.</p>
        </div>
        
        {deletedItems.length > 0 && (
            <div className="flex gap-2 w-full sm:w-auto">
                <button 
                    onClick={handleRestoreAll}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 transition"
                >
                    Restore All
                </button>
                <button 
                    onClick={handleEmptyTrash}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition"
                >
                    Delete All
                </button>
            </div>
        )}
      </div>

      {deletedItems.length === 0 ? (
        <div className="text-center py-20 opacity-50">
            <Trash size={48} className="mx-auto mb-4" />
            <p>Trash is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
            {deletedItems.map(item => (
                <div key={item.id} className="glass-panel p-4 rounded-xl flex items-center gap-4 opacity-75 hover:opacity-100 transition">
                    <div className="w-16 h-16 bg-black/40 rounded-lg overflow-hidden">
                        <img src={item.imageUrl} className="w-full h-full object-cover grayscale" alt="deleted thumbnail" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-300 truncate">{item.title}</h4>
                        <p className="text-xs text-red-400 flex items-center gap-1">
                            <AlertTriangle size={12} /> Deleted
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => handleRestore(item.id)}
                            className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                            title="Restore"
                        >
                            <RefreshCw size={18} />
                        </button>
                        <button 
                            onClick={() => handleHardDelete(item.id)}
                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                            title="Delete Permanently"
                        >
                            <Trash size={18} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TrashBin;