import { useState, useEffect } from 'react';
import { SCREEN_SIZE } from "../../../constants";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{width: number, height: number}>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Set initial size
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array ensures effect runs only once on mount

  return {
    windowSize,
    isSmallMobile: windowSize.width <= SCREEN_SIZE.SMALL_MOBILE[1],
    isTabletAndLargeMobile: windowSize.width <= SCREEN_SIZE.TABLET_AND_LARGE_MOBILE[1],
    isMediumTableAndSmallLaptop: windowSize.width <= SCREEN_SIZE.MEDIUM_TABLE_AND_SMALL_LAPTOP[1],
    isLargeLaptopsAndDesktops: windowSize.width <= SCREEN_SIZE.LARGE_LAPTOPS_AND_DESKTOPS[1],
    isExtraLarge: windowSize.width > SCREEN_SIZE.EXTRA_LARGE[0],
  };
}

export default useWindowSize;