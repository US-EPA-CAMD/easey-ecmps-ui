export const types = [
  { code: "select", name: "Select a Type.. " },
  {
    code: "CO2",
    name: "CO2 Concentration System"
  },
  {
    code: "FLOW",
    name: "Stack Flow System"
  },
  {
    code: "GAS",
    name: "Gas Fuel Flow System"
  },
  {
    code: "H2O",
    name: "Moisture System that uses wet and dry O2 analyzers"
  },
  {
    code: "H2OM",
    name: "Moisture System that uses a continuous moisture sensor"
  },
  {
    code: "H2OT",
    name:
      "Moisture System that uses a temperature sensor and a table of lookup values"
  },
  {
    code: "HCL",
    name: "HCl Concentration CEMS"
  },
  {
    code: "HF",
    name: "HF Concentration CEMS"
  },
  {
    code: "HG",
    name: "Hg Concentration CEMS"
  },
  {
    code: "LTGS",
    name: "Long Term Gas Fuel Flow System (LME)"
  },
  {
    code: "LTOL",
    name: "Long Term Oil Fuel Flow System (LME)"
  },
  {
    code: "NOX",
    name: "NOx Emission Rate System"
  },
  {
    code: "NOXC",
    name: "NOx Concentration System "
  },

  {
    code: "NOXE",
    name: "Appendix E NOx System"
  },
  {
    code: "NOXP",
    name: "NOx Emission Rate PEMS System"
  },
  {
    code: "O2",
    name: "O2 Concentration System"
  },
  {
    code: "OILM",
    name: "Mass of Oil Fuel Flow System"
  },
  {
    code: "OILV",
    name: "Volumetric Oil Fuel Flow System"
  },
  {
    code: "OP",
    name: "Opacity (ARP only)"
  },
  {
    code: "PM",
    name: "Particulate Matter Monitoring System"
  },
  {
    code: "SO2",
    name: "SO2 Concentration System"
  },
  {
    code: "ST",
    name: "Sorbent Trap Monitoring System"
  },
];

export const designations = [
  { code: "select", name: "Select a Designation... " },
  {
    code: "P",
    name: "Primary"
  },
  {
    code: "PB",
    name: "Primary Bypass",
    detail:
      "a monitoring system located on a bypass stack before a heat recovery steam generator (HRSG)1"
  },
  {
    code: "RB",
    name: "Redundant Backup",
    detail:
      "a redundant backup (RB) monitoring system is operated and maintained by meeting all of the same program QA/QC requirements as a primary system"
  },
  {
    code: "B",
    name: "Non-Redundant Backup",
    detail:
      "a 'cold' backup or portable monitoring system, having its own probe, sample interface, and analytical components"
  },
  {
    code: "DB",
    name: "Data Backup",
    detail:
      "a system comprised of the analytical components contained in the primary monitoring system (or in a redundant backup system), but includes a backup DAHS component"
  },
  {
    code: "RM",
    name: "Reference Method Backup",
    detail:
      "a monitoring system that is operated as a reference method pursuant to the requirements of Appendix A to Part 60"
  },
  {
    code: "CI2",
    name: "Certified Monitoring System",
    detail: "at the Inlet to an Emission Control Device"
  },
];

export const fuels = [
  { code: "select", name: "Select a Fuel... " },
  {
    code: "BFG",
    name: "Blast Furnace Gas"
  },
  {
    code: "BUT",
    name: "Butane Gas"
  },
  {
    code: "CGD",
    name: "Coal Derived Gas"
  },
  {
    code: "COG",
    name: "Coke Oven Gas"
  },
  {
    code: "DGG",
    name: "Digester Gas"
  },
  {
    code: "DSL",
    name: "Diesel Oil"
  },
  {
    code: "LFG",
    name: "Landfill Gas"
  },
  {
    code: "LPG",
    name: "Liquefied Petroleum Gas",
    detail: "(if measured as a gas)"
  },
  {
    code: "MIX",
    name: "Mixture of oil/gas fuel types",
    detail: "(for NOXE system for co-fired curve only)"
  },
  {
    code: "NFS",
    name: "Non-Fuel-Specific for all CEMS",
    detail:
      "(including H2O), Sorbent Trap Monitoring Systems, and Opacity Systems"
  },
  {
    code: "NNG",
    name: "Natural Gas"
  },
  {
    code: "OGS",
    name: "Other Gas"
  },
  {
    code: "OIL",
    name: "Residual Oil"
  },
  {
    code: "OOL",
    name: "Other Oil"
  },
  {
    code: "PDG",
    name: "Producer Gas"
  },
  {
    code: "PNG",
    name: "Pipeline Natural Gas"
  },
  {
    code: "PRG",
    name: "Process Gas"
  },
  {
    code: "PRP",
    name: "Propane Gas"
  },
  {
    code: "RFG",
    name: "Refinery Gas"
  },
  {
    code: "SRG",
    name: "Unrefined Sour Gas"
  },
];
