export const TOMATO_DISEASES = {
  healthy: {
    id: 'healthy',
    name: 'Healthy Plant',
    twiName: 'Dua Awo',
    eweName: 'Nutria Kpɔkpɔ',
    gaName: 'Shikpamɔi Awo',
    severity: 'none',
    symptoms: 'No visible disease symptoms. Leaves are vibrant green with normal texture.',
    twiSymptoms: 'Yɛnhu yare biara. Nhaban yɛ ahaban kɛse a wɔyɛ ahaban pa.',
    eweSymptoms: 'Mele yame aɖeke o. Aɖaɖawo le woɖe edzi eye wonye futu.',
    gaSymptoms: 'Yɛnshwie shika bi. Ablɛji nɛɛ nɛɛ a fɛɛ a fɛɛ.',
    recommendations: [
      'Continue regular watering schedule',
      'Maintain good soil nutrition',
      'Monitor regularly for early signs of disease',
      'Ensure proper spacing for air circulation'
    ],
    twiRecommendations: [
      'Toaso de nsu rennom dua no',
      'Hwɛ so dua no anyinam',
      'Bɛhwɛ no dabiara sɛ yare reba',
      'Ma hann nnya kwan sɛ ɛbɛfa ntam'
    ],
    eweRecommendations: [
      'Dzi asi le nuƒoƒo dzi',
      'Kpe ɖe anyigba ƒe nutata ŋu',
      'Le ɣeɣi sia ɣi me de dzeɖeƒe',
      'Na boɖoɖo li be yame magakpɔ wo o'
    ],
    gaRecommendations: [
      'Tsɔɔ kɛkɛ nɔ osɔɔ lɛ ekomɛ',
      'Kɛji akɛ akɛ ojɛ blɛ',
      'Bɛbɛni nii aku yɛ na aloo shika',
      'Na tɛtɛ a fɛɛ a fɛɛ na aloo bo ni anyɛ ma'
    ],
    treatment: 'No treatment needed. Continue good agricultural practices.',
    prevention: 'Maintain field hygiene, crop rotation, and regular monitoring.'
  },

  early_blight: {
    id: 'early_blight',
    name: 'Early Blight',
    twiName: 'Yare a Edi Kan',
    eweName: 'Afi Ƒe Gbeɖe',
    gaName: 'Shika a Edi Kan',
    severity: 'medium',
    symptoms: 'Dark brown to black spots with concentric rings (target-like pattern) on lower leaves. Yellowing around spots. Leaves may drop prematurely.',
    twiRecommendations: [
      'Yi nhaban a yare no afi ase ntɛm',
      'Fa fungicide a ɛsɔ hwɛ no hyɛ no',
      'Siesie ase na ma no hann',
      'Siesie nsu a wɔde nnom dua no'
    ],
    eweRecommendations: [
      'Ɣla aɖaɖa dzi le vava me',
      'Trɔ asi le fungicide ŋu',
      'Le anyigba le ŋuti eye na boɖoɖo li',
      'Bɔ nuƒoƒo ŋuti kpɔkpɔ'
    ],
    gaRecommendations: [
      'Kagbɛ nɛɛ a kɛjɛ ma shi bu',
      'Tsɔ fungicide na a gblɛ',
      'Le to na nɛɛ a fɛɛ na bo ni anyɛ ma',
      'Kɛji kɛkɛ nɛɛ nɛɛ nɛ oshɛ nɛɛ'
    ],
    treatment: 'Apply copper-based fungicide. Remove infected leaves. Improve air circulation.',
    prevention: 'Rotate crops, use resistant varieties, mulch to prevent soil splash.'
  },

  late_blight: {
    id: 'late_blight',
    name: 'Late Blight',
    twiName: 'Yare a Edi Akyi',
    eweName: 'Afi Ƒe Gbeɖe Mamlɛtɔ',
    gaName: 'Shika a Edi Mlɛ',
    severity: 'high',
    symptoms: 'Water-soaked dark green or brown spots on leaves. White fuzzy growth on undersides in humid conditions. Brown rotting on fruits.',
    twiRecommendations: [
      'Yi nhaban ne nnuaba a yare no nyinaa ntɛm',
      'Fa fungicide a ɛwɔ bɔnwira hyɛ no ntɛm',
      'Mma dua no nnom nsu wɔ anadwo',
      'Hwɛ so sɛ hann bɛba dua no so dabiara'
    ],
    eweRecommendations: [
      'Ɣla aɖaɖa kple nuwo katã vava me',
      'Trɔ asi le fungicide ŋu le vava me',
      'Magaƒɔ nuƒoƒo ɣi me o',
      'Kpe ɖe ŋudzedze ŋu le ɣeɣi sia ɣi me'
    ],
    gaRecommendations: [
      'Kagbɛ nɛɛ a kɛji akɛ afi lɛ ekomɛ shi bu',
      'Tsɔ fungicide na a gblɛ ekomɛ',
      'Makɛ eji lɛ na oshɛ kɛkɛ le shi',
      'Kɛji sɛ shi gblɛ nɛɛ na akɛ amɛ bua'
    ],
    treatment: 'Immediate fungicide application. Remove all infected plant parts. Avoid overhead watering.',
    prevention: 'Plant resistant varieties. Ensure good drainage. Space plants properly. Monitor weather.'
  },

  leaf_mold: {
    id: 'leaf_mold',
    name: 'Leaf Mold',
    twiName: 'Nhaban Tutu',
    eweName: 'Aɖaɖa Ƒe Tutu',
    gaName: 'Ablɛji Fɔŋɔ',
    severity: 'medium',
    symptoms: 'Yellow spots on upper leaf surface. Olive-green to brown velvety mold on undersides. Leaves curl and dry up.',
    twiRecommendations: [
      'Siesie dua no ma no hann',
      'Yi nhaban a yare no afi ase',
      'Fa fungicide a ɛsɔ hwɛ no hyɛ no',
      'Twe korokoro nsu a ɛwɔ mmirika a efiri dua no so'
    ],
    eweRecommendations: [
      'Le anyigba le ŋuti eye na boɖoɖo li',
      'Ɣla aɖaɖa dzi',
      'Trɔ asi le fungicide ŋu',
      'Ɣla aƒeƒe ƒe tsi le dua dzi me'
    ],
    gaRecommendations: [
      'Le to na nɛɛ na bo ni anyɛ ma',
      'Kagbɛ nɛɛ a kɛjɛ ma shi bu',
      'Tsɔ fungicide na a gblɛ',
      'Kwɛɛ tɛtɛ le shi ni na akɛ oshɛ lɛ ma'
    ],
    treatment: 'Improve ventilation. Apply fungicide. Remove infected leaves. Reduce humidity.',
    prevention: 'Avoid overcrowding. Water at base. Remove plant debris. Use resistant varieties.'
  },

  septoria_leaf_spot: {
    id: 'septoria_leaf_spot',
    name: 'Septoria Leaf Spot',
    twiName: 'Nhaban Mmoa a Akɛse',
    eweName: 'Aɖaɖa Mmɔŋliƒo',
    gaName: 'Ablɛji Fɛfɛɔ',
    severity: 'medium',
    symptoms: 'Small circular spots with dark borders and gray centers. Tiny black dots (fungal bodies) in center. Starts on lower leaves.',
    twiRecommendations: [
      'Yi nhaban a edwiriw atwe no afi ase',
      'Siesie dua no ma no hann dabiara',
      'Fa fungicide a ɛsɔ hwɛ no hyɛ no',
      'Mfa nsu nnom dua no wɔ anadwo'
    ],
    eweRecommendations: [
      'Ɣla aɖaɖa dzi le vava me',
      'Le anyigba le ŋuti dzi ɣeɣi sia ɣi me',
      'Trɔ asi le fungicide ŋu',
      'Magaƒɔ nuƒoƒo ɣi me o'
    ],
    gaRecommendations: [
      'Kagbɛ nɛɛ a kɛjɛ ma shi bu le shi',
      'Le to na nɛɛ na bo ni anyɛ ma dabi',
      'Tsɔ fungicide na a gblɛ',
      'Makɛ eji lɛ na oshɛ le shi'
    ],
    treatment: 'Remove infected leaves. Apply fungicide. Mulch to prevent soil splash. Water at base.',
    prevention: 'Rotate crops. Clean up plant debris. Use mulch. Apply preventive fungicide.'
  },

  spider_mites: {
    id: 'spider_mites',
    name: 'Spider Mites',
    twiName: 'Nnwankuo a Wɔtaa So',
    eweName: 'Kpakpɔ Mites',
    gaName: 'Ananatsei Aniku',
    severity: 'medium',
    symptoms: 'Tiny yellow or white dots on leaves (stippling). Fine webbing on undersides. Leaves turn bronze and drop.',
    twiRecommendations: [
      'Fa nsu a wɔde brɔwɛ hyɛ nhaban no ase',
      'Fa insecticidal soap anaa neem oil hyɛ no',
      'Siesie dua no ma no hann',
      'Hwɛ so sɛ nnwankuo no rentu mpɔn'
    ],
    eweRecommendations: [
      'Dzi aɖaɖa dzi kple tsi le ɣeɣi sia ɣi me',
      'Trɔ asi le insecticidal soap alo neem oil ŋu',
      'Le anyigba le ŋuti eye na boɖoɖo li',
      'Le ɣeɣi sia ɣi me de dzeɖeƒe'
    ],
    gaRecommendations: [
      'Tsɔɔ tɛtɛ shi na ablɛji shi le dabi',
      'Tsɔ insecticidal soap anaa neem oil na a gblɛ',
      'Le to na nɛɛ na bo ni anyɛ ma',
      'Bɛni nii aniku nɛɛ mli na akɛ amɛ tu'
    ],
    treatment: 'Spray leaves with water to dislodge mites. Apply neem oil or insecticidal soap. Increase humidity.',
    prevention: 'Keep plants well-watered. Avoid dusty conditions. Introduce predatory mites. Regular inspection.'
  },

  target_spot: {
    id: 'target_spot',
    name: 'Target Spot',
    twiName: 'Ɔfa a Wɔde Hyɛ Nsɛm',
    eweName: 'Target Ƒe Mmɔŋliƒo',
    gaName: 'Shika Fɛfɛɔ a Kɛ Ha',
    severity: 'low',
    symptoms: 'Brown spots with concentric rings creating a target pattern. Spots on leaves, stems, and fruits.',
    twiRecommendations: [
      'Yi nhaban ne nnuaba a yare no afi ase',
      'Fa fungicide a ɛsɔ hwɛ no hyɛ no',
      'Siesie dua no ma no hann',
      'Hwɛ so sɛ yare no rentu mpɔn'
    ],
    eweRecommendations: [
      'Ɣla aɖaɖa kple nuwo dzi',
      'Trɔ asi le fungicide ŋu',
      'Le anyigba le ŋuti eye na boɖoɖo li',
      'Le ɣeɣi sia ɣi me de dzeɖeƒe'
    ],
    gaRecommendations: [
      'Kagbɛ nɛɛ a kɛjɛ ma shi bu',
      'Tsɔ fungicide na a gblɛ',
      'Le to na nɛɛ na bo ni anyɛ ma',
      'Bɛbɛni nii aku yɛ na aloo shika'
    ],
    treatment: 'Remove infected plant parts. Apply fungicide. Improve air circulation.',
    prevention: 'Use certified seeds. Rotate crops. Maintain field sanitation. Avoid overhead irrigation.'
  },

  mosaic_virus: {
    id: 'mosaic_virus',
    name: 'Tomato Mosaic Virus',
    twiName: 'Tomato Mosaic Yare',
    eweName: 'Tomato Ƒe Virus Yame',
    gaName: 'Tomato Virus Shika',
    severity: 'high',
    symptoms: 'Mottled light and dark green pattern on leaves (mosaic). Leaf distortion and stunted growth. Fruits may show yellow rings.',
    twiRecommendations: [
      'Yi dua no nyinaa na sɛɛ no',
      'Nnwiwena anaa mpaboa a wɔde yɛ adwuma no nsiesie yiye',
      'Nntua biribiara wɔ dua no so ɛnne a wobɛkɔ',
      'Siesie nsuo a wɔde bɛnom dua no'
    ],
    eweRecommendations: [
      'Ɣla dua dzi eye na wu anyigba me',
      'Kpe ɖe asikɔtsetse kple aɖaka ŋuti',
      'Magaƒɔ aɖeke le dua dzi o',
      'Bɔ nuƒoƒo ƒe tsi ŋuti kpɔkpɔ'
    ],
    gaRecommendations: [
      'Kagbɛ nɛɛ a kɛjɛ ma shi bu kɛji akɛ oshi bua',
      'Tsɔɔ kɛkɛ na aflɛɛ na abɔlɔɔ',
      'Matsɔ biribi le shi le fɛɛɛ lɛ mli',
      'Kɛji oshɛ lɛ kɛkɛ nɛɛ nɛɛ'
    ],
    treatment: 'No cure available. Remove and destroy infected plants immediately. Disinfect tools.',
    prevention: 'Use virus-free seeds. Control aphids (virus vectors). Wash hands before handling plants. Remove weeds.'
  },

  yellow_leaf_curl: {
    id: 'yellow_leaf_curl',
    name: 'Yellow Leaf Curl Virus',
    twiName: 'Nhaban Tɛntɛn ne Atwe Yare',
    eweName: 'Tsiƒe Aɖaɖa Ƒe Virus Yame',
    gaName: 'Ablɛji Kpakpa Shika',
    severity: 'high',
    symptoms: 'Leaves curl upward and turn yellow. Stunted growth. Flowers drop. No fruit production. Spread by whiteflies.',
    twiRecommendations: [
      'Yi dua no na sɛɛ no ntɛm',
      'Fa net anaa aguaa a wɔde kyere nnomaa no',
      'Siesie dua no ma no hann',
      'Hwɛ so sɛ whiteflies rentu mpɔn'
    ],
    eweRecommendations: [
      'Ɣla dua dzi eye na wu anyigba me le vava me',
      'Trɔ asi le net alo agbadada ɖaɖa ŋu',
      'Le anyigba le ŋuti eye na boɖoɖo li',
      'Le ɣeɣi sia ɣi me de whiteflies ŋu'
    ],
    gaRecommendations: [
      'Kagbɛ nɛɛ a kɛjɛ ma shi bu le shi',
      'Tsɔ net anaa akɛwɛlɛ na a ma akɛ oshɛ jɛ',
      'Le to na nɛɛ na bo ni anyɛ ma',
      'Bɛni nii akɛ shɛɛ nɛɛ mli na akɛ amɛ tu'
    ],
    treatment: 'Remove infected plants. Use insecticide to control whiteflies. Use resistant varieties.',
    prevention: 'Use virus-free seedlings. Install insect netting. Remove weeds that host whiteflies. Monitor regularly.'
  },

  bacterial_spot: {
    id: 'bacterial_spot',
    name: 'Bacterial Spot',
    twiName: 'Bacteria Mmoa',
    eweName: 'Bacteria Ƒe Mmɔŋliƒo',
    gaName: 'Bacteria Fɛfɛɔ',
    severity: 'medium',
    symptoms: 'Small water-soaked spots that turn dark brown or black with yellow halos. Spots on leaves, stems, and fruits. Fruits may have scabby spots.',
    twiRecommendations: [
      'Yi nhaban a yare no afi ase ntɛm',
      'Nntua biribi wɔ dua no so ɛnne a wobɛkɔ',
      'Fa copper-based bactericide hyɛ no',
      'Siesie dua no ma no hann dabiara'
    ],
    eweRecommendations: [
      'Ɣla aɖaɖa dzi le vava me',
      'Magaƒɔ aɖeke le dua dzi o',
      'Trɔ asi le copper-based bactericide ŋu',
      'Le anyigba le ŋuti dzi ɣeɣi sia ɣi me'
    ],
    gaRecommendations: [
      'Kagbɛ nɛɛ a kɛjɛ ma shi bu le shi',
      'Matsɔ biribi le shi le fɛɛɛ lɛ mli',
      'Tsɔ copper-based bactericide na a gblɛ',
      'Le to na nɛɛ na bo ni anyɛ ma dabi'
    ],
    treatment: 'Remove infected leaves. Apply copper-based bactericide. Avoid working with wet plants.',
    prevention: 'Use certified disease-free seeds. Practice crop rotation. Avoid overhead watering. Disinfect tools.'
  }
};

export const DISEASE_ORDER = [
  'healthy',
  'early_blight',
  'late_blight',
  'leaf_mold',
  'septoria_leaf_spot',
  'spider_mites',
  'target_spot',
  'mosaic_virus',
  'yellow_leaf_curl',
  'bacterial_spot'
];

export const SEVERITY_COLORS = {
  none: '#22c55e',
  low: '#84cc16',
  medium: '#f59e0b',
  high: '#ef4444',
  critical: '#dc2626'
};

export const SEVERITY_LABELS = {
  none: 'Healthy',
  low: 'Low Risk',
  medium: 'Medium Risk',
  high: 'High Risk',
  critical: 'Critical'
};

export const LANGUAGE_LABELS = {
  en: 'English',
  twi: 'Twi',
  ewe: 'Ewe',
  ga: 'Ga'
};
