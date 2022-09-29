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

export interface WikiEvent {
  text: string;
  pages: Page[];
  year: number;
}

export interface WikiEventResponse {
  births: WikiEvent[];
}
