import { useCallback, useMemo, useState } from 'react';

import { sha256 } from 'crypto-hash';

export const useGetFileHash = (): [
  string | undefined,
  (file: File) => void,
] => {
  const [hash, setHash] = useState<string | undefined>(undefined);

  const fileReader = useMemo(() => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      const binary = e.target?.result as ArrayBuffer;
      if (binary && binary instanceof ArrayBuffer) {
        const hash = await sha256(binary);
        setHash(hash);
      }
    };

    return reader;
  }, []);

  const read = useCallback(
    (file: File) => {
      fileReader.readAsArrayBuffer(file);
    },
    [fileReader],
  );

  return [hash, read];
};
