
type Config = {
  title: string;
  description: string;
  lang: string;
  profile: {
    author: string;
    description?: string;
  }
}

type SocialLink = {
  icon: string;
  friendlyName: string; // for accessibility
  link: string;
}

export const siteConfig: Config = {
  title: "joetroll's blog",
  description: "",
  lang: "en-GB",
  profile: {
    author: "joetroll",
    description: "a funny guy, i think"
  }
}


export const socialLinks: Array<SocialLink> = [
  {
    icon: "mdi:github",
    friendlyName: "github",
    link: "https://github.com/trolljoe",
  },
  {
    icon: "mdi:email",
    friendlyName: "email",
    link: "mailto:joetechtok@proton.me",
  },
  {
    icon: "mdi:rss",
    friendlyName: "rss",
    link: "/rss.xml"
  }
];

export const NAV_LINKS: Array<{ title: string, path: string }> = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Blog",
    path: "/blog",
  },
  {
    title: "Projects",
    path: '/projects'
  },
  {
    title: "Archive",
    path: '/archive'
  }
];
