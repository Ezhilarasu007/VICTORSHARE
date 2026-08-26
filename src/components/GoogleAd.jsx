import React, { useEffect } from 'react';

export function GoogleAdBanner({ slot = '9252815233', style = { display: 'inline-block', width: '728px', height: '90px' } }) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {}
  }, []);

  return (
    <div className="my-4 text-center overflow-hidden flex justify-center">
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-6751037211810646"
        data-ad-slot={slot}
      />
    </div>
  );
}

export function GoogleAdFeed({ slot = '9250719306' }) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {}
  }, []);

  return (
    <div className="my-6 text-center overflow-hidden">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="autorelaxed"
        data-ad-client="ca-pub-6751037211810646"
        data-ad-slot={slot}
      />
    </div>
  );
}

export function AmpAdBanner({ slot = '9250719306' }) {
  return (
    <div className="my-4 text-center overflow-hidden">
      <amp-ad
        width="100vw"
        height="320"
        type="adsense"
        data-ad-client="ca-pub-6751037211810646"
        data-ad-slot={slot}
        data-auto-format="mcrspv"
        data-full-width=""
      >
        <div overflow=""></div>
      </amp-ad>
    </div>
  );
}
