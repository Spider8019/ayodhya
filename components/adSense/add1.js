import React, { useEffect } from "react";

export default function Adsense() {
  const loadAds = () => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.log("adsense error", error.message);
    }
  };

  useEffect(() => {
    loadAds();
  }, []);

  return (
    <ins className="adsbygoogle"
         style="display:block"
         data-ad-format="fluid"
         data-ad-layout-key="-6p+dg+58-2b-89"
         data-ad-client="ca-pub-5871634443514718"
         data-ad-slot="1580184139">
    </ins>
  );
}