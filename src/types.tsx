type Visibility = 'poor' | 'good' | 'great';
type Weather = 'rainy' | 'cloudy' | 'sunny';
interface DiaryEntry {
  id: string;
  date: string;
  visibility: Visibility;
  weather: Weather;
}

export type { DiaryEntry };
