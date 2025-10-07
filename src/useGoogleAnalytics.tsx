declare global {
    interface Window {
      dataLayer: any[];
      gtag: (...args: any[]) => void;
    }
  }
  
  import { useEffect } from "react";
  
  export const useGoogleAnalytics = (measurementId: string): void => {
    useEffect(() => {
      if (!window.gtag) {
        const script = document.createElement("script");
        script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        script.async = true;
        document.head.appendChild(script);
  
        window.dataLayer = window.dataLayer || [];
        
        function gtag(...args: any[]) { 
          window.dataLayer.push(args); 
        } 
        window.gtag = gtag;
      }
  
      setTimeout(() => {
          if (window.gtag) {
              window.gtag("js", new Date());
              window.gtag("config", measurementId, { send_page_view: true });
          }
      }, 100);
  
    }, [measurementId]);
  };
  