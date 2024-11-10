import { NewDiaryEntry, DiaryEntry } from './types';
import axios, { AxiosError } from 'axios';
const addDiary = async (newDiary: NewDiaryEntry) => {
  try {
    const response = await axios.post<DiaryEntry>('/api/diaries', newDiary);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.message);
    }
    throw error;
  }
};

export { addDiary };
