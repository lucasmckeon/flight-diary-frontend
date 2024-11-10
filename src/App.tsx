import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import axios from 'axios';
import { AddNewEntry } from './AddNewEntry';

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    const fetch = async () => {
      //Relative URL needed for proxy to work
      const response = await axios.get<DiaryEntry[]>('/api/diaries');
      setDiaryEntries(response.data);
    };
    fetch();
  }, []);
  return (
    <>
      <h2>Diary entries</h2>
      <AddNewEntry
        entryAdded={(entry) => setDiaryEntries(diaryEntries.concat(entry))}
      ></AddNewEntry>
      {diaryEntries.map((entry) => {
        return (
          <div key={entry.id}>
            <h3>{entry.date}</h3>
            <p>visibility: {entry.visibility}</p>
            <p>weather: {entry.weather}</p>
          </div>
        );
      })}
    </>
  );
}

export { App };
