import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { ReturnItem } from '../types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string; description: string; imageUrl: string; date: string }) => void;
  initialData?: ReturnItem;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [date, setDate] = useState(initialData?.date ? initialData.date.split('T')[0] : new Date().toISOString().split('T')[0]);
  const [imagePreview, setImagePreview] = useState<string>(initialData?.imageUrl || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
        // Reset form when closed if needed, or controlled by parent unmounting
    }
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !imagePreview || !date) {
        alert("Please fill all fields and upload an image.");
        return;
    }
    onSave({ title, description, imageUrl: imagePreview, date });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl transform transition-all scale-100">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">{initialData ? 'Edit Proof' : 'Upload Return Proof'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition">
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Image Upload Area */}
            <div 
                className={`
                    relative w-full h-48 rounded-2xl border-2 border-dashed 
                    flex flex-col items-center justify-center cursor-pointer transition-all
                    ${imagePreview ? 'border-blue-500/50' : 'border-gray-600 hover:border-gray-400 hover:bg-white/5'}
                `}
                onClick={() => fileInputRef.current?.click()}
            >
                {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-2xl opacity-80 hover:opacity-60 transition" />
                ) : (
                    <div className="text-center text-gray-400">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Upload size={24} />
                        </div>
                        <span className="text-sm font-medium">Tap to upload image</span>
                    </div>
                )}
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                />
                {imagePreview && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="px-3 py-1 bg-black/60 rounded-full text-xs text-white backdrop-blur-md">Change Image</span>
                    </div>
                )}
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Title</label>
                    <input 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full glass-input px-4 py-3 rounded-xl"
                        placeholder="e.g. Community Cleanup"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Date</label>
                    <input 
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full glass-input px-4 py-3 rounded-xl"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Description</label>
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full glass-input px-4 py-3 rounded-xl h-24 resize-none"
                        placeholder="Describe the activity..."
                        required
                    />
                </div>
            </div>

            <div className="pt-4">
                <button type="submit" className="w-full glass-button py-3 rounded-xl text-white font-bold text-lg shadow-lg">
                    {initialData ? 'Update Entry' : 'Submit to Storage'}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;