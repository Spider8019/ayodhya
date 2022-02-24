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
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-5871634443514718"
     data-ad-slot="5091558897"></ins>
  );
}