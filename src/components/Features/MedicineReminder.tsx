import { useState } from 'react';
import { Bell, Plus, Trash2, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface Reminder {
  id: string;
  medicine: string;
  dosage: string;
  frequency: string;
  time: string;
}

export default function MedicineReminder() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newReminder, setNewReminder] = useState<Omit<Reminder, 'id'>>({
    medicine: '',
    dosage: '',
    frequency: 'daily',
    time: '09:00',
  });

  const handleAddReminder = () => {
    const reminder: Reminder = {
      id: crypto.randomUUID(),
      ...newReminder,
    };
    setReminders([...reminders, reminder]);
    setShowForm(false);
    setNewReminder({
      medicine: '',
      dosage: '',
      frequency: 'daily',
      time: '09:00',
    });
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-primary mb-8 text-center">
        Medicine Reminder
      </h2>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-semibold">Your Reminders</h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="py-2 px-4 bg-primary text-white rounded-lg flex items-center gap-2"
            onClick={() => setShowForm(true)}
          >
            <Plus className="w-4 h-4" />
            Add Reminder
          </motion.button>
        </div>

        {showForm && (
          <div className="mb-8 bg-gray-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-4">New Reminder</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medicine Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  value={newReminder.medicine}
                  onChange={(e) => setNewReminder({ ...newReminder, medicine: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dosage
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  value={newReminder.dosage}
                  onChange={(e) => setNewReminder({ ...newReminder, dosage: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                </label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={newReminder.frequency}
                  onChange={(e) => setNewReminder({ ...newReminder, frequency: e.target.value })}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  className="w-full p-2 border rounded-lg"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="py-2 px-4 text-gray-600 hover:text-gray-800"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="py-2 px-4 bg-primary text-white rounded-lg"
                onClick={handleAddReminder}
              >
                Add Reminder
              </motion.button>
            </div>
          </div>
        )}

        {reminders.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No reminders set. Add your first reminder to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reminders.map((reminder) => (
              <motion.div
                key={reminder.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 p-4 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{reminder.medicine}</h4>
                    <p className="text-sm text-gray-600">
                      {reminder.dosage} • {reminder.frequency} at {reminder.time}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-red-500 hover:text-red-600"
                  onClick={() => handleDeleteReminder(reminder.id)}
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}