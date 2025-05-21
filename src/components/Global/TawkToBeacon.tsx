// components/TawkToChat.js
'use client'; // Add this if using Next.js App Router

import { useEffect } from 'react';
import Script from 'next/script';

export default function TawkToChat() {
    // This ensures the Tawk_API is initialized properly
    useEffect(() => {
        // Initialize Tawk_API if it doesn't exist
        (window as any).Tawk_API = (window as any).Tawk_API || {};
        (window as any).Tawk_LoadStart = new Date();
    }, []);

    return (
        <Script
            id="tawkto-widget"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/682dca5556f60b1911e69d9c/1irpdsoi4';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
        `,
            }}
        />
    );
}