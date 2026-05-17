import { Component } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-surface dark:bg-dark-bg flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 rounded-3xl bg-rose-500/10 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={36} className="text-rose-500" />
            </div>
            <h1 className="text-2xl font-display font-bold text-brand-charcoal dark:text-white mb-3">
              Something went wrong
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 leading-relaxed">
              An unexpected error occurred. This has been logged.
            </p>
            <p className="text-xs font-mono text-rose-400 bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 rounded-xl p-3 mb-8 text-left break-all">
              {this.state.error?.message || 'Unknown error'}
            </p>
            <button
              onClick={() => { this.setState({ hasError: false, error: null }); window.location.href = '/' }}
              className="btn-primary shadow-glow-cyan"
            >
              <RefreshCw size={16} />
              Reload Application
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
