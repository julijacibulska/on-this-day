interface Image {
  source: string;
  width: number;
  height: number;
}

interface ContentUrl {
  page: string;
  revisions: string;
  edit: string;
  talk: string;
}

interface Page {
  type: "standard" | "disambiguation" | "no-extract" | "mainpage";
  namespace: { id: number; text: string };
  wikibase_item: string;
  titles: {
    canonical: string;
    normalized: string;
    display: string;
  };
  pageid: number;
  thumbnail: Image;
  originalimage: Image;
  lang: string;
  dir: "ltr" | "rtl";
  revision: string;
  tid: string;
  timestamp: string;
  description: string;
  description_source: "local" | "central";
  content_urls: {
    desktop: ContentUrl;
    mobile: ContentUrl;
  };
  extract: string;
  extract_html: string;
}

export interface BaseWikiEvent {
  text: string;
  pages: Page[];
}

export interface WikiEventWithYear extends BaseWikiEvent {
  year: number;
}

export interface WikiEventResponse {
  selected: WikiEventWithYear[];
  births: WikiEventWithYear[];
  deaths: WikiEventWithYear[];
  events: WikiEventWithYear[];
  holidays: BaseWikiEvent[];
}
