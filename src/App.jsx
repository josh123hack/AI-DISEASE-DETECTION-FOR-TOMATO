import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Camera, Upload, Leaf, AlertTriangle, CheckCircle, Volume2, VolumeX,
  ChevronLeft, History, Info, Languages, Loader, Microscope, Heart,
  Shield, Droplets, Sun, Wind, Thermometer, Sprout, X, Sparkles
} from 'lucide-react';
import { TOMATO_DISEASES, DISEASE_ORDER, SEVERITY_COLORS, SEVERITY_LABELS, LANGUAGE_LABELS } from './data/diseases';
import { analyzeImage, loadModel } from './services/aiModel';
import {
  speak, stopSpeaking, speakPhrase, buildDiagnosisSpeech,
  initializeVoices, getPhrase, isCurrentlySpeaking
} from './services/audioService';

const STORAGE_KEY = 'tomatoguard_history';
const LANGUAGE_KEY = 'tomatoguard_language';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem(LANGUAGE_KEY) || 'en';
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });
  const [modelLoaded, setModelLoaded] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showDiseaseInfo, setShowDiseaseInfo] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    initializeVoices();
    loadModel().then(() => setModelLoaded(true)).catch(() => setModelLoaded(true));
  }, []);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setShowLanguageMenu(false);
    speakPhrase('languageSelected', lang);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
        setScreen('preview');
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraActive(true);
      setScreen('camera');
    } catch {
      // Fallback: open file picker
      fileInputRef.current?.click();
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setSelectedImage(dataUrl);
    stopCamera();
    setScreen('preview');
  };

  const runAnalysis = async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    setScreen('analyzing');
    speakPhrase('analyzing', language);

    try {
      const img = new Image();
      img.src = selectedImage;
      await new Promise((resolve) => { img.onload = resolve; });

      const result = await analyzeImage(img);
      const disease = TOMATO_DISEASES[result.topDisease];
      
      const analysisResult = {
        ...result,
        disease,
        timestamp: new Date().toISOString(),
        image: selectedImage
      };

      setAnalysis(analysisResult);
      setHistory(prev => [analysisResult, ...prev].slice(0, 50));
      
      const speech = buildDiagnosisSpeech(disease, language, result.confidence, disease.severity);
      speak(speech, language);
      setIsSpeaking(true);
      
      setScreen('results');
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysis({
        topDisease: 'healthy',
        confidence: 50,
        disease: TOMATO_DISEASES.healthy,
        timestamp: new Date().toISOString(),
        image: selectedImage,
        error: true
      });
      setScreen('results');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const goHome = () => {
    stopSpeaking();
    setIsSpeaking(false);
    setSelectedImage(null);
    setAnalysis(null);
    setScreen('home');
  };

  const toggleSpeech = () => {
    if (isCurrentlySpeaking()) {
      stopSpeaking();
      setIsSpeaking(false);
    } else if (analysis) {
      const speech = buildDiagnosisSpeech(
        analysis.disease,
        language,
        analysis.confidence,
        analysis.disease.severity
      );
      speak(speech, language);
      setIsSpeaking(true);
    }
  };

  const deleteHistoryItem = (index) => {
    setHistory(prev => prev.filter((_, i) => i !== index));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  // --- Screens ---

  const renderHome = () => (
    <div className="flex flex-col min-h-screen bg-leaf-50">
      <header className="bg-leaf-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-lg">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">TomatoGuard</h1>
              <p className="text-xs text-leaf-100">
                {language === 'twi' ? 'AI a ɛbɔ tomato dua no ho amannɛ' :
                 language === 'ewe' ? 'AI tomate dua dzi dɔdɔdɔ' :
                 language === 'ga' ? 'AI a ma shi bua tomato shi' :
                 'AI Disease Detection'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition"
          >
            <Languages className="w-5 h-5" />
          </button>
        </div>
      </header>

      {showLanguageMenu && (
        <div className="bg-white shadow-md border-b border-leaf-100">
          {Object.entries(LANGUAGE_LABELS).map(([code, label]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={`w-full text-left px-4 py-3 hover:bg-leaf-50 flex items-center gap-3 transition ${
                language === code ? 'bg-leaf-50 text-leaf-700 font-medium' : ''
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-leaf-100 flex items-center justify-center text-xs font-bold text-leaf-700">
                {code.toUpperCase()}
              </span>
              {label}
              {language === code && <CheckCircle className="w-4 h-4 ml-auto text-leaf-500" />}
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center p-6 gap-8">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-leaf-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Microscope className="w-12 h-12 text-leaf-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {language === 'twi' ? 'Hwɛ Tomato Dua No' :
             language === 'ewe' ? 'Kpɔ Tomate Dua dzi' :
             language === 'ga' ? 'Shi Tomato Shi' :
             'Check Your Tomato Plant'}
          </h2>
          <p className="text-gray-600 text-sm">
            {language === 'twi' ? 'Fa sɛn anaa nisɛnhama na hwɛ nhaban no' :
             language === 'ewe' ? 'Trɔ asi le kamera alo upload ŋu' :
             language === 'ga' ? 'Tsɔɔ camera anaa shi fɛfɛɔ' :
             'Use your camera or upload a photo to detect diseases'}
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <button
            onClick={startCamera}
            className="flex items-center justify-center gap-3 bg-leaf-600 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg hover:bg-leaf-700 active:scale-95 transition"
          >
            <Camera className="w-6 h-6" />
            <span>
              {language === 'twi' ? 'Fa Sɛn' :
               language === 'ewe' ? 'Trɔ Kamera' :
               language === 'ga' ? 'Tsɔɔ Shi' :
               'Take Photo'}
            </span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-3 bg-white border-2 border-leaf-300 text-leaf-700 py-4 px-6 rounded-2xl font-semibold shadow-md hover:bg-leaf-50 active:scale-95 transition"
          >
            <Upload className="w-6 h-6" />
            <span>
              {language === 'twi' ? 'Fa Nisɛnhama' :
               language === 'ewe' ? 'Upload Foto' :
               language === 'ga' ? 'Tsɔɔ Shi Fɛfɛɔ' :
               'Upload Photo'}
            </span>
          </button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setScreen('history')}
            className="flex items-center gap-2 text-gray-500 hover:text-leaf-600 transition text-sm"
          >
            <History className="w-4 h-4" />
            {language === 'twi' ? 'Abakɔsɛm' : language === 'ewe' ? 'Nutoa me' : language === 'ga' ? 'Gblɛ Kɛkɛ' : 'History'}
          </button>
          <button
            onClick={() => setScreen('diseases')}
            className="flex items-center gap-2 text-gray-500 hover:text-leaf-600 transition text-sm"
          >
            <Info className="w-4 h-4" />
            {language === 'twi' ? 'Yare Ho Nsɛm' : language === 'ewe' ? 'Yame Kpɔkpɔ' : language === 'ga' ? 'Shika Nɛɛ' : 'Diseases'}
          </button>
        </div>
      </div>

      <div className="bg-white p-4 text-center text-xs text-gray-400 border-t border-leaf-100">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Sparkles className="w-3 h-3" />
          <span>AI-Powered | Offline Ready</span>
        </div>
        <span>Works on any smartphone - no internet needed</span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );

  const renderCamera = () => (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="relative flex-1 flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <button
            onClick={() => { stopCamera(); goHome(); }}
            className="bg-black/50 text-white p-2 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <button
            onClick={capturePhoto}
            className="w-20 h-20 bg-white rounded-full border-4 border-leaf-500 shadow-lg active:scale-95 transition"
          />
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );

  const renderPreview = () => (
    <div className="flex flex-col min-h-screen bg-leaf-50">
      <header className="bg-leaf-600 text-white p-4 shadow-lg flex items-center gap-3">
        <button onClick={() => { setSelectedImage(null); goHome(); }} className="p-2 hover:bg-white/20 rounded-lg transition">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">
          {language === 'twi' ? 'Nhwɛso' : language === 'ewe' ? 'Kpɔkpɔ' : language === 'ga' ? 'Shi' : 'Preview'}
        </h1>
      </header>

      <div className="flex-1 p-4 flex flex-col gap-4">
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
          <img src={selectedImage} alt="Leaf" className="w-full h-64 object-cover" />
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={runAnalysis}
            disabled={isAnalyzing}
            className="flex items-center justify-center gap-3 bg-leaf-600 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg hover:bg-leaf-700 active:scale-95 transition disabled:opacity-50"
          >
            <Microscope className="w-6 h-6" />
            <span>
              {language === 'twi' ? 'Hwehwɛ Yare' :
               language === 'ewe' ? 'Di Yame Dzi' :
               language === 'ga' ? 'Shi Shika' :
               'Analyze Plant'}
            </span>
          </button>

          <button
            onClick={() => { setSelectedImage(null); startCamera(); }}
            className="flex items-center justify-center gap-3 bg-white border-2 border-leaf-300 text-leaf-700 py-3 px-6 rounded-2xl font-semibold hover:bg-leaf-50 transition"
          >
            <Camera className="w-5 h-5" />
            <span>
              {language === 'twi' ? 'Fa Sɛn Foforo' :
               language === 'ewe' ? 'Trɔ Kamera Gbeƒã' :
               language === 'ga' ? 'Tsɔɔ Shi Foforo' :
               'Retake Photo'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderAnalyzing = () => (
    <div className="flex flex-col min-h-screen bg-leaf-50 items-center justify-center p-6">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-leaf-200 rounded-full" />
          <div className="absolute inset-0 border-4 border-leaf-500 rounded-full border-t-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Microscope className="w-10 h-10 text-leaf-600" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {language === 'twi' ? 'Resiesie...' :
           language === 'ewe' ? 'Miele Analisis ŋu...' :
           language === 'ga' ? 'Mi Hɛ Shi...' :
           'Analyzing...'}
        </h2>
        <p className="text-gray-500 text-sm">
          {language === 'twi' ? 'AI no rehwɛ nhaban no so' :
           language === 'ewe' ? 'AI le aɖaɖawo dzi dɔdɔ' :
           language === 'ga' ? 'AI ma shi bua ablɛji lɛ' :
           'AI is scanning your leaf for diseases'}
        </p>
      </div>
    </div>
  );

  const renderResults = () => {
    if (!analysis) return null;
    const { disease, confidence, topDisease } = analysis;
    const isHealthy = topDisease === 'healthy';
    const severityColor = SEVERITY_COLORS[disease.severity];
    const severityLabel = SEVERITY_LABELS[disease.severity];
    
    const recs = language === 'twi' ? disease.twiRecommendations :
                 language === 'ewe' ? disease.eweRecommendations :
                 language === 'ga' ? disease.gaRecommendations :
                 disease.recommendations;

    return (
      <div className="flex flex-col min-h-screen bg-leaf-50">
        <header className="bg-leaf-600 text-white p-4 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={goHome} className="p-2 hover:bg-white/20 rounded-lg transition">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold">
              {language === 'twi' ? 'Nsɛm a Wohu' :
               language === 'ewe' ? 'Nya Siwo Wo Xlẽ' :
               language === 'ga' ? 'Nii a Mi Su Shi' :
               'Results'}
            </h1>
          </div>
          <button
            onClick={toggleSpeech}
            className="p-2 hover:bg-white/20 rounded-lg transition"
          >
            {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          {/* Status Banner */}
          <div className={`p-4 text-white ${isHealthy ? 'bg-green-500' : 'bg-red-500'}`}>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                {isHealthy ? <CheckCircle className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
              </div>
              <div>
                <h2 className="text-lg font-bold">
                  {language === 'twi' ? disease.twiName :
                   language === 'ewe' ? disease.eweName :
                   language === 'ga' ? disease.gaName :
                   disease.name}
                </h2>
                <p className="text-sm opacity-90">
                  {isHealthy ?
                    (language === 'twi' ? 'Dua no yɛ den' :
                     language === 'ewe' ? 'Dua le edzi' :
                     language === 'ga' ? 'Shi yɛ fɛɛɛ' :
                     'Plant is healthy') :
                    `${severityLabel} - ${confidence}% confidence`
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="p-4">
            <div className="bg-white rounded-2xl overflow-hidden shadow-md">
              <img src={selectedImage} alt="Analyzed leaf" className="w-full h-48 object-cover" />
            </div>
          </div>

          {/* Symptoms */}
          {!isHealthy && (
            <div className="px-4 mb-4">
              <div className="bg-white rounded-2xl p-4 shadow-md">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  {language === 'twi' ? 'Asetra' :
                   language === 'ewe' ? 'Asetra Siwo Wo Xlẽ' :
                   language === 'ga' ? 'Shi Shi' :
                   'Symptoms'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'twi' ? disease.twiSymptoms || disease.symptoms :
                   language === 'ewe' ? disease.eweSymptoms || disease.symptoms :
                   language === 'ga' ? disease.gaSymptoms || disease.symptoms :
                   disease.symptoms}
                </p>
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div className="px-4 mb-4">
            <div className="bg-white rounded-2xl p-4 shadow-md">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-leaf-600" />
                {language === 'twi' ? 'Mpam a Wɔde Ma' :
                 language === 'ewe' ? 'Nɔnɔmetata' :
                 language === 'ga' ? 'Nyɛmi Kɛkɛ' :
                 'Recommendations'}
              </h3>
              <div className="space-y-2">
                {recs.map((rec, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-leaf-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-leaf-700">{i + 1}</span>
                    </div>
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Treatment & Prevention */}
          {!isHealthy && (
            <div className="px-4 mb-4 space-y-4">
              <div className="bg-white rounded-2xl p-4 shadow-md">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  {language === 'twi' ? 'Kwan a Wofa So' :
                   language === 'ewe' ? 'Nutoa me' :
                   language === 'ga' ? 'Kɛkɛ a Ma Gblɛ' :
                   'Treatment'}
                </h3>
                <p className="text-gray-600 text-sm">{disease.treatment}</p>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-md">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-green-500" />
                  {language === 'twi' ? 'Kwan a Wɔde Bɛtwe' :
                   language === 'ewe' ? 'Aƒeɖeƒe' :
                   language === 'ga' ? 'Kɛkɛ a Ma Bɛ' :
                   'Prevention'}
                </h3>
                <p className="text-gray-600 text-sm">{disease.prevention}</p>
              </div>
            </div>
          )}

          {/* Confidence Chart */}
          {!isHealthy && (
            <div className="px-4 mb-4">
              <div className="bg-white rounded-2xl p-4 shadow-md">
                <h3 className="font-bold text-gray-800 mb-3">Detection Confidence</h3>
                <div className="space-y-2">
                  {DISEASE_ORDER.map(d => {
                    const score = analysis.allScores[d] || 0;
                    const isTop = d === topDisease;
                    const dInfo = TOMATO_DISEASES[d];
                    return (
                      <div key={d} className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-24 truncate">
                          {language === 'twi' ? dInfo.twiName :
                           language === 'ewe' ? dInfo.eweName :
                           language === 'ga' ? dInfo.gaName :
                           dInfo.name}
                        </span>
                        <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isTop ? 'bg-leaf-500' : 'bg-gray-300'
                            }`}
                            style={{ width: `${score * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 w-10 text-right">{Math.round(score * 100)}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="px-4 pb-6 space-y-3">
            <button
              onClick={() => { setSelectedImage(null); startCamera(); }}
              className="w-full flex items-center justify-center gap-3 bg-leaf-600 text-white py-4 rounded-2xl font-semibold shadow-lg hover:bg-leaf-700 active:scale-95 transition"
            >
              <Camera className="w-5 h-5" />
              {language === 'twi' ? 'Hwe Dua Foforo' :
               language === 'ewe' ? 'Kpɔ Dua Bubu' :
               language === 'ga' ? 'Shi Shi Foforo' :
               'Check Another Plant'}
            </button>

            <button
              onClick={goHome}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-leaf-300 text-leaf-700 py-3 rounded-2xl font-semibold hover:bg-leaf-50 transition"
            >
              <HomeIcon />
              {language === 'twi' ? 'Fie' :
               language === 'ewe' ? 'Dziƒe' :
               language === 'ga' ? 'Wolo' :
               'Home'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderHistory = () => (
    <div className="flex flex-col min-h-screen bg-leaf-50">
      <header className="bg-leaf-600 text-white p-4 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={goHome} className="p-2 hover:bg-white/20 rounded-lg transition">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">
            {language === 'twi' ? 'Abakɔsɛm' :
             language === 'ewe' ? 'Nutoa me' :
             language === 'ga' ? 'Gblɛ Kɛkɛ' :
             'History'}
          </h1>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-sm bg-white/20 px-3 py-1 rounded-lg hover:bg-white/30 transition"
          >
            {language === 'twi' ? 'Pepa' : language === 'ewe' ? 'Ɣla' : language === 'ga' ? 'Kwɛɛ' : 'Clear'}
          </button>
        )}
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        {history.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>
              {language === 'twi' ? 'Abakɔsɛm biara nni ho' :
               language === 'ewe' ? 'Nutoa me aɖeke meli o' :
               language === 'ga' ? 'Gblɛ kɛkɛ bi nɛɛ mli' :
               'No history yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item, index) => {
              const d = TOMATO_DISEASES[item.topDisease];
              const isHealthy = item.topDisease === 'healthy';
              return (
                <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-md">
                  <div className="flex gap-3 p-3">
                    <img src={item.image} alt="" className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ background: SEVERITY_COLORS[d.severity] }}
                        />
                        <span className="font-semibold text-gray-800 text-sm truncate">
                          {language === 'twi' ? d.twiName :
                           language === 'ewe' ? d.eweName :
                           language === 'ga' ? d.gaName :
                           d.name}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </p>
                      {!isHealthy && (
                        <p className="text-xs text-leaf-600 font-medium">
                          {item.confidence}% confidence
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => deleteHistoryItem(index)}
                      className="p-2 text-gray-400 hover:text-red-500 transition self-start"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  const renderDiseases = () => (
    <div className="flex flex-col min-h-screen bg-leaf-50">
      <header className="bg-leaf-600 text-white p-4 shadow-lg flex items-center gap-3">
        <button onClick={goHome} className="p-2 hover:bg-white/20 rounded-lg transition">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">
          {language === 'twi' ? 'Yare a Ɛtumi Aba Tomato Dua No So' :
           language === 'ewe' ? 'Tomate Dua Ƒe Yame Siwo Le' :
           language === 'ga' ? 'Tomato Shi Shika Siwo Nɛɛ' :
           'Tomato Diseases Guide'}
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {DISEASE_ORDER.map(diseaseId => {
          const d = TOMATO_DISEASES[diseaseId];
          return (
            <button
              key={diseaseId}
              onClick={() => setShowDiseaseInfo(diseaseId)}
              className="w-full bg-white rounded-2xl p-4 shadow-md text-left hover:shadow-lg transition flex items-center gap-3"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: SEVERITY_COLORS[d.severity] + '20' }}
              >
                <AlertTriangle className="w-5 h-5" style={{ color: SEVERITY_COLORS[d.severity] }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 text-sm">
                  {language === 'twi' ? d.twiName :
                   language === 'ewe' ? d.eweName :
                   language === 'ga' ? d.gaName :
                   d.name}
                </h3>
                <p className="text-xs text-gray-500 truncate">{d.symptoms.substring(0, 60)}...</p>
              </div>
              <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180 flex-shrink-0" />
            </button>
          );
        })}
      </div>

      {showDiseaseInfo && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">
            {(() => {
              const d = TOMATO_DISEASES[showDiseaseInfo];
              return (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">
                      {language === 'twi' ? d.twiName :
                       language === 'ewe' ? d.eweName :
                       language === 'ga' ? d.gaName :
                       d.name}
                    </h2>
                    <button
                      onClick={() => setShowDiseaseInfo(null)}
                      className="p-2 hover:bg-gray-100 rounded-full transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4"
                    style={{
                      background: SEVERITY_COLORS[d.severity] + '20',
                      color: SEVERITY_COLORS[d.severity]
                    }}
                  >
                    <AlertTriangle className="w-4 h-4" />
                    {SEVERITY_LABELS[d.severity]}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500" /> Symptoms
                      </h3>
                      <p className="text-sm text-gray-600">{d.symptoms}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-blue-500" /> Treatment
                      </h3>
                      <p className="text-sm text-gray-600">{d.treatment}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
                        <Sprout className="w-4 h-4 text-green-500" /> Prevention
                      </h3>
                      <p className="text-sm text-gray-600">{d.prevention}</p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {screen === 'home' && renderHome()}
      {screen === 'camera' && renderCamera()}
      {screen === 'preview' && renderPreview()}
      {screen === 'analyzing' && renderAnalyzing()}
      {screen === 'results' && renderResults()}
      {screen === 'history' && renderHistory()}
      {screen === 'diseases' && renderDiseases()}
    </>
  );
}

function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
