import { useState, useRef } from 'react'
import { Download, Upload, ChevronDown, FileText, FileJson, Sheet, Printer, CheckCircle, X, AlertCircle } from 'lucide-react'

/* ─── helpers ─── */
function toCSV(rows, columns) {
  const header = columns.map(c => `"${c.label}"`).join(',')
  const body = rows.map(row =>
    columns.map(c => {
      const val = typeof c.accessor === 'function' ? c.accessor(row) : row[c.accessor]
      return `"${String(val ?? '').replace(/"/g, '""')}"`
    }).join(',')
  )
  return [header, ...body].join('\n')
}

function toJSON(rows, columns) {
  return JSON.stringify(rows.map(row => {
    const obj = {}
    columns.forEach(c => {
      obj[c.label] = typeof c.accessor === 'function' ? c.accessor(row) : row[c.accessor]
    })
    return obj
  }), null, 2)
}

function toTSV(rows, columns) {
  const header = columns.map(c => c.label).join('\t')
  const body = rows.map(row =>
    columns.map(c => {
      const val = typeof c.accessor === 'function' ? c.accessor(row) : row[c.accessor]
      return String(val ?? '').replace(/\t/g, ' ')
    }).join('\t')
  )
  return [header, ...body].join('\n')
}

function downloadBlob(content, filename, mime) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}

function printTable(title, rows, columns) {
  const thead = columns.map(c => `<th>${c.label}</th>`).join('')
  const tbody = rows.map(row =>
    `<tr>${columns.map(c => {
      const val = typeof c.accessor === 'function' ? c.accessor(row) : row[c.accessor]
      return `<td>${val ?? ''}</td>`
    }).join('')}</tr>`
  ).join('')

  const win = window.open('', '_blank')
  win.document.write(`
    <!DOCTYPE html><html><head><title>${title}</title>
    <style>
      body { font-family: 'Inter', sans-serif; padding: 24px; color: #111; }
      h1 { font-size: 18px; margin-bottom: 16px; }
      table { border-collapse: collapse; width: 100%; font-size: 12px; }
      th { background: #0f172a; color: #fff; padding: 8px 12px; text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; }
      td { padding: 8px 12px; border-bottom: 1px solid #e2e8f0; }
      tr:nth-child(even) td { background: #f8fafc; }
      p.meta { color: #64748b; font-size: 11px; margin-bottom: 12px; }
    </style></head><body>
    <h1>${title}</h1>
    <p class="meta">Exported: ${new Date().toLocaleString('en-IN')} &nbsp;·&nbsp; ${rows.length} records</p>
    <table><thead><tr>${thead}</tr></thead><tbody>${tbody}</tbody></table>
    <script>window.onload=()=>window.print()<\/script>
    </body></html>`)
  win.document.close()
}

/* ─── Upload Toast ─── */
function UploadToast({ file, onClose }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white dark:bg-dark-surface border border-green-500/30 shadow-glow-cyan rounded-2xl px-5 py-4 flex items-center gap-3 animate-slide-up min-w-[280px]">
      <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-brand-charcoal dark:text-white">File Received</p>
        <p className="text-xs text-gray-400 truncate mt-0.5">{file?.name}</p>
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600 flex-shrink-0"><X size={16} /></button>
    </div>
  )
}

/* ─── Main Component ─── */
export default function DataPortal({ title = 'List', rows = [], columns = [], acceptedFormats = '.csv,.json,.xlsx,.pdf' }) {
  const [showMenu, setShowMenu] = useState(false)
  const [toast, setToast] = useState(null)
  const [uploadError, setUploadError] = useState(null)
  const fileRef = useRef()
  const slug = title.toLowerCase().replace(/\s+/g, '_')

  const formats = [
    {
      label: 'CSV',
      icon: <FileText size={15} />,
      color: 'text-green-500',
      action: () => downloadBlob(toCSV(rows, columns), `${slug}_${Date.now()}.csv`, 'text/csv')
    },
    {
      label: 'JSON',
      icon: <FileJson size={15} />,
      color: 'text-blue-500',
      action: () => downloadBlob(toJSON(rows, columns), `${slug}_${Date.now()}.json`, 'application/json')
    },
    {
      label: 'Excel (TSV)',
      icon: <Sheet size={15} />,
      color: 'text-emerald-500',
      action: () => downloadBlob(toTSV(rows, columns), `${slug}_${Date.now()}.tsv`, 'text/tab-separated-values')
    },
    {
      label: 'PDF / Print',
      icon: <Printer size={15} />,
      color: 'text-red-500',
      action: () => { printTable(title, rows, columns); setShowMenu(false) }
    },
  ]

  const handleDownload = (fmt) => {
    fmt.action()
    setShowMenu(false)
  }

  const handleUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const allowed = ['text/csv', 'application/json', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/pdf', 'text/tab-separated-values']
    const extAllowed = ['.csv', '.json', '.xlsx', '.tsv', '.pdf']
    const ext = '.' + file.name.split('.').pop().toLowerCase()
    if (!allowed.includes(file.type) && !extAllowed.includes(ext)) {
      setUploadError(`Unsupported format: ${file.name}`)
      setTimeout(() => setUploadError(null), 3000)
      return
    }
    setToast(file)
    setTimeout(() => setToast(null), 4000)
    e.target.value = ''
  }

  return (
    <div className="flex items-center gap-2">
      {/* Upload */}
      <button
        onClick={() => fileRef.current?.click()}
        title="Upload List"
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bold text-xs uppercase tracking-wider hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-brand-cyan/40 hover:text-brand-cyan transition-all"
      >
        <Upload size={15} /> Upload
      </button>
      <input ref={fileRef} type="file" accept={acceptedFormats} className="hidden" onChange={handleUpload} />

      {/* Download dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowMenu(v => !v)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-cyan text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-cyan/90 shadow-glow-cyan transition-all"
        >
          <Download size={15} /> Export
          <ChevronDown size={14} className={`transition-transform ${showMenu ? 'rotate-180' : ''}`} />
        </button>

        {showMenu && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setShowMenu(false)} />
            <div className="absolute right-0 top-full mt-2 z-40 w-44 bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 rounded-2xl shadow-card-lg overflow-hidden animate-fade-in">
              <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Export As</p>
              </div>
              {formats.map(fmt => (
                <button
                  key={fmt.label}
                  onClick={() => handleDownload(fmt)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors text-left"
                >
                  <span className={fmt.color}>{fmt.icon}</span>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{fmt.label}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Upload success toast */}
      {toast && <UploadToast file={toast} onClose={() => setToast(null)} />}

      {/* Error toast */}
      {uploadError && (
        <div className="fixed bottom-6 right-6 z-50 bg-white dark:bg-dark-surface border border-red-500/30 rounded-2xl px-5 py-4 flex items-center gap-3 animate-slide-up min-w-[280px]">
          <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
          <p className="text-sm font-bold text-red-500">{uploadError}</p>
          <button onClick={() => setUploadError(null)} className="text-gray-400 ml-auto"><X size={16} /></button>
        </div>
      )}
    </div>
  )
}
