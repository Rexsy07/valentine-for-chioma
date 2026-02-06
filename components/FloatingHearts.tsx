
import React, { useEffect, useState } from 'react';

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; size: string; duration: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const left = Math.random() * 100 + '%';
      const size = (Math.random() * 20 + 10) + 'px';
      const duration = (Math.random() * 5 + 5) + 's';

      setHearts(prev => [...prev, { id, left, size, duration }]);

      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== id));
      }, 10000);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map(heart => (
        <span
          key={heart.id}
          className="heart-float text-rose-300"
          style={{
            left: heart.left,
            fontSize: heart.size,
            animationDuration: heart.duration
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
