import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Fasaha app:', error, errorInfo);
  }

  private handleReset = () => {
    localStorage.removeItem('fasaha_stats');
    localStorage.removeItem('fasaha_theme');
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6">
          <div className="max-w-lg w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold">App Recovery Mode</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Something encountered an issue while rendering. Click below to clear cached session state and reload fresh.
            </p>

            {this.state.error && (
              <div className="text-left bg-slate-950/80 p-3.5 rounded-2xl border border-red-900/40 text-[11px] font-mono text-red-300 max-h-36 overflow-y-auto">
                <p className="font-bold text-red-400 mb-1">Error:</p>
                <p>{this.state.error.message || String(this.state.error)}</p>
              </div>
            )}

            <button
              type="button"
              onClick={this.handleReset}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Reset Learning Cache & Reload App
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
