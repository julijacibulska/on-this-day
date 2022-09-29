import React, { useMemo } from "react";
import { ColorKey } from "style/styledTheme";
import { EventCategory, WikiEventResponse } from "types/wiki";
import { StyledEventCategory, StyledNoEventsText } from "./_styled";

interface Props {
  events: WikiEventResponse;
}

const MANY_YEARS = 3000;

const getCategoryColor = (category: EventCategory): ColorKey => {
  switch (category) {
    case "births":
      return "purple";
    case "deaths":
      return "orange";
    case "events":
      return "cyan";
    case "holidays":
      return "success";
    case "selected":
      return "pink";
    default:
      return "grey";
  }
};

export const EventList = ({ events }: Props): JSX.Element | null => {
  const sortedEvents = useMemo(() => {
    return Object.entries(events)
      .flatMap(
        ([category, eventEntries]: [
          string,
          WikiEventResponse[EventCategory]
        ]) => {
          return eventEntries.map((event) => ({
            ...event,
            category,
          }));
        }
      )
      .sort(
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
          <th>Category</th>
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
            <td>
              <StyledEventCategory
                color={getCategoryColor(event.category as EventCategory)}
              >
                {event.category}
              </StyledEventCategory>
            </td>
            <td>{event.text}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
