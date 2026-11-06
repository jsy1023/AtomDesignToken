import React, { useState } from 'react';

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'busy';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  fallback,
  size = 'md',
  status,
  className = '',
}) => {
  const [hasError, setHasError] = useState(!src);

  return (
    <div className={`atom-avatar atom-avatar-${size} ${className}`}>
      {src && !hasError ? (
        <img src={src} alt={alt} onError={() => setHasError(true)} className="atom-avatar-img" />
      ) : (
        <span className="atom-avatar-fallback">{fallback || alt.slice(0, 2).toUpperCase()}</span>
      )}
      {status && <span className={`atom-avatar-status atom-avatar-status-${status}`} />}
    </div>
  );
};
