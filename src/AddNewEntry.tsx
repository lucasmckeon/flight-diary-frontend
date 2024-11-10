import { useCallback, useState } from 'react';
import { DiaryEntry, Visibility, Weather } from './types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Notify } from './Notify';
import { addDiary } from './diariesService';

const AddNewEntry = ({
  entryAdded,
}: {
  entryAdded: (entry: DiaryEntry) => void;
}) => {
  const [date, setDate] = useState<Date | null>(null);
  const [visibility, setVisibility] = useState<Visibility | ''>();
  const [weather, setWeather] = useState<Weather | ''>();
  const [comment, setComment] = useState('');
  const [notifyMessage, setNotifyMessage] = useState('');
  const temporarilyNotify = useCallback((message: string) => {
    setNotifyMessage(message);
    setTimeout(() => setNotifyMessage(''), 2000);
  }, []);

  return (
    <div>
      <h2>Add new entry</h2>
      <Notify message={notifyMessage} />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!date || !visibility || !weather || !comment) {
            temporarilyNotify('All fields must be provided.');
            return;
          }
          try {
            const data = await addDiary({
              date: date.toLocaleDateString('en-CA'),
              visibility,
              weather,
              comment,
            });
            entryAdded(data);
            setDate(null);
            setVisibility('');
            setWeather('');
            setComment('');
          } catch (error) {
            if (error instanceof Error) temporarilyNotify(error.message);
            else temporarilyNotify('Unknown error occurred');
          }
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
            <label>
              great
              <input
                value="great"
                type="radio"
                name="visibility"
                checked={visibility === 'great'}
                onChange={() => setVisibility('great')}
              />
            </label>
            <label>
              good
              <input
                value="good"
                type="radio"
                name="visibility"
                checked={visibility === 'good'}
                onChange={() => setVisibility('good')}
              />
            </label>
            <label>
              ok
              <input
                value="ok"
                type="radio"
                name="visibility"
                checked={visibility === 'ok'}
                onChange={() => setVisibility('ok')}
              />
            </label>
            <label>
              poor
              <input
                value="poor"
                type="radio"
                name="visibility"
                checked={visibility === 'poor'}
                onChange={() => setVisibility('poor')}
              />
            </label>
          </label>
        </div>
        <div>
          <label>
            weather:{' '}
            <label>
              sunny
              <input
                value="sunny"
                type="radio"
                name="weather"
                checked={weather === 'sunny'}
                onChange={() => setWeather('sunny')}
              />
            </label>
            <label>
              rainy
              <input
                value="rainy"
                type="radio"
                name="weather"
                checked={weather === 'rainy'}
                onChange={() => setWeather('rainy')}
              />
            </label>
            <label>
              cloudy
              <input
                value="cloudy"
                type="radio"
                name="weather"
                checked={weather === 'cloudy'}
                onChange={() => setWeather('cloudy')}
              />
            </label>
            <label>
              stormy
              <input
                value="stormy"
                type="radio"
                name="weather"
                checked={weather === 'stormy'}
                onChange={() => setWeather('stormy')}
              />
            </label>
            <label>
              windy
              <input
                value="windy"
                type="radio"
                name="weather"
                checked={weather === 'windy'}
                onChange={() => setWeather('windy')}
              />
            </label>
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
