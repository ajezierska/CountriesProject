export interface Country {
    country: {
      code: string;
      name: string;
      emoji: string;
      languages: Language[];
    };
  }
 export interface Language {
    name: string;
  }
  