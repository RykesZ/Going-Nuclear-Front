import { useState } from 'react';

function Loading() {
  const [loadingString, updateLoadingString] = useState('Chargement');
  const [dotCount, setDotCount] = useState(0);

  const loadingStringAnimation = () => {
    setTimeout(() => {
      switch (dotCount) {
        case 0:
          updateLoadingString('Chargement.');
          setDotCount(1);
          break;
        case 1:
          updateLoadingString('Chargement..');
          setDotCount(2);
          break;
        case 2:
          updateLoadingString('Chargement...');
          setDotCount(3);
          break;
        case 3:
          updateLoadingString('Chargement');
          setDotCount(0);
          break;
        default:
          console.log('Something is wrong with loading');
      }
    }, 1000);
  };

  loadingStringAnimation();

  return <div className="chargement">{loadingString}</div>;
}

export default Loading;
