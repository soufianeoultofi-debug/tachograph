import { XIcon } from "./Icons";
import { useState, useEffect } from "react";

function FormModal({ title, fields = [], initialData = {}, onSave, onClose, icon }) {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log('FormModal: submit', formData);
      const res = onSave(formData);
      if (res && res.then) {
        res.then(() => console.log('FormModal: onSave resolved')).catch(err => console.error('FormModal: onSave error', err));
      }
    } catch (err) {
      console.error('FormModal: submit error', err);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg animate-slide-up">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
                {icon}
              </div>
            )}
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {fields && fields.length > 0 ? (
            fields
              .filter(field => field !== "_id" && field !== "id")
              .map(field => (
                <div key={field}>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 capitalize">
                    {field.replace(/_/g, " ")}
                  </label>
                  <input
                    type={field.includes("email") ? "email" : field.includes("date") ? "date" : "text"}
                    value={formData[field] || ""}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder={`Entrez ${field}`}
                  />
                </div>
              ))
          ) : null}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 shadow-sm shadow-brand-600/25 transition-colors"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormModal;
