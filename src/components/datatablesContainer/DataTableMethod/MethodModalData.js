export const bypassApproachCodes = [
  { code: "select", name: "Select a Bypass Approach... " },
  { code: "", name: "" },
  { code: "BYMAX", name: "Standard Part 75 for Unmonitored Bypass Stack" },
  { code: "BYMAXFS", name: "Fuel-Specific for Unmonitored Bypass Stack" },
];

export const substituteDataApproachCodes = [
  { code: "select", name: "Select a Substitute Data Approach... " },
  { code: "", name: "" },
  { code: "FSP75", name: "Fuel-Specific Missing Data" },
  {
    code: "FSP75C",
    name: "Fuel-Specific Missing Data with Separate Co-Fired Database",
  },
  {
    code: "MHHI",
    name:
      "Maximum Rated Hourly Heat Input Rate for LME Units Normal using Long Term Fuel Flow",
  },
  { code: "NLB", name: "Non Load-Based Missing Data" },
  { code: "NLBOP", name: "Non Load-Based Missing Data with Operational Bins" },
  { code: "OZN75", name: "Ozone vs Non-Ozone NOX Missing Data" },
  { code: "REV75", name: "Inverse Part 75 for H2O or O2 Missing Data" },
  { code: "SPTS", name: "Standard Part 75 for Missing Data" },
];

export const parameterCodes = [
  { code: "select", name: "Select a Parameter... " },
  { code: "", name: "" },
  { code: "AKSF", name: "Appendix K Sample to Stack Flow Scaling Factor" },
  { code: "BCO2", name: "Biogenic CO2 Mass (ton)" },
  { code: "BWA", name: "Moisture Fraction in Ambient Air" },
  { code: "CO2", name: "CO2 Hourly Mass Rate (ton/hr)" },
  { code: "CO2C", name: "CO2 Concentration (pct)" },
  { code: "SO2", name: "SO2 Hourly Mass Rate (ton/hr)" },
];

export const methodCodes = [
  { code: "select", name: "Select a Method.. " },
  { code: "", name: "" },
  { code: "AD", name: "Appendix D" },
  { code: "ADCALC", name: "Appendix D Measured and Apportioned" },
  { code: "AE", name: "Appendix E" },
  { code: "AMS", name: "Alternative Monitoring System" },
  { code: "CALC", name: "Apportioned or Summed Value" },
];
