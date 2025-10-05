'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Register from './pages/Register/page';
import HomePage from './home/page'; // HomePage dosyan senin verdiğin component

export default function HomePageWrapper() {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  useEffect(() => {
    // Burada backend'den kullanıcı doğrulama kontrolü yapılacak
    const dummyVerified = false; 
    setIsVerified(dummyVerified);
  }, []);

  if (isVerified === null) return null; // loading state
  if (!isVerified) return <Register />; // kayıt/doğrulama yoksa
  return <HomePage />; // verified ise ana sayfa
}
