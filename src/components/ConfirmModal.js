import { AlertCircleIcon, XIcon } from "./Icons";

function ConfirmModal({ show, onClose, onConfirm, title, message }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-sm animate-slide-up">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center">
              <AlertCircleIcon className="w-[18px] h-[18px] text-rose-600" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {title || "Confirmer la suppression"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5">
          <p className="text-sm text-slate-600">
            {message || "Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible."}
          </p>
        </div>

        <div className="flex justify-end gap-3 px-6 pb-5">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 shadow-sm shadow-rose-600/25 transition-colors"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
