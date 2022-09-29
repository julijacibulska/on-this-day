import { WikiEventResponse } from "types/wiki";

export const getWikiRequestUrl = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  return `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${month}/${day}`;
};

export const fetchWikiOnThisDay = async (): Promise<WikiEventResponse> => {
  const response = await fetch(getWikiRequestUrl(), {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_WIKI_ACCESS_TOKEN}`,
    },
  });

  const responseJson = await response.json();

  console.log(responseJson);

  if (!response.ok) {
    throw new Error(responseJson.title);
  }

  return responseJson;
};
