import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, TriangleAlert } from 'lucide-react'
import { useApp } from '../utils/AppContext'

const styles = {
  success: {
    icon: CheckCircle2,
    className: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-200',
  },
  info: {
    icon: Info,
    className: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950/70 dark:text-sky-200',
  },
  error: {
    icon: TriangleAlert,
    className: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/70 dark:text-rose-200',
  },
}

function Toast() {
  const { toast } = useApp()
  const config = styles[toast?.type || 'success']
  const Icon = config.icon

  return (
    <AnimatePresence>
      {toast ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 z-[70]"
        >
          <div className={`flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-soft ${config.className}`}>
            <Icon className="h-5 w-5" />
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default Toast
