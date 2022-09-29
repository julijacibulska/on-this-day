import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "utils/test-utils";
import { Wiki } from "../Wiki";
import { WikiEventResponse } from "types/wiki";
import { getWikiRequestUrl } from "../wikiAPI";

const mockResponse: WikiEventResponse = {
  selected: [{ text: "Julia applied to LevelPath", year: 2022, pages: [] }],
  births: [{ text: "A star was born", year: 123, pages: [] }],
  deaths: [{ text: "Singer died", year: 1943, pages: [] }],
  events: [
    { text: "SmashingConf", year: 2019, pages: [] },
    { text: "United States midterm election", year: 2022, pages: [] },
    { text: "Latvian parlament election", year: 2022, pages: [] },
  ],
  holidays: [],
};

const requestUrl = getWikiRequestUrl();

const server = setupServer(
  rest.get(requestUrl, (req, res, ctx) => {
    return res(ctx.json(mockResponse), ctx.delay(150));
  })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test("fetches & receives an event table after clicking the 'Load events' button", async () => {
  renderWithProviders(<Wiki />);

  expect(
    screen.getByRole("button", { name: /Load events/i })
  ).toBeInTheDocument();
  expect(screen.queryByTestId("loader")).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: /Load events/i }));
  expect(
    screen.queryByText(/No events were recorded for this day/i)
  ).not.toBeInTheDocument();
  expect(screen.getByTestId("loader")).toBeInTheDocument();

  expect(await screen.findByTestId("eventsTable")).toBeInTheDocument();

  // Additional row is for tableHead
  expect(screen.getAllByRole("row")).toHaveLength(1 + 6);
  expect(
    screen.queryByRole("button", { name: /Load events/i })
  ).not.toBeInTheDocument();
  expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
});

test("handles server error", async () => {
  server.use(rest.get(requestUrl, (req, res, ctx) => res(ctx.status(500))));

  renderWithProviders(<Wiki />);

  fireEvent.click(screen.getByRole("button", { name: /Load events/i }));

  expect(await screen.findByText(/Error/i)).toBeInTheDocument();
});
