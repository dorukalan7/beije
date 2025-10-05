'use client';
import { usePackage } from '../store/PackageContext';

interface PackageOptionProps {
  option: string;
}

export default function PackageOption({ option }: PackageOptionProps) {
  const { selectedOptions, toggleOption } = usePackage();
  const isSelected = selectedOptions.includes(option);

  return (
    <div
  onClick={() => toggleOption(option)}
  style={{
    borderRadius: '12px',
    border: '1px solid #ccc',
    padding: '20px',
    margin: '10px',
    cursor: 'pointer',
    minWidth: '120px',
    textAlign: 'center',
    backgroundColor: isSelected ? '#4ade80' : '#f9f9f9',
    boxShadow: isSelected ? '0 0 10px rgba(0,0,0,0.2)' : '0 0 5px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease-in-out',
  }}
>
  {option}
</div>
  );
}
