import { ReactNode } from 'react';
import PackageProvider from './store/PackageContext';
import Header from './components/Header'; // Header path doğru olmalı

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body style={{ margin: 0, display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <PackageProvider>
          {/* Sabit header */}
          <Header />

          {/* Scrollable içerik */}
          <main
            style={{
              flex: 1, // header dışında kalan alan
              overflowY: 'auto',
              padding: '0 60px',
              backgroundColor: '#f3f4f6',
              boxSizing: 'border-box',
            }}
          >
            {children}
          </main>
        </PackageProvider>
      </body>
    </html>
  );
}
