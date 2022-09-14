export const environmentalTopics = [
  {
    link: "https://www.epa.gov/environmental-topics",
    name: "Environmental Topics",
  },
  {
    link: "https://www.epa.gov/environmental-topics/air-topics",
    name: "Air",
  },
  {
    link: "https://www.epa.gov/bedbugs",
    name: "Bed Bugs",
  },
  {
    link: "https://www.epa.gov/environmental-topics/chemicals-and-toxics-topics",
    name: "Chemicals and Toxics",
  },
  {
    link: "https://www.epa.gov/environmental-topics/location-specific-environmental-information",
    name: "Environmental Information by Location",
  },
  {
    link: "https://www.epa.gov/environmental-topics/greener-living",
    name: "Greener Living",
  },
  {
    link: "https://www.epa.gov/environmental-topics/health-topics",
    name: "Health",
  },
  {
    link: "https://www.epa.gov/environmental-topics/land-waste-and-cleanup-topics",
    name: "Land, Waste, and Cleanup",
  },
  {
    link: "https://www.epa.gov/lead",
    name: "Lead",
  },
  {
    link: "https://www.epa.gov/mold",
    name: "Mold",
  },
  {
    link: "https://www.epa.gov/pesticides",
    name: "Pesticides",
  },
  {
    link: "https://www.epa.gov/radon",
    name: "Radon",
  },
  {
    link: "https://www.epa.gov/environmental-topics/science-topics",
    name: "Science",
  },
  {
    link: "https://www.epa.gov/environmental-topics/water-topics",
    name: "Water",
  },
  {
    link: "https://www.epa.gov/topics-epa-web",
    name: "A-Z Topic Index",
  },
];

export const lawsAndRegulationsTopics = [
  {
    link: "https://www.epa.gov/laws-regulations",
    name: "Laws and Regulations",
  },
  {
    link: "https://www.epa.gov/regulatory-information-sector",
    name: "By Business Sector",
  },
  {
    link: "https://www.epa.gov/regulatory-information-topic",
    name: "By Topics",
  },
  {
    link: "https://www.epa.gov/compliance",
    name: "Compliance",
  },
  {
    link: "https://www.epa.gov/enforcement",
    name: "Enforcement",
  },
  {
    link: "https://www.epa.gov/laws-regulations/laws-and-executive-orders",
    name: "Laws and Executive Orders",
  },
  {
    link: "https://www.epa.gov/guidance",
    name: "Guidance",
  },
  {
    link: "https://www.epa.gov/laws-regulations/regulations",
    name: "Regulations",
  },
];

export const aboutEPATopics = [
  {
    link: "https://www.epa.gov/aboutepa",
    name: "About EPA",
  },
  {
    link: "https://www.epa.gov/aboutepa/epa-organization-chart",
    name: "Organization Chart",
  },
  {
    link: "https://cfpub.epa.gov/locator/index.cfm",
    name: "Staff Directory",
  },
  {
    link: "https://www.epa.gov/planandbudget",
    name: "Planning, Budget, and Results",
  },
  {
    link: "https://www.epa.gov/careers",
    name: "Jobs and Internships",
  },
  {
    link: "https://www.epa.gov/aboutepa",
    name: "Headquarters Offices",
  },
  {
    link: "https://www.epa.gov/aboutepa/regional-and-geographic-offices",
    name: "Regional Offices",
  },
  {
    link: "https://www.epa.gov/aboutepa/research-centers-programs-and-science-advisory-organizations",
    name: "Labs and Research Centers",
  },
];

export const collapsableFooterTopics = [
  {
    link: "https://www.epa.gov/accessibility",
    name: "Accessibility",
  },
  {
    link: "https://www.epa.gov/privacy",
    name: "Privacy",
  },
  {
    link: "https://www.epa.gov/privacy/privacy-and-security-notice",
    name: "Privacy and Security Notice",
  },
];

export const globalView = [
  { name: "Monitoring Plans", url: "/monitoring-plans" },
  {
    name: "QA & Certifications",
    url: "/qa",
    children: [
      {
        name: "Test Summary Data",
        url: "/qa-test",
      },
      {
        name: "QA Cert Event Data",
        url: "/qa-qce",
      },
      {
        name: "Test Extension Exemptions Data",
        url: "/qa-tee",
      },
    ],
  },
  {
    name: "Emissions",
    url: "/workspace/emission",
    children: [
      {
        name: "Daily",
        url: "/emissions-daily",
      },
      {
        name: "Hourly",
        url: "/emissions-hourly",
      },
      {
        name: "MATS",
        url: "/emissions-mats",
      },
    ],
  },
  { name: "Export", url: "/export" },
];

export const home = [{ name: "Home", url: "/" }];

export const workSpace = [
  { name: "Monitoring Plans", url: "/workspace/monitoring-plans" },
  {
    name: "QA & Certifications",
    url: "/workspace/qa",
    children: [
      {
        name: "Test Summary Data",
        url: "/workspace/qa-test",
      },
      {
        name: "QA Cert Event Data",
        url: "/workspace/qa-qce",
      },
      {
        name: "Test Extension Exemptions Data",
        url: "/workspace/qa-tee",
      },
    ],
  },
  {
    name: "Emissions",
    url: "/workspace/emission",
    children: [
      {
        name: "Daily",
        url: "/workspace/emissions-daily",
      },
      {
        name: "Hourly",
        url: "/workspace/emissions-hourly",
      },
      {
        name: "MATS",
        url: "/workspace/emissions-mats",
      },
    ],
  },
  { name: "Export", url: "/workspace/export" },
];

export const appNavItems = [
  {
    label: "Home",
    items: [],
  },
  {
    label: "Monitoring Plans",
    items: [],
  },
  {
    label: "QA & Certifications",
    items: [],
  },
  {
    label: "Emissions",
    items: [],
  },
  {
    label: "Workspace",
    items: [
      { menu: "DATA Overview", link: "/data" },
      { menu: "Custom Data Download", link: "/select-data-type" },
      { menu: "Bulk Data Files", link: "" },
    ],
  },
];
