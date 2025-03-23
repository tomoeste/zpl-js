import { useEffect, useState } from "react";

export function useFontRefresh() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const checkFont = async () => {
      try {
        await Promise.all([
          document.fonts.load("12px JetBrains Mono"),
          document.fonts.load("12px Roboto Condensed"),
        ]);
        setFontLoaded(true);
      } catch (error) {
        console.error("Error loading font:", error);
      }
    };

    void checkFont();
  }, []);

  return fontLoaded;
}
