import React from 'react';
import { Info } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="p-6 flex items-center justify-center min-h-[80vh]">
      <div className="glass-panel max-w-2xl w-full p-10 rounded-3xl text-center relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-xl border border-white/10">
                <Info size={40} className="text-blue-400" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-2">ReturnServiceOS</h2>
            <p className="text-gray-400 text-sm mb-8 uppercase tracking-widest">Version 1.0</p>

            <div className="bg-white/5 p-8 rounded-2xl border border-white/5">
                <p className="text-xl text-gray-200 italic leading-relaxed font-light">
                    "The Developer developed this app because most of the scholars were forgetful where they place their proof of Return service activity"
                </p>
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="p-4">
                    <h4 className="text-2xl font-bold text-white">Secure</h4>
                    <p className="text-xs text-gray-500 mt-1">Local Storage</p>
                </div>
                <div className="p-4 border-l border-r border-white/10">
                    <h4 className="text-2xl font-bold text-white">Fast</h4>
                    <p className="text-xs text-gray-500 mt-1">Instant Access</p>
                </div>
                <div className="p-4">
                    <h4 className="text-2xl font-bold text-white">Clean</h4>
                    <p className="text-xs text-gray-500 mt-1">Glass Design</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;