'use client';
import Register from '../Register/page';
import { useState } from 'react';
import { usePackage } from '../store/PackageContext';
import AccordionItem from './components/AccordionItem';




export default function HomePage() {
  
  const { counts } = usePackage();
  const selectedItems = Object.entries(counts).filter(([_, count]) => count > 0);

  const [selectedCategory, setSelectedCategory] = useState('menstrual');

  return (
    <div
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 45px',
      }}
    >
      
      <h2 style={{ marginTop: '50px', fontWeight: '600', fontSize: '1.5rem' }}>
        Kendi Paketini Oluştur
        <span
          style={{
            backgroundColor:'rgb(249, 245, 242)',
            fontWeight: '400',
            fontSize: '1rem',
            marginLeft: '20px',
            cursor: 'pointer',
            color: '#333',
          }}
        >
          Nasıl çalışır?
        </span>
      </h2>

      
      <p
        style={{
          fontWeight: '400',
          fontSize: '1rem',
          lineHeight: '1.5',
          maxWidth: '45%',
          marginTop: '10px',
        }}
      >
        Tercih ve ihtiyaçların doğrultusunda seçeceğin ürünlerden ve miktarlardan, sana özel bir paket oluşturalım.
      </p>

      {/* Flex container: sol ürünler ve sağ container aynı satırda */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {/* Sol taraf: ürünler */}
        <div style={{ flex: '0 0 45%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {/* Kategori Seçenekleri */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            {['Menstrüel Ürünler', 'Destekleyici Ürünler'].map((category) => {
              const isSelected =
                (category === 'Menstrüel Ürünler' && selectedCategory === 'menstrual') ||
                (category === 'Destekleyici Ürünler' && selectedCategory === 'support');

              return (
                <div
                  key={category}
                  onClick={() =>
                    setSelectedCategory(category === 'Menstrüel Ürünler' ? 'menstrual' : 'support')
                  }
                  style={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    flex: 1,
                  }}
                >
                  <div style={{ fontWeight: '500', fontSize: '1rem', marginBottom: '8px' }}>{category}</div>
                  <div
                    style={{
                      height: '3px',
                      width: '100%',
                      backgroundColor: isSelected ? '#000' : '#ccc',
                      transition: 'all 0.3s ease',
                    }}
                  ></div>
                </div>
              );
            })}
          </div>

         {/* Ürün listesi */}
  {selectedCategory === 'menstrual' && (
    <>
      <AccordionItem
        product="Beije Ped"
        icon="🩸"
        items={['Standart Ped', 'Super Ped', 'Premium Ped']}
        description="Çoğu beije kullanıcısı normal yoğunlukta bir regl dönemi için abonelik paketinde 20 Standart, 20 Süper Ped tercih ediyor."
        step={10} 
        defaultOpen={true}
      />

      <AccordionItem
        product="Günlük Ped"
        icon="🌸"
        items={['Günlük Ped', 'Süper Günlük Ped', 'Tanga Günlük Ped']}
        description="Kullanıcılarımızın %68'i akıntıları olan günlerde Standart Günlük Ped'i, regllerinin son günlerinde veya daha yoğun akıntıları olan günlerde ise Süper Günlük Ped'i tercih ediyor."
        step={10} 
      />
      <AccordionItem
        product="Beije Tampon"
        icon="🩸"
        items={['Mini Tampon', 'Standart Tampon', 'Süper Tampon']}
        description="Beije Tampon, günlük kullanım için ideal ve konforludur."
        step={10} 
      />
      
    </>
  )}

        {selectedCategory === 'support' && (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
    <AccordionItem
      product="Isı Bandı"
      icon="🧻"
      items={['2 li Isı Bandı', '4 lü Isı Bandı']}
      description="Isı Bandı'nı hem kas ağrıların hem de regl ağrıların için kullanabilirsin!"
       step={1}
    />
    <AccordionItem
      product="Beije Cycle Essentials"
      icon="👜"
      items={['Beije Cycle Essentials']}
      description="Cycle Essentials'ın bir şişesi, iki aylık döngüne yetecek miktarda, 32 kapsül içerir."
       step={1}
    />
    <AccordionItem
      product="Beije Cranberry Essentials"
      icon="🔥"
      items={['Beije Cranberry Essentials']}
      description="Cranberry Essentials'ın bir şişesi, tamamı vegan bileşenlerden oluşan 30 kapsül içerir."
       step={1}
    />
  </div>
)}


        </div>

       {/* Sağ taraf: Özel Paketim */}
<div
  style={{
    flex: '0 0 45%',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    minWidth: '200px',
    marginTop: '-120px',
    marginLeft: '42px',
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  }}
>
  
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <h2 style={{ fontWeight: 600, fontSize: '1.5rem', margin: 0 }}>
      Özel Paketim
    </h2>
    <div
      style={{
        backgroundColor: 'rgb(210, 231, 224)',
        padding: '4px 10px',
        borderRadius: '8px',
        whiteSpace: 'nowrap',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        transition:
          'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        fontSize: '0.9rem',
      }}
    >
      2 Ayda Bir Gönderim
    </div>
  </div>

  <p style={{ fontSize: '1rem', lineHeight: '1.5', marginBottom: '20px' }}>
    Kişisel ihtiyacına yönelik istediğin miktarda Ped, Günlük Ped, Tampon veya destekleyici ürünler ekleyerek kendine özel bir paket oluşturabilirsin.
  </p>
  {/* Seçilen ürünler listesi */}
{selectedItems.length > 0 && (
  <div style={{ marginBottom: '15px' }}>
    {selectedItems.map(([item, count]) => (
      <div
        key={item}
        style={{
          fontSize: '0.95rem',
          marginBottom: '6px',
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid #eee',
          paddingBottom: '4px'
        }}
      >
        <span>{item}</span>
        <strong>{count} adet</strong>
      </div>
    ))}
  </div>
)}

{/* Sepete Ekle Butonu:*/}
  <div
  style={{
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center', // ortala
  }}
>
  <button
  style={{
    backgroundColor: selectedItems.length > 0 ? '#999' : 'rgba(0, 0, 0, 0.12)', // seçilen varsa koyu gri
    color: selectedItems.length > 0 ? '#fff' : '#000', // seçilen varsa beyaz
    border: 'none',
    borderRadius: '45px',
    fontSize: '1rem',
    fontWeight: selectedItems.length > 0 ? 500 : 400, // hafif bold
    cursor: selectedItems.length > 0 ? 'pointer' : 'not-allowed',
    width: '90%',
    maxWidth: '300px',
    height: '40px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  }}
  disabled={selectedItems.length === 0}
>
  Sepete Ekle ({selectedItems.reduce((acc, [, count]) => acc + count, 0).toFixed(2)} TL)
</button>


</div>

</div>

      </div>
    </div>
  );
}