export interface BaseResponse<T> {
    result: T;
    isSuccess: boolean;
    message: string | null;
  }
export interface TranslationResult {
extractedText: string;
translatedText: string;
selectedLanguage: string;
targetLanguage: string;
}

export interface UserInfo {
    username: string;
    email: string;
}
export const languages = [
  { code: 'af', appLanguageValue: 0,  labelEn: 'Afrikaans',      labelAr: 'الأفريقانية' },
  { code: 'sq', appLanguageValue: 1,  labelEn: 'Albanian',       labelAr: 'الألبانية' },
  { code: 'am', appLanguageValue: 2,  labelEn: 'Amharic',        labelAr: 'الأمهرية' },
  { code: 'ar', appLanguageValue: 3,  labelEn: 'Arabic',         labelAr: 'العربية' },
  { code: 'hy', appLanguageValue: 4,  labelEn: 'Armenian',       labelAr: 'الأرمنية' },
  { code: 'az', appLanguageValue: 5,  labelEn: 'Azerbaijani',    labelAr: 'الأذرية' },
  { code: 'eu', appLanguageValue: 6,  labelEn: 'Basque',         labelAr: 'الباسكية' },
  { code: 'be', appLanguageValue: 7,  labelEn: 'Belarusian',     labelAr: 'البيلاروسية' },
  { code: 'bn', appLanguageValue: 8,  labelEn: 'Bengali',        labelAr: 'البنغالية' },
  { code: 'bs', appLanguageValue: 9,  labelEn: 'Bosnian',        labelAr: 'البوسنية' },
  { code: 'bg', appLanguageValue: 10, labelEn: 'Bulgarian',      labelAr: 'البلغارية' },
  { code: 'ca', appLanguageValue: 11, labelEn: 'Catalan',        labelAr: 'الكاتالونية' },
  { code: 'zh', appLanguageValue: 12, labelEn: 'Chinese',        labelAr: 'الصينية' },
  { code: 'hr', appLanguageValue: 13, labelEn: 'Croatian',       labelAr: 'الكرواتية' },
  { code: 'cs', appLanguageValue: 14, labelEn: 'Czech',          labelAr: 'التشيكية' },
  { code: 'da', appLanguageValue: 15, labelEn: 'Danish',         labelAr: 'الدانماركية' },
  { code: 'en', appLanguageValue: 16, labelEn: 'English',        labelAr: 'الإنجليزية' },
  { code: 'et', appLanguageValue: 17, labelEn: 'Estonian',       labelAr: 'الإستونية' },
  { code: 'fi', appLanguageValue: 18, labelEn: 'Finnish',        labelAr: 'الفنلندية' },
  { code: 'fr', appLanguageValue: 19, labelEn: 'French',         labelAr: 'الفرنسية' },
  { code: 'gl', appLanguageValue: 20, labelEn: 'Galician',       labelAr: 'الجاليكية' },
  { code: 'ka', appLanguageValue: 21, labelEn: 'Georgian',       labelAr: 'الجورجية' },
  { code: 'de', appLanguageValue: 22, labelEn: 'German',         labelAr: 'الألمانية' },
  { code: 'el', appLanguageValue: 23, labelEn: 'Greek',          labelAr: 'اليونانية' },
  { code: 'gu', appLanguageValue: 24, labelEn: 'Gujarati',       labelAr: 'الغوجاراتية' },
  { code: 'ht', appLanguageValue: 25, labelEn: 'Haitian Creole', labelAr: 'الكريولية الهايتية' },
  { code: 'he', appLanguageValue: 26, labelEn: 'Hebrew',         labelAr: 'العبرية' },
  { code: 'hi', appLanguageValue: 27, labelEn: 'Hindi',          labelAr: 'الهندية' },
  { code: 'hu', appLanguageValue: 28, labelEn: 'Hungarian',      labelAr: 'الهنغارية' },
  { code: 'is', appLanguageValue: 29, labelEn: 'Icelandic',      labelAr: 'الأيسلندية' },
  { code: 'id', appLanguageValue: 30, labelEn: 'Indonesian',     labelAr: 'الإندونيسية' },
  { code: 'ga', appLanguageValue: 31, labelEn: 'Irish',          labelAr: 'الأيرلندية' },
  { code: 'it', appLanguageValue: 32, labelEn: 'Italian',        labelAr: 'الإيطالية' },
  { code: 'ja', appLanguageValue: 33, labelEn: 'Japanese',       labelAr: 'اليابانية' },
  { code: 'jw', appLanguageValue: 34, labelEn: 'Javanese',       labelAr: 'الجاوية' },
  { code: 'kk', appLanguageValue: 35, labelEn: 'Kazakh',         labelAr: 'الكازاخية' },
  { code: 'ko', appLanguageValue: 36, labelEn: 'Korean',         labelAr: 'الكورية' },
  { code: 'lo', appLanguageValue: 37, labelEn: 'Lao',            labelAr: 'اللاوية' },
  { code: 'la', appLanguageValue: 38, labelEn: 'Latin',          labelAr: 'اللاتينية' },
  { code: 'lv', appLanguageValue: 39, labelEn: 'Latvian',        labelAr: 'اللاتفية' },
  { code: 'lt', appLanguageValue: 40, labelEn: 'Lithuanian',     labelAr: 'الليتوانية' },
  { code: 'lb', appLanguageValue: 41, labelEn: 'Luxembourgish',  labelAr: 'اللوكسمبرجية' },
  { code: 'mk', appLanguageValue: 42, labelEn: 'Macedonian',     labelAr: 'المقدونية' },
  { code: 'ms', appLanguageValue: 43, labelEn: 'Malay',          labelAr: 'الملايوية' },
  { code: 'ml', appLanguageValue: 44, labelEn: 'Malayalam',      labelAr: 'الماليالامية' },
  { code: 'mt', appLanguageValue: 45, labelEn: 'Maltese',        labelAr: 'المالطية' },
  { code: 'mi', appLanguageValue: 46, labelEn: 'Maori',          labelAr: 'الماورية' },
  { code: 'mr', appLanguageValue: 47, labelEn: 'Marathi',        labelAr: 'الماراثية' },
  { code: 'mn', appLanguageValue: 48, labelEn: 'Mongolian',      labelAr: 'المنغولية' },
  { code: 'ne', appLanguageValue: 49, labelEn: 'Nepali',         labelAr: 'النيبالية' },
  { code: 'no', appLanguageValue: 50, labelEn: 'Norwegian',      labelAr: 'النرويجية' },
  { code: 'ps', appLanguageValue: 51, labelEn: 'Pashto',         labelAr: 'البشتونية' },
  { code: 'fa', appLanguageValue: 52, labelEn: 'Persian',        labelAr: 'الفارسية' },
  { code: 'pl', appLanguageValue: 53, labelEn: 'Polish',         labelAr: 'البولندية' },
  { code: 'pt', appLanguageValue: 54, labelEn: 'Portuguese',     labelAr: 'البرتغالية' },
  { code: 'pa', appLanguageValue: 55, labelEn: 'Punjabi',        labelAr: 'البنجابية' },
  { code: 'ro', appLanguageValue: 56, labelEn: 'Romanian',       labelAr: 'الرومانية' },
  { code: 'ru', appLanguageValue: 57, labelEn: 'Russian',        labelAr: 'الروسية' },
  { code: 'sr', appLanguageValue: 58, labelEn: 'Serbian',        labelAr: 'الصربية' },
  { code: 'sd', appLanguageValue: 59, labelEn: 'Sindhi',         labelAr: 'السندية' },
  { code: 'si', appLanguageValue: 60, labelEn: 'Sinhala',        labelAr: 'السنهالية' },
  { code: 'sk', appLanguageValue: 61, labelEn: 'Slovak',         labelAr: 'السلوفاكية' },
  { code: 'sl', appLanguageValue: 62, labelEn: 'Slovenian',      labelAr: 'السلوفينية' },
  { code: 'so', appLanguageValue: 63, labelEn: 'Somali',         labelAr: 'الصومالية' },
  { code: 'es', appLanguageValue: 64, labelEn: 'Spanish',        labelAr: 'الإسبانية' },
  { code: 'su', appLanguageValue: 65, labelEn: 'Sundanese',      labelAr: 'السوندانية' },
  { code: 'sw', appLanguageValue: 66, labelEn: 'Swahili',        labelAr: 'السواحلية' },
  { code: 'sv', appLanguageValue: 67, labelEn: 'Swedish',        labelAr: 'السويدية' },
  { code: 'tg', appLanguageValue: 68, labelEn: 'Tajik',          labelAr: 'الطاجيكية' },
  { code: 'ta', appLanguageValue: 69, labelEn: 'Tamil',          labelAr: 'التاميلية' },
  { code: 'te', appLanguageValue: 70, labelEn: 'Telugu',         labelAr: 'التيلجو' },
  { code: 'th', appLanguageValue: 71, labelEn: 'Thai',           labelAr: 'التايلاندية' },
  { code: 'tr', appLanguageValue: 72, labelEn: 'Turkish',        labelAr: 'التركية' },
  { code: 'uk', appLanguageValue: 73, labelEn: 'Ukrainian',      labelAr: 'الأوكرانية' },
  { code: 'ur', appLanguageValue: 74, labelEn: 'Urdu',           labelAr: 'الأردية' },
  { code: 'uz', appLanguageValue: 75, labelEn: 'Uzbek',          labelAr: 'الأوزبكية' },
  { code: 'vi', appLanguageValue: 76, labelEn: 'Vietnamese',     labelAr: 'الفيتنامية' },
  { code: 'cy', appLanguageValue: 77, labelEn: 'Welsh',          labelAr: 'الويلزية' },
  { code: 'yi', appLanguageValue: 78, labelEn: 'Yiddish',        labelAr: 'اليديشية' },
  { code: 'yo', appLanguageValue: 79, labelEn: 'Yoruba',         labelAr: 'اليوروبية' },
  { code: 'zu', appLanguageValue: 80, labelEn: 'Zulu',           labelAr: 'الزولو' }
];

export interface ExtractionResponse
{
    extractedText :string;
    translatedText :string;
    selectedLanguage:string;
    targetLanguage :string;
}


export interface TranscriptionResponse {
  transcribedText: string;
  translatedText: string;
  selectedLanguage: string;
  targetLanguage: string;
}
