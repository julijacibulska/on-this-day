import React, { useMemo } from "react";

import { useAppSelector, useAppDispatch } from "app/hooks";
import { getThisDayEvents, selectWiki } from "./wikiSlice";
import { WikiEventResponse } from "types/wiki";

const MANY_YEARS = 3000;

export const Wiki = () => {
  const { events } = useAppSelector(selectWiki);
  const dispatch = useAppDispatch();

  const sortedEvents = useMemo(() => {
    return Object.entries(events)
      .flatMap(
        ([category, events]: [
          string,
          WikiEventResponse[keyof WikiEventResponse]
        ]) => {
          return events.map((event) => ({
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

  return (
    <div>
      <h1>Find out which events happened on this day!</h1>
      <button onClick={() => dispatch(getThisDayEvents())}>Load events</button>

      {sortedEvents && (
        <ul>
          {!sortedEvents.length
            ? null
            : sortedEvents.map((event, index) => (
                <li key={index}>
                  {"year" in event && `${event.year} `}[{event.category}]{" - "}
                  {event.text}
                </li>
              ))}
        </ul>
      )}
    </div>
  );
};