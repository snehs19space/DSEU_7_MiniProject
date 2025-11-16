import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { ProfilePage } from './components/ProfilePage';

type Page = 'chat' | 'profile';

export default function App() {
  const [user, setUser] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('chat');

  const handleLogin = (email: string) => {
    setUser(email);
    setCurrentPage('chat');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('chat');
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header
        userEmail={user}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />
      <div className="flex-1 overflow-hidden">
        {currentPage === 'chat' ? (
          <ChatInterface />
        ) : (
          <div className="h-full overflow-auto">
            <ProfilePage userEmail={user} />
          </div>
        )}
      </div>
    </div>
  );
}
