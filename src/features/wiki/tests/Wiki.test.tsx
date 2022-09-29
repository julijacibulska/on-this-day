import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "utils/test-utils";
import { Wiki } from "../Wiki";
import { WikiEventResponse } from "types/wiki";
import { buildWikiTodayRequestUrl } from "../wikiAPI";

const mockResponse: WikiEventResponse = {
  births: [
    {
      text: "Choi Ye-na, South Korean singer and dancer",
      year: 1999,
      pages: [],
    },
    { text: "John Lesley, Scottish bishop (d. 1596)", year: 1527, pages: [] },
    {
      text: "Pompey, Roman general and politician (d. 48 BC)",
      year: -106,
      pages: [],
    },
  ],
};

const requestUrl = buildWikiTodayRequestUrl();

const server = setupServer(
  rest.get(requestUrl, (req, res, ctx) => {
    return res(ctx.json(mockResponse), ctx.delay(150));
  })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test("fetches & receives an birthday table after clicking the 'Load birthdays' button", async () => {
  renderWithProviders(<Wiki />);

  expect(
    screen.getByRole("button", { name: /Load birthdays/i })
  ).toBeInTheDocument();
  expect(screen.queryByTestId("loader")).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: /Load birthdays/i }));
  expect(
    screen.queryByText(/No events were recorded for this day/i)
  ).not.toBeInTheDocument();
  expect(screen.getByTestId("loader")).toBeInTheDocument();

  expect(await screen.findByTestId("eventsTable")).toBeInTheDocument();

  // Additional row is for tableHead
  expect(screen.getAllByTestId("eventEntry")).toHaveLength(
    mockResponse.births.length
  );
  expect(
    screen.queryByRole("button", { name: /Load birthdays/i })
  ).not.toBeInTheDocument();
  expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
});

test("handles server error", async () => {
  server.use(rest.get(requestUrl, (req, res, ctx) => res(ctx.status(500))));

  renderWithProviders(<Wiki />);

  fireEvent.click(screen.getByRole("button", { name: /Load birthdays/i }));

  expect(await screen.findByText(/Error/i)).toBeInTheDocument();
});
