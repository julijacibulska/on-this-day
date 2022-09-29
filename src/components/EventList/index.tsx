import React, { useMemo } from "react";
import { WikiEventWithYear } from "types/wiki";
import { StyledNoEventsText } from "./_styled";

interface Props {
  events: WikiEventWithYear[];
}

const MANY_YEARS = 30000;

export const EventList = ({ events }: Props): JSX.Element | null => {
  const sortedEvents = useMemo(() => {
    return [...events].sort(
      (a, b) =>
        ("year" in a ? a.year : -MANY_YEARS) -
        ("year" in b ? b.year : -MANY_YEARS)
    );
  }, [events]);

  if (!sortedEvents.length) {
    return (
      <StyledNoEventsText>
        No events were recorded for this day
      </StyledNoEventsText>
    );
  }

  return (
    <table data-testid="eventsTable">
      <thead>
        <tr>
          <th>Year</th>
          <th>Event</th>
        </tr>
      </thead>
      <tbody>
        {sortedEvents.map((event, index) => (
          <tr key={index}>
            <td>
              {"year" in event && (
                <strong>
                  {Math.abs(event.year)}&nbsp;{event.year < 0 && "BC"}
                </strong>
              )}
            </td>
            <td>{event.text}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
