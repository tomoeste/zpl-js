import { useEffect, useState } from "react";

export function useFontRefresh() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const checkFont = async () => {
      try {
        await document.fonts.load("12px JetBrains Mono");
        setFontLoaded(true);
      } catch (error) {
        console.error("Error loading font:", error);
      }
    };

    void checkFont();
  }, []);

  return fontLoaded;
}
