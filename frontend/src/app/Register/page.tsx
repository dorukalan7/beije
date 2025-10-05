'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [step, setStep] = useState<'auth' | 'verify'>('auth'); // Yeni step state
  const [form, setForm] = useState({ username: '', email: '' });
  const [verificationCode, setVerificationCode] = useState(''); // Kod input
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch('http://localhost:3001/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username, email: form.email }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || 'Kayıt sırasında bir hata oluştu.');
        setLoading(false);
        return;
      }

      setMessage('Kayıt başarılı! Emailinizi kontrol edin ve doğrulama yapın.');
      setStep('verify'); // Kayıt başarılı → verification step
    } catch (err: any) {
      setError(err.message || 'Bilinmeyen bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch(
        `http://localhost:3001/user/check-verification?username=${form.username}&email=${form.email}`
      );
      const data = await res.json();

      if (res.ok && data.message === 'User is verified') {
        router.push('/home');
      } else {
        setMessage('Kullanıcı bulunamadı veya email doğrulaması yapılmamış.');
      }
    } catch (err: any) {
      setError(err.message || 'Bilinmeyen bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch(
        `http://localhost:3001/user/verify-email/${form.username}/${verificationCode}`,
        { method: 'GET' }
      );
      const data = await res.json();

      if (res.ok) {
        setMessage('Hesap doğrulandı!');
        router.push('/home');
      } else {
        setError(data.message || 'Kod hatalı!');
      }
    } catch (err: any) {
      setError(err.message || 'Bilinmeyen hata!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7f7f7', paddingTop: '40px' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
        {/* Sabit başlık */}
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '8px' }}>Merhaba</h1>
        <p style={{ fontSize: '1rem', color: '#555', marginBottom: '24px' }}>Beije’ye Hoşgeldiniz</p>

        {/* Tab seçenekleri */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
          {['login', 'register'].map((tab) => (
            <div
              key={tab}
              onClick={() => { setActiveTab(tab as 'login' | 'register'); setStep('auth'); }}
              style={{
                cursor: 'pointer',
                fontWeight: activeTab === tab ? 600 : 400,
                borderBottom: activeTab === tab ? '3px solid black' : '3px solid transparent',
                paddingBottom: '4px',
                width: '50%',
                textAlign: 'center',
              }}
            >
              {tab === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
            </div>
          ))}
        </div>

        {/* Form kutusu */}
        <div
          style={{
            padding: '40px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          {step === 'auth' && (
            <>
              {message && <p style={{ color: 'green', marginBottom: '16px' }}>{message}</p>}
              {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}

              <form
                onSubmit={activeTab === 'register' ? handleRegister : (e) => { e.preventDefault(); handleLogin(); }}
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                <input
                  type="text"
                  name="username"
                  placeholder="Kullanıcı Adı"
                  value={form.username}
                  onChange={handleChange}
                  required
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="E-posta"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: loading ? '#555' : 'black',
                    color: 'white',
                    fontWeight: 600,
                    cursor: loading ? 'not-allowed' : 'pointer',
                  }}
                >
                  {loading ? 'Bekleyin...' : activeTab === 'register' ? 'Kayıt Ol' : 'Giriş Yap'}
                </button>
              </form>
            </>
          )}

          {step === 'verify' && (
            <div style={{ marginTop: '20px' }}>
              <h3>Email Doğrulama</h3>
              <input
                type="text"
                placeholder="Verification Code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  width: '100%',
                  marginBottom: '12px',
                }}
              />
              <button
                onClick={handleVerify}
                disabled={loading}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: 'black',
                  color: 'white',
                  width: '100%',
                }}
              >
                {loading ? 'Bekleyin...' : 'Doğrula'}
              </button>
              {message && <p style={{ color: 'green', marginTop: '12px' }}>{message}</p>}
              {error && <p style={{ color: 'red', marginTop: '12px' }}>{error}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
