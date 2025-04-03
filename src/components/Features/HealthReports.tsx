import { useState, useRef } from 'react';
import { Upload, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HealthReports() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload logic here
    console.log('Report uploaded:', event.target.files?.[0]);
    setIsAnalyzing(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-primary mb-8 text-center">
        Health Report Analyzer
      </h2>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 px-6 bg-primary text-white rounded-lg flex items-center justify-center space-x-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-6 h-6" />
              <span>Upload Report</span>
            </motion.button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,image/*"
              onChange={handleFileUpload}
            />

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Supported Formats
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• PDF Documents</li>
                <li>• Images (JPG, PNG)</li>
                <li>• Scanned Reports</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 min-h-[300px] flex items-center justify-center">
            {isAnalyzing ? (
              <div className="text-center">
                <motion.div
                  className="w-full h-1 bg-primary/20 relative mb-4"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-primary/40 transform -translate-y-1/2" />
                </motion.div>
                <p className="text-gray-600">Analyzing report...</p>
              </div>
            ) : (
              <p className="text-gray-400">No report selected</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}