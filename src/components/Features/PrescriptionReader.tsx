import { useState, useRef } from 'react';
import { Upload, FileText, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrescriptionReader() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload logic here
    console.log('Prescription uploaded:', event.target.files?.[0]);
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setHasResult(true);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-primary mb-8 text-center">
        Prescription Reader
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
              <span>Upload Prescription</span>
            </motion.button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileUpload}
            />

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Instructions
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Take a clear photo of the prescription</li>
                <li>• Ensure good lighting</li>
                <li>• Keep the prescription flat</li>
                <li>• Include all text clearly</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 min-h-[300px] flex flex-col">
            {isProcessing ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    className="w-full h-1 bg-primary/20 relative mb-4"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-primary/40 transform -translate-y-1/2" />
                  </motion.div>
                  <p className="text-gray-600">Processing prescription...</p>
                </div>
              </div>
            ) : hasResult ? (
              <div className="flex-1 flex flex-col">
                <h3 className="font-semibold text-gray-800 mb-4">Extracted Information</h3>
                <div className="space-y-4 flex-1">
                  <div className="bg-white p-3 rounded shadow-sm">
                    <p className="text-sm font-medium text-gray-600">Medicine</p>
                    <p className="text-gray-800">Amoxicillin 500mg</p>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm">
                    <p className="text-sm font-medium text-gray-600">Dosage</p>
                    <p className="text-gray-800">1 tablet three times daily</p>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm">
                    <p className="text-sm font-medium text-gray-600">Duration</p>
                    <p className="text-gray-800">7 days</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 py-2 px-4 bg-secondary text-white rounded-lg flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export to PDF</span>
                </motion.button>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-400">No prescription uploaded</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}