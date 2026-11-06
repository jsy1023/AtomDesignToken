import React, { useState } from 'react';

export interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
}

export const Calendar: React.FC<CalendarProps> = ({ selected, onSelect, className = '' }) => {
  const [currentDate, setCurrentDate] = useState(selected || new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  const isSelected = (d: Date | null) => {
    if (!d || !selected) return false;
    return (
      d.getFullYear() === selected.getFullYear() &&
      d.getMonth() === selected.getMonth() &&
      d.getDate() === selected.getDate()
    );
  };

  return (
    <div className={`atom-calendar ${className}`}>
      <div className="atom-calendar-header">
        <button type="button" onClick={handlePrevMonth} className="atom-calendar-nav-btn" aria-label="이전 달">
          &lt;
        </button>
        <span className="atom-calendar-title">
          {year}년 {month + 1}월
        </span>
        <button type="button" onClick={handleNextMonth} className="atom-calendar-nav-btn" aria-label="다음 달">
          &gt;
        </button>
      </div>
      <div className="atom-calendar-grid">
        {['일', '월', '화', '수', '목', '금', '토'].map((w) => (
          <div key={w} className="atom-calendar-weekday">
            {w}
          </div>
        ))}
        {days.map((d, idx) =>
          d ? (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect?.(d)}
              className={`atom-calendar-day ${isSelected(d) ? 'atom-calendar-day-selected' : ''}`}
            >
              {d.getDate()}
            </button>
          ) : (
            <div key={idx} />
          )
        )}
      </div>
    </div>
  );
};
