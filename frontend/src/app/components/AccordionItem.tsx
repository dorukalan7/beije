'use client';
import { useState } from 'react';
import { usePackage } from '../store/PackageContext';
import PedIcon from './İcons/PedIcon';

interface AccordionItemProps {
  product: string;
  icon?: React.ReactNode;
  items: string[];
  description?: string;
  step?: number ;
  defaultOpen?: boolean;}

export default function AccordionItem({ product, icon, items ,description,step=1, defaultOpen=false}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { selectedOptions, toggleOption, counts, increment, decrement } = usePackage();

  const handleClick = () => {
    setIsOpen(!isOpen);
    toggleOption(product);
  };

 

  return (
    <div
      style={{
        marginBottom: '10px',
        width: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Başlık */}
      <div
        onClick={handleClick}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          padding: '16px',
          backgroundColor: selectedOptions.includes(product) ? '#f9f9f9' : '#fff',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 600,
          fontSize: '1.1rem',
          borderBottom: isOpen ? '1px solid #ddd' : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {icon && <span>{icon}</span>}
          <span>{product}</span>
        </div>

        <span
          style={{
            display: 'inline-block',
            width: '10px',
            height: '10px',
            borderLeft: '2px solid black',
            borderBottom: '2px solid black',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(-45deg)',
            transition: 'transform 0.3s ease',
          }}
        ></span>
      </div>

      {/* Açılır kısım */}
      <div
        style={{
          maxHeight: isOpen ? '400px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.4s ease',
          backgroundColor: '#fff',
        }}
      >
        {/* Üst yeşil kutu */}
        <div
          style={{
            backgroundColor: 'rgb(236, 241, 207)',
            borderRadius: '12px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: '0 16px',
          }}
        >
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '22px',
              height: '22px',
              backgroundColor: '#c3e6cc',
              borderRadius: '50%',
              fontSize: '14px',
            }}
          >
            💚
          </span>

          <p style={{ margin: 0, fontSize: '1.2rem', color: '#2d4739', lineHeight: '1.4' }}>
        {description || `Buraya ${product} ile ilgili detaylar veya alt seçenekler gelecek.`}
      </p>
        </div>

        {/* Alt: ürün satırları */}
        <div
          style={{
            marginTop: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            paddingTop: '16px',
            paddingBottom: '16px',
            marginLeft: '0px',
            marginRight: '16px',
          }}
        >
          {items.map(item => (
            <div
              key={item}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              {/* Sol kutucuk + ikon */}
              <div
                style={{
                  width: '60px',
                  height: '20px',
                  borderRadius: '0px 4px 4px 0px',
                  backgroundColor: 'rgb(239, 78, 37)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <PedIcon width={16} height={16} color="white" />
              </div>

              {/* Metin */}
              <span
                style={{
                  fontSize: '0.85rem',
                  color: '#333',
                  flexGrow: 1,
                  flexShrink: 1,
                  minWidth: 0,
                  wordBreak: 'break-word',
                  maxWidth: '70%',
                }}
              >
                {item}
              </span>

              {/* Sayaç */}
              <div
                style={{
                  width: '80px',
                  height: '32px',
                  borderRadius: '16px',
                  border: '1px solid #ccc',
                  backgroundColor: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 8px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  flexShrink: 0,
                  marginLeft: 'auto',
                }}
              >
                <span onClick={() => decrement(item, step)} style={{ userSelect: 'none' }}>-</span>
  <span>{counts[item] || 0}</span>
  <span onClick={() => increment(item, step)} style={{ userSelect: 'none' }}>+</span>
</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
