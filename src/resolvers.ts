import { v4 as uuidv4 } from 'uuid';
import TranslationService from './services/translationService';

let words: Word[] = [
  { id: 'A5C584EE-9F4B-44F5-B2E5-9B5A072032DA', text: 'Hello', translation: 'Hola' },
  { id: 'A4B1D67B-1BA3-4D39-9028-D38111929895', text: 'World', translation: 'Mundo' },
];

type Word = {
  id: string;
  text: string;
  translation: string;
};

const resolvers = {
  Query: {
    getWord: (parent: any, args: { id: string }) => {
      return words.find((word) => word.id === args.id);
    },
    getAllWords: () => words,
  },
  Mutation: {
    createWord: (parent: any, args: { text: string; translation: string }) => {
      const newWord: Word = { id: uuidv4(), ...args };
      words.push(newWord);
      return newWord;
    },
    updateWord: (parent: any, args: { id: string; text?: string; translation?: string }) => {
      const wordToUpdate = words.find((word) => word.id === args.id);
      if (!wordToUpdate) {
        throw new Error('Word not found');
      }

      if (args.text) {
        wordToUpdate.text = args.text;
      }
      if (args.translation) {
        wordToUpdate.translation = args.translation;
      }

      return wordToUpdate;
    },
    deleteWord: (parent: any, args: { id: string }) => {
      const index = words.findIndex((word) => word.id === args.id);
      if (index === -1) {
        throw new Error('Word not found');
      }

      const deletedId = words[index].id;
      words.splice(index, 1);
      return deletedId;
    },
    translatedText: async (parent: any, args: {text: string, language: string}) => {
      const DEEPL_API_KEY: string | undefined = process.env.DEEPL_API_KEY;
      const translationService = new TranslationService(DEEPL_API_KEY);
      const { text, language } = args;
      const translationData = await translationService.translateText(text, language);
      return { translation: translationData.translations[0].text };
    },
  }
};

export default resolvers;