
import React from 'react';

interface CountryFlagProps {
  countryCode: string;
  className?: string;
  fallbackSize?: 'xs' | 'sm' | 'md' | 'lg';
}

export const CountryFlag: React.FC<CountryFlagProps> = ({ 
  countryCode, 
  className = 'w-5 h-4', 
  fallbackSize = 'md' 
}) => {
  const [hasError, setHasError] = React.useState(false);
  const countryEmoji = getCountryEmoji(countryCode);
  
  // Specific URL override for Slovakia
  const flagUrl = countryCode === 'SK' 
    ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Slovakia.svg/330px-Flag_of_Slovakia.svg.png'
    : `/flags/${countryCode.toLowerCase()}.svg`;
  
  // Map country codes to emoji fallbacks
  function getCountryEmoji(code: string): string {
    const emojiMap: Record<string, string> = {
      'SK': '🇸🇰',
      'CZ': '🇨🇿',
      'HU': '🇭🇺',
      'PL': '🇵🇱',
      'AT': '🇦🇹',
      'DE': '🇩🇪',
      'GB': '🇬🇧',
      'US': '🇺🇸',
      'IT': '🇮🇹',
      'ES': '🇪🇸',
      'FR': '🇫🇷'
    };
    return emojiMap[code] || '🏳️';
  }

  // Determine emoji size class
  const emojiSizeClass = {
    'xs': 'text-xs',
    'sm': 'text-sm',
    'md': 'text-base',
    'lg': 'text-lg'
  }[fallbackSize];

  if (hasError) {
    return <span className={emojiSizeClass}>{countryEmoji}</span>;
  }

  return (
    <img
      src={flagUrl}
      alt={`${countryCode} flag`}
      className={`object-cover rounded ${className}`}
      onError={() => setHasError(true)}
    />
  );
};
