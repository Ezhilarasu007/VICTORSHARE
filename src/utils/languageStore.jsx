// Global Multi-Language System for VictorShare
import React, { createContext, useContext, useState } from 'react';

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ta', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
  { code: 'hi', name: 'हिंदी (Hindi)', flag: '🇮🇳' },
  { code: 'es', name: 'Español (Spanish)', flag: '🇪🇸' },
  { code: 'fr', name: 'Français (French)', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch (German)', flag: '🇩🇪' },
  { code: 'ja', name: '日本語 (Japanese)', flag: '🇯🇵' },
  { code: 'zh', name: '中文 (Chinese)', flag: '🇨🇳' }
];

export const TRANSLATIONS = {
  en: {
    title: 'Universal P2P File & Video Transfer',
    subtitle: 'Share 10MB to 100GB files instantly between iOS, Android, Windows & Mac',
    send: 'Send File',
    receive: 'Receive File',
    compress: 'Video Compressor',
    history: 'Transfer History',
    donate: 'Donate / Support',
    donateDesc: 'Support VictorShare development via UPI (GPay / PhonePe / Paytm)',
    enterPin: 'Enter 6-Digit Transfer PIN',
    uploadTitle: 'Tap to Add Real File or Video',
    uploadDesc: 'Select Videos, Photos, Documents, Audio, or Folders (10MB to 100GB)',
    autoCode: 'Auto-Generated Transfer Code',
    copyCode: 'Copy Code',
    copyLink: 'Copy Share Link',
    downloadNow: 'START FAST P2P DOWNLOAD NOW',
    saveToDevice: 'Save to Device Storage',
    shareSheet: 'iOS / Android Share Sheet',
    terms: 'Terms & Conditions',
    privacy: 'Privacy Policy',
    about: 'About Us',
    contact: 'Contact Us',
    contactEmail: 'arasu9629hf@gmail.com',
    upiId: 'arasu9629hf@okhdfcbank'
  },
  ta: {
    title: 'உலகளாவிய P2P கோப்பு & வீடியோ பகிர்வு',
    subtitle: '10MB முதல் 100GB வரையிலான கோப்புகளை iOS, Android, Windows & Mac இடையே நொடிகளில் பகிருங்கள்',
    send: 'கோப்பை அனுப்புக',
    receive: 'கோப்பை பெறுக',
    compress: 'வீடியோ சுருக்கி',
    history: 'பகிர்வு வரலாறு',
    donate: 'நன்கொடை / ஆதரவு',
    donateDesc: 'VictorShare வளர்ச்சியை UPI (GPay / PhonePe) மூலம் ஆதரிக்கவும்',
    enterPin: '6 இலக்க PIN குறியீட்டை உள்ளிடவும்',
    uploadTitle: 'வீடியோ அல்லது கோப்பை சேர்க்க தொடவும்',
    uploadDesc: 'வீடியோக்கள், புகைப்படங்கள், ஆவணங்கள், ஆடியோவை தேர்ந்தெடுக்கவும்',
    autoCode: 'தானாக உருவாக்கப்பட்ட PIN குறியீடு',
    copyCode: 'குறியீட்டை நகலெடு',
    copyLink: 'பகிர்வு இணைப்பை நகலெடு',
    downloadNow: 'வேகமாக பதிவிறக்க தொடங்கவும்',
    saveToDevice: 'சாதன சேமிப்பகத்தில் சேமிக்கவும்',
    shareSheet: 'பகிர்வு மெனு',
    terms: 'விதிகள் & நிபந்தனைகள்',
    privacy: 'தனியுரிமைக் கொள்கை',
    about: 'எங்களைப் பற்றி',
    contact: 'தொடர்புகொள்ள',
    contactEmail: 'arasu9629hf@gmail.com',
    upiId: 'arasu9629hf@okhdfcbank'
  },
  hi: {
    title: 'यूनिवर्सल P2P फाइल और वीडियो ट्रांसफर',
    subtitle: 'iOS, Android, Windows और Mac के बीच 10MB से 100GB की फाइलें तुरंत शेयर करें',
    send: 'फाइल भेजें',
    receive: 'फाइल प्राप्त करें',
    compress: 'वीडियो कंप्रेसर',
    history: 'ट्रांसफर इतिहास',
    donate: 'दान / सहायता करें',
    donateDesc: 'UPI (GPay / PhonePe) द्वारा VictorShare का समर्थन करें',
    enterPin: '6-अंकों का ट्रांसफर PIN दर्ज करें',
    uploadTitle: 'फाइल या वीडियो जोड़ने के लिए टैप करें',
    uploadDesc: 'वीडियो, फोटो, दस्तावेज, ऑडियो या फोल्डर चुनें',
    autoCode: 'ऑटो-जनरेटेड ट्रांसफर कोड',
    copyCode: 'कोड कॉपी करें',
    copyLink: 'शेयर लिंक कॉपी करें',
    downloadNow: 'तेज़ P2P डाउनलोड शुरू करें',
    saveToDevice: 'डिवाइस स्टोरेज में सहेजें',
    shareSheet: 'शेयर मेनू',
    terms: 'नियम और शर्तें',
    privacy: 'गोपनीयता नीति',
    about: 'हमारे बारे में',
    contact: 'संपर्क करें',
    contactEmail: 'arasu9629hf@gmail.com',
    upiId: 'arasu9629hf@okhdfcbank'
  },
  es: {
    title: 'Transferencia Universal P2P de Archivos y Videos',
    subtitle: 'Comparte archivos de 10MB a 100GB al instante entre iOS, Android, Windows y Mac',
    send: 'Enviar Archivo',
    receive: 'Recibir Archivo',
    compress: 'Compresor de Video',
    history: 'Historial',
    donate: 'Donar / Apoyar',
    donateDesc: 'Apoya el desarrollo de VictorShare vía UPI',
    enterPin: 'Ingresa el PIN de 6 dígitos',
    uploadTitle: 'Toca para agregar archivo o video',
    uploadDesc: 'Selecciona videos, fotos, documentos o carpetas',
    autoCode: 'Código generado automáticamente',
    copyCode: 'Copiar Código',
    copyLink: 'Copiar Enlace',
    downloadNow: 'INICIAR DESCARGA RÁPIDA P2P',
    saveToDevice: 'Guardar en el Dispositivo',
    shareSheet: 'Compartir',
    terms: 'Términos y Condiciones',
    privacy: 'Política de Privacidad',
    about: 'Sobre Nosotros',
    contact: 'Contacto',
    contactEmail: 'arasu9629hf@gmail.com',
    upiId: 'arasu9629hf@okhdfcbank'
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const t = (key) => {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS['en'];
    return dict[key] || TRANSLATIONS['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
