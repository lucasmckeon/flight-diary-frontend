type Visibility = 'poor' | 'good' | 'great' | 'ok';
type Weather = 'rainy' | 'cloudy' | 'sunny' | 'stormy' | 'windy';
interface DiaryEntry {
  id: string;
  date: string;
  visibility: Visibility;
  weather: Weather;
}

type NewDiaryEntry = Omit<DiaryEntry, 'id'> & { comment: string };

export type { DiaryEntry, NewDiaryEntry, Visibility, Weather };
