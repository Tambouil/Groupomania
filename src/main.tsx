import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './contexts/AuthContext'
import { PostsProvider } from './contexts/PostsContext'
import { CommentsProvider } from './contexts/CommentsContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <PostsProvider>
        <CommentsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CommentsProvider>
      </PostsProvider>
    </AuthProvider>
  </React.StrictMode>
)
