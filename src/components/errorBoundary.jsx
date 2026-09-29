import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Without this, an uncaught render error anywhere in the app unmounts
    // the entire tree and leaves a blank page with nothing in the UI to
    // explain why — this at least logs it and shows a way back.
    console.error('Uncaught error in app:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.hash = '#/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4">
          <h2>Something went wrong</h2>
          <p>This page hit an unexpected error instead of loading. Details are in the browser console.</p>
          {this.state.error && <pre style={{ whiteSpace: 'pre-wrap' }}>{String(this.state.error.message || this.state.error)}</pre>}
          <button className="btn btn-primary" onClick={this.handleReset}>Back to home</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
