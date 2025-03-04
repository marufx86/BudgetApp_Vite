
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  prefix?: string;
  className?: string;
  formatter?: (value: number) => string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 500,
  prefix = "",
  className,
  formatter = (value) => value.toFixed(2),
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startValue = displayValue;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentValue = startValue + progress * (value - startValue);
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    setAnimationKey(prev => prev + 1);
    requestAnimationFrame(animate);
    
    return () => {
      startTime = null;
    };
  }, [value, duration]);

  return (
    <span 
      className={cn("inline-block overflow-hidden", className)} 
      key={animationKey}
    >
      <span className="animate-number-animate inline-block">
        {prefix}{formatter(displayValue)}
      </span>
    </span>
  );
};

export default AnimatedNumber;
