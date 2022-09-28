import React, { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "app/hooks";
import { getThisDayEvents, selectWiki, ThunkStatus } from "./wikiSlice";
import { Loading } from "components/Loading";
import { Modal } from "components/Modal";
import { StyledCenterdButton, StyledPageTitle } from "components/styled/global";
import { EventList } from "components/EventList";

export const Wiki = () => {
  const { events, status, error } = useAppSelector(selectWiki);
  const dispatch = useAppDispatch();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const loadEvents = () => {
    dispatch(getThisDayEvents());
  };

  useEffect(() => {
    if (status === ThunkStatus.Failed) {
      setIsErrorModalOpen(true);
    }
  }, [status]);

  return (
    <div>
      <StyledPageTitle>
        Find out which events happened on this day!
      </StyledPageTitle>

      {status !== ThunkStatus.Complete && (
        <StyledCenterdButton onClick={loadEvents}>
          Load events
        </StyledCenterdButton>
      )}

      {status === ThunkStatus.Loading && <Loading />}

      {status === ThunkStatus.Failed && (
        <Modal
          title="Error"
          message={error}
          isOpen={isErrorModalOpen}
          closeModal={() => setIsErrorModalOpen(false)}
        />
      )}

      {status === ThunkStatus.Complete && <EventList events={events} />}
    </div>
  );
};
