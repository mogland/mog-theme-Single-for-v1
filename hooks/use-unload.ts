/*
 * @FilePath: /nx-theme-Single/hooks/use-unload.ts
 * @author: Wibus
 * @Date: 2022-08-17 22:30:44
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-17 22:30:44
 * Coding With IU
 */

import { useRef, useEffect } from "react";

const useUnload = fn => {
  const cb = useRef(fn);

  useEffect(() => {
    const onUnload = cb.current;
    window.addEventListener('beforeunload', onUnload);
    return () => {
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [cb]);
};

export default useUnload;