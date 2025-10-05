'use client';
import { usePackage } from '../../store/PackageContext';

export default function PackageSummary() {
  const { selectedOptions } = usePackage();

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Selected Options:</h2>
      {selectedOptions.length === 0 ? (
        <p>No options selected.</p>
      ) : (
        <ul>
          {selectedOptions.map(opt => (
            <li key={opt}>{opt}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
