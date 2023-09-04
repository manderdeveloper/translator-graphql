import fetch from 'cross-fetch';

class TranslationService {
  private apiKey: string;
  private apiUrl: string;

  constructor(apiKey: string | undefined) {
    this.apiKey = apiKey || '';
    this.apiUrl = 'https://api-free.deepl.com/v2/translate';
  }

  async translateText(text: string, targetLang: string): Promise<any> {
    const headers = {
      'Authorization': `DeepL-Auth-Key ${this.apiKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const body = new URLSearchParams({
      'text': text,
      'target_lang': targetLang,
    });

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: headers,
        body: body,
      });

      if (!response.ok) {
        throw new Error('Translate request error');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default TranslationService;
