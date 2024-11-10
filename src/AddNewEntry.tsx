import axios from 'axios';
import { useState } from 'react';
import { DiaryEntry } from './types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const AddNewEntry = ({
  entryAdded,
}: {
  entryAdded: (entry: DiaryEntry) => void;
}) => {
  const [date, setDate] = useState<Date | null>(() => new Date());
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  return (
    <div>
      <h2>Add new entry</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!date || !visibility || !weather || !comment) {
            return;
          }
          const response = await axios.post<DiaryEntry>('/api/diaries', {
            date: date,
            visibility,
            weather,
            comment,
          });
          entryAdded(response.data);
        }}
      >
        <div>
          <label>
            date:{' '}
            <DatePicker selected={date} onChange={(value) => setDate(value)} />
          </label>
        </div>
        <div>
          <label>
            visibility:{' '}
            <input
              value={visibility}
              onChange={(e) => setVisibility(e.currentTarget.value)}
            />
          </label>
        </div>
        <div>
          <label>
            weather:{' '}
            <input
              value={weather}
              onChange={(e) => setWeather(e.currentTarget.value)}
            />
          </label>
        </div>
        <div>
          <label>
            comment:{' '}
            <input
              value={comment}
              onChange={(e) => setComment(e.currentTarget.value)}
            />
          </label>
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export { AddNewEntry };
