import React, { useEffect, useMemo, useState } from "react";

import { useAppSelector, useAppDispatch } from "app/hooks";
import { getThisDayEvents, selectWiki, ThunkStatus } from "./wikiSlice";
import { Loading } from "components/Loading";
import { WikiEventResponse } from "types/wiki";
import { Modal } from "components/Modal";

const MANY_YEARS = 3000;

export const Wiki = () => {
  const { events, status, error } = useAppSelector(selectWiki);
  const dispatch = useAppDispatch();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

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

  const loadEvents = () => {
    dispatch(getThisDayEvents());
  };

  useEffect(() => {
    if (status === ThunkStatus.Failed) {
      setIsErrorModalOpen(true);
    }
  }, [status, error]);

  return (
    <div>
      <h1>Find out which events happened on this day!</h1>

      {status !== ThunkStatus.Complete && (
        <button onClick={loadEvents}>Load events</button>
      )}
      {status === ThunkStatus.Failed && (
        <Modal
          title="Error"
          message={error}
          isOpen={isErrorModalOpen}
          closeModal={() => setIsErrorModalOpen(false)}
        />
      )}

      {status === ThunkStatus.Loading && <Loading />}

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
