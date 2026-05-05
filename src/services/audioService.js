const GHANAIAN_PHRASES = {
  twi: {
    welcome: 'Akwaba! Mepɛ sɛ mebɔ wo amaanni sɛnea wo tomato dua no te.',
    takePhoto: 'Fa sɛn no na hwɛ tomato dua no nhaban no.',
    uploadPhoto: 'Fa nisɛnhama na hwɛ nhaban no.',
    analyzing: 'Resiesie nhaban no... Yɛbɛnya nkyerɛmu ntɛm.',
    healthy: 'Wo tomato dua no yɛ den. Ɔyare biara nni ho.',
    diseaseDetected: 'Yahu yare bi wo tomato dua no ho.',
    recommendations: 'Mpam a mede bɛma wo ni:',
    confidence: 'M abodin gyina ho sɛ',
    lowConfidence: 'Siesie nhaban foforo anaa fa kamera no na hwɛ yiye.',
    treatment: 'Kwan a woafa so:',
    prevention: 'Kwan a wobɛde atwe ara:',
    listen: 'Tie me',
    languageSelected: 'Woapaw Twi',
    severityLow: 'Yare no mmoa biara nni ho.',
    severityMedium: 'Yare no mmoa bi wɔ ho. Yɛɛ no ntɛm.',
    severityHigh: 'Yare no yɛ den paa. Yɛɛ no ntɛm ara!',
    noDisease: 'Wo dua no yare anaa ɔyɛ den. Mede anigye pɔw sɛ wo dua no yɛ den.'
  },
  ewe: {
    welcome: 'Woezon! Nyemateƒe abɔ amama si dzena tomate dua nye o.',
    takePhoto: 'Trɔ asi le ɖeɖefoto ŋu eye nàkpɔ aɖaɖawo dzi.',
    uploadPhoto: 'Tsɔ ɖeɖefoto aɖeke aɖe na eye nàkpɔ aɖaɖawo dzi.',
    analyzing: 'Miele analisis ŋu... Míadzi nyawo vava me.',
    healthy: 'Wò tomate dua le edzi. Mele yame aɖeke o.',
    diseaseDetected: 'Míekpɔ yame aɖeke le wò tomate dua dzi.',
    recommendations: 'Nɔnɔmetata siwo mele na wò:',
    confidence: 'Nye abodin si me le ŋgɔ le',
    lowConfidence: 'Trɔ asi le ɖeɖefoto bubu ŋu alo trɔ asi le kamera ŋu vava me.',
    treatment: 'Nutoa me:',
    prevention: 'Aƒeɖeƒe:',
    listen: 'Nàse nye gbɔgbɔ',
    languageSelected: 'Ewe wo tia',
    severityLow: 'Mele yame sia me dɔ aɖeke o.',
    severityMedium: 'Yame aɖeke le me. Trɔ asi le edzi vava me.',
    severityHigh: 'Yame sia le to. Trɔ asi le edzi vava me!',
    noDisease: 'Wò dua le edzi alo mele yame o. Nye dzi dzɔ si wò dua le edzi.'
  },
  ga: {
    welcome: 'Ojekoo! Mi hɛ nɛɛ akɛ ma shi bua shi lɛ ni tomato ablɛji lɛ nɛɛ.',
    takePhoto: 'Tsɔɔ shi na shi ablɛji lɛ.',
    uploadPhoto: 'Tsɔɔ shi fɛfɛɔ na shi ablɛji lɛ.',
    analyzing: 'Mi hɛ ablɛji lɛ... Mi ba tsɔɔ nii pii le ekomɛ.',
    healthy: 'Wɔ tomato shi yɛ fɛɛɛ. Akɛ shika bi nɛɛ mli.',
    diseaseDetected: 'Mi su shi a wɔ tomato shi mli.',
    recommendations: 'Mi nyɛmi kɛkɛ nɛɛ nɛɛ:',
    confidence: 'Mi shi shi si mi ni lɛ nɛɛ',
    lowConfidence: 'Tsɔɔ shi fɛfɛɔ bi anaa tsɔɔ camera na ma shi yɛ ma.',
    treatment: 'Kɛkɛ nɛɛ ma gblɛ:',
    prevention: 'Kɛkɛ nɛɛ ma bɛ:',
    listen: 'Hɛ mi',
    languageSelected: 'Ga wo tia',
    severityLow: 'Shika bi nɛɛ mli.',
    severityMedium: 'Shika bi nɛɛ mli. Yɛɛ ma shi bua le ekomɛ.',
    severityHigh: 'Shika lɛ yɛ bo! Yɛɛ ma shi bua le ekomɛ!',
    noDisease: 'Wɔ shi yɛ fɛɛɛ anaa shika bi nɛɛ mli. Mi nyɛmi kɛkɛ akɛ wɔ shi yɛ fɛɛɛ.'
  },
  en: {
    welcome: 'Welcome! Let me help you check your tomato plant health.',
    takePhoto: 'Take a photo of your tomato leaf to analyze.',
    uploadPhoto: 'Upload a photo of your tomato leaf.',
    analyzing: 'Analyzing the leaf... Results coming soon.',
    healthy: 'Your tomato plant looks healthy! No disease detected.',
    diseaseDetected: 'I found a disease on your tomato plant.',
    recommendations: 'Here are my recommendations:',
    confidence: 'My confidence level is',
    lowConfidence: 'Please try another photo or use the camera for better results.',
    treatment: 'Treatment:',
    prevention: 'Prevention:',
    listen: 'Listen to me',
    languageSelected: 'English selected',
    severityLow: 'Low risk detected.',
    severityMedium: 'Medium risk detected. Act soon.',
    severityHigh: 'High risk detected. Act immediately!',
    noDisease: 'Your plant is healthy or has no disease. I am happy your plant is healthy.'
  }
};

let isSpeaking = false;
let currentUtterance = null;

export function speak(text, lang = 'en') {
  if (!window.speechSynthesis) {
    console.warn('Speech synthesis not supported');
    return false;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Try to find appropriate voice
  const voices = window.speechSynthesis.getVoices();
  
  if (lang === 'twi') {
    const twiVoice = voices.find(v => v.lang.includes('ak') || v.lang.includes('GH'));
    if (twiVoice) utterance.voice = twiVoice;
    utterance.lang = 'ak-GH';
    utterance.rate = 0.8;
  } else if (lang === 'ewe') {
    const eweVoice = voices.find(v => v.lang.includes('ee'));
    if (eweVoice) utterance.voice = eweVoice;
    utterance.lang = 'ee';
    utterance.rate = 0.8;
  } else if (lang === 'ga') {
    const gaVoice = voices.find(v => v.lang.includes('gaa'));
    if (gaVoice) utterance.voice = gaVoice;
    utterance.lang = 'gaa';
    utterance.rate = 0.8;
  } else {
    const enVoice = voices.find(v => v.lang.includes('en') && v.lang.includes('GB'));
    if (enVoice) utterance.voice = enVoice;
    utterance.lang = 'en-GB';
    utterance.rate = 0.9;
  }

  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  utterance.onstart = () => { isSpeaking = true; };
  utterance.onend = () => { isSpeaking = false; currentUtterance = null; };
  utterance.onerror = () => { isSpeaking = false; currentUtterance = null; };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeaking() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
    isSpeaking = false;
    currentUtterance = null;
  }
}

export function isCurrentlySpeaking() {
  return isSpeaking;
}

export function getPhrase(key, lang = 'en') {
  return GHANAIAN_PHRASES[lang]?.[key] || GHANAIAN_PHRASES.en[key] || key;
}

export function speakPhrase(key, lang = 'en') {
  const phrase = getPhrase(key, lang);
  return speak(phrase, lang);
}

export function buildDiagnosisSpeech(disease, language, confidence, severity) {
  const phrases = GHANAIAN_PHRASES[language] || GHANAIAN_PHRASES.en;
  
  let text = '';
  
  if (disease.id === 'healthy') {
    text = phrases.healthy;
  } else {
    text = `${phrases.diseaseDetected} ${phrases.confidence} ${confidence} percent. `;
    
    if (severity === 'low') text += phrases.severityLow + ' ';
    else if (severity === 'medium') text += phrases.severityMedium + ' ';
    else if (severity === 'high' || severity === 'critical') text += phrases.severityHigh + ' ';
    
    text += phrases.recommendations + ' ';
    
    const recs = language === 'twi' ? disease.twiRecommendations :
                 language === 'ewe' ? disease.eweRecommendations :
                 language === 'ga' ? disease.gaRecommendations :
                 disease.recommendations;
    
    text += recs.join('. ') + '.';
  }
  
  return text;
}

export function initializeVoices() {
  if (window.speechSynthesis) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }
}
