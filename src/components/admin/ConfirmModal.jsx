import React from 'react'
import { AlertCircle, Check, X, ShieldAlert } from 'lucide-react'

export default function ConfirmModal({
  isOpen,
  title = "Confirmer l'opération",
  message = "Êtes-vous sûr de vouloir enregistrer ces modifications en temps réel sur le site ?",
  confirmText = "Enregistrer les modifications",
  cancelText = "Annuler",
  isDestructive = false,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-md bg-[#0F172A] border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-100 space-y-5">
        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-xl shrink-0 ${
              isDestructive
                ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                : 'bg-accent/15 text-accent border border-accent/30'
            }`}
          >
            {isDestructive ? <ShieldAlert className="size-6" /> : <AlertCircle className="size-6" />}
          </div>
          <div className="space-y-1">
            <h3 className="font-display text-lg font-bold text-white tracking-tight">
              {title}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-5 py-2.5 text-xs font-semibold text-white rounded-xl shadow-md transition-all flex items-center gap-1.5 ${
              isDestructive
                ? 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800'
                : 'bg-accent hover:bg-accent-hover active:scale-[0.98]'
            }`}
          >
            <Check className="size-4" />
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
