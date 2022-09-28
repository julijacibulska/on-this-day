import { WikiEventResponse } from "types/wiki";

export const fetchWikiOnThisDay = async (): Promise<WikiEventResponse> => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_WIKI_ACCESS_TOKEN}`,
    },
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson.title);
  }

  return responseJson;
};
