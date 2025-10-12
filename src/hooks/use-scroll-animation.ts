import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function useScrollAnimation(margin: string = '-100px') {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: margin as any });

  return { ref, isInView };
}
