'use client';

import Image from 'next/image';
import { FaUser } from 'react-icons/fa';

export default function Header() {
  return (
    <header
      style={{
        width: '100%', // arka plan full ekran
        backgroundColor: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        height: 100,
      }}
    >
      {/* İçerik container */}
      <div
        style={{
          width: '95%',         // içerik genişliği
          margin: '0 auto',     // ortalama
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1200px',
          height: '100%',
        }}
      >
        {/* Sol: Logo + Nav + Biz Önerelim */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          {/* Logo */}
          <Image
            src="/beije-logo.webp"
            alt="Beije Logo"
            width={75}
            height={75}
            style={{ height: 'auto' }}
          />

          {/* Nav öğeleri */}
          <div style={{ display: 'flex', gap: '30px', justifyContent: 'flex-start' }}>
            {['Ürünler', 'Biz Kimiz', 'Bağış Kültürü'].map((title) => (
              <div
                key={title}
                style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
              >
                <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>{title}</span>
                <span
                  style={{
                    display: 'inline-block',
                    borderLeft: '5px solid transparent',
                    borderRight: '5px solid transparent',
                    borderTop: '5px solid black',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Biz Önerelim */}
          <div style={{ fontWeight: '500', fontSize: '0.9rem', cursor: 'pointer' }}>
            Biz Önerelim
          </div>
        </div>

        {/* Sağ: Kendi Paketini Oluştur, Market, User */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px', // öğeler arası eşit boşluk
          }}
        >
          {/* Kendi Paketini Oluştur */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              border: '2px solid black',
              borderRadius: '60px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem',
              backgroundColor: 'white',
              width: 'fit-content', // sadece yazıyı saracak
              flexShrink: 0,
            }}
          >
            <span>Kendi Paketini Oluştur</span>
            <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>➔</span>
          </div>

          {/* Market */}
          <img
            src="/market.png"
            alt="Market"
            style={{ height: '24px', cursor: 'pointer', flexShrink: 0 }}
          />

          {/* User */}
          <FaUser size={24} style={{ cursor: 'pointer', flexShrink: 0 }} />
        </div>
      </div>
    </header>
  );
}
