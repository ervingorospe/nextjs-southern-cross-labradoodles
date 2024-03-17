const navigationType = {
  ROUTES: 'STATIC ROUTES',
  INFO: 'NAVIGATION INFO'
}

const fluxIds = {
  CALL_TO_ACTION_SECTIONS: '29027',
  FOOTER_LOCATION_INFO: '29000',
  SOCIAL_MEDIA: '29002',
  LOCATION: '28999',
  SETTINGS: '165538',
  FOOTER_LOGOS: '29001',
  BLOG_AUTHORS: '29010',
  NAVIGATION: '29028',
  ACTION_BUTTONS: '29004',
  FREE_STANDING_PAGES: '29030',
  BLOGS: '29011',
  LEGAL_NAVIGATION: '29029',
  HOMEPAGE: '165537',
  PUPPIES: '29243' // for southern cross only
}

const defaultImageAlt = "Southern Cross Labradoodles"
const defaultLocationName = "Southern Cross Labradoodles"

const defaultMetadata = {
  title: 'Southern Cross Australian Labradoodles - The Ultimate Family Companion',
  description: 'Southern Cross Australian Labradoodles - The Ultimate Family Companion'
}

const headerLogos = {
  LIGHT: "https://fluxconsole.com/files/item/1323/165603/logo-white.svg",
  DARK: "https://fluxconsole.com/files/item/1323/165602/logo.svg"
}

const defaultSectionStyles = {
  textAlign: 'text-left',
  width: 'max-w-screen-xl',
  bgColor: 'transparent',
  title: {
    size: 'default',
    style: 'default'
  },
  subtitle: {
    size: 'default-subtitle',
    style: 'default-subtitle'
  },
  bodySize: 'default',
  extraBodySize: 'default',
  buttonStyle: 'button-primary',
  buttonStyle2: 'button-secondary',
  image: {
    figure: 'overflow-hidden ',
    image: 'h-full w-full object-cover object-center',
    rounded: 'rounded-2xl',
    shadow: 'shadow-lg',
    container: ""
  },
  margin: {
    title: "",
    subtitle: "mt-2",
    body: "mt-6",
    extraBody: "mt-4"
  },
  buttonContainer: "mt-8 grid space-y-2 sm:space-y-0 space-x-0 sm:flex sm:space-x-4"
}

const defaultHeroStyles = {
  textAlign: 'text-left',
  width: 'max-w-screen-2xl',
  bgColor: 'secondary-700',
  title: {
    size: 'hero-title',
    style: 'hero-title'
  },
  subtitle: {
    size: 'hero-subtitle',
    style: 'hero-subtitle'
  },
  bodySize: 'hero',
  extraBodySize: 'hero',
  buttonStyle: 'hero',
  buttonStyle2: 'hero-secondary-button',
  image: {
    figure: 'overflow-hidden aspect-w-16 aspect-h-9',
    image: 'h-full w-full object-cover object-center',
    rounded: 'rounded-2xl',
    shadow: '',
    container: ""
  },
  margin: {
    title: "",
    subtitle: "mt-1",
    body: "mt-6",
    extraBody: "mt-1"
  },
  buttonContainer: "mt-8 grid space-y-2 sm:space-y-0 space-x-0 sm:flex sm:space-x-4"
}

const defaultCallToActionStyles = {
  textAlign: 'text-center',
  width: 'max-w-screen-md',
  bgColor: 'transparent',
  title: {
    size: 'default',
    style: 'default'
  },
  subtitle: {
    size: 'default',
    style: 'default'
  },
  bodySize: 'prose prose-lg prose-primary-invert md:prose-xl',
  extraBodySize: 'prose prose-lg prose-primary-invert',
  buttonStyle: 'button-primary',
  buttonStyle2: 'button-primary',
}

export {
  fluxIds,
  navigationType,
  defaultImageAlt,
  headerLogos,
  defaultSectionStyles,
  defaultHeroStyles,
  defaultCallToActionStyles,
  defaultLocationName,
  defaultMetadata
}