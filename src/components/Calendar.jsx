import { useState } from 'react';
import { getMonthMatrix, toISODate, WEEKDAY_LABELS, MONTH_LABELS } from '../utils/calendarUtils';

export default function Calendar({ sessionsByDate, selectedDate, onSelectDate }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const cells = getMonthMatrix(viewYear, viewMonth);
  const todayISO = toISODate(today.getFullYear(), today.getMonth(), today.getDate());

  function goPrevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function goNextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button type="button" className="calendar-nav" onClick={goPrevMonth}>
          ‹
        </button>
        <span className="calendar-month-label">
          {MONTH_LABELS[viewMonth]} {viewYear}
        </span>
        <button type="button" className="calendar-nav" onClick={goNextMonth}>
          ›
        </button>
      </div>

      <div className="calendar-weekdays">
        {WEEKDAY_LABELS.map((label, i) => (
          <span key={i}>{label}</span>
        ))}
      </div>

      <div className="calendar-grid">
        {cells.map((day, i) => {
          if (day === null) return <span key={i} className="calendar-cell empty" />;
          const iso = toISODate(viewYear, viewMonth, day);
          const hasSession = Boolean(sessionsByDate[iso]);
          const isSelected = iso === selectedDate;
          const isToday = iso === todayISO;
          return (
            <button
              type="button"
              key={i}
              className={`calendar-cell ${hasSession ? 'has-session' : ''} ${isSelected ? 'selected' : ''} ${isToday ? 'is-today' : ''}`}
              onClick={() => hasSession && onSelectDate(iso)}
              disabled={!hasSession}
            >
              {day}
              {hasSession && <span className="calendar-dot" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
