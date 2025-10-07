import { useEffect } from "react";

export const useGoogleAnalytics = (measurementId) => {
  useEffect(() => {
    // Add GA4 script to <head>
    if (!window.gtag) {
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      window.gtag = gtag;

      gtag("js", new Date());
      gtag("config", measurementId, { send_page_view: true });
    }
  }, [measurementId]);
};
