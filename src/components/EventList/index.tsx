import React, { useMemo } from "react";
import { WikiEvent } from "types/wiki";
import { StyledNoEventsText } from "./_styled";

interface Props {
  events: WikiEvent[];
}

export const EventList = ({ events }: Props): JSX.Element | null => {
  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => a.year - b.year);
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
          <tr data-testid="eventEntry" key={index}>
            <td>
              <strong>
                {Math.abs(event.year)}&nbsp;{event.year < 0 && "BC"}
              </strong>
            </td>
            <td>{event.text}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
