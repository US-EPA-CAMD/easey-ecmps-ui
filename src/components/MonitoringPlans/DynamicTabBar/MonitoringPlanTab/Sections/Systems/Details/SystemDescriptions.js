export const types = [
  {
    code: "CO2",
    description: "CO2 Concentration System"
  },
  {
    code: "FLOW",
    description: "Stack Flow System"
  },
  {
    code: "GAS",
    description: "Gas Fuel Flow System"
  },
  {
    code: "H2O",
    description: "Moisture System that uses wet and dry O2 analyzers"
  },
  {
    code: "H2OM",
    description: "Moisture System that uses a continuous moisture sensor"
  },
  {
    code: "H2OT",
    description:
      "Moisture System that uses a temperature sensor and a table of lookup values"
  },
  {
    code: "HCL",
    description: "HCl Concentration CEMS"
  },
  {
    code: "HF",
    description: "HF Concentration CEMS"
  },
  {
    code: "HG",
    description: "Hg Concentration CEMS"
  },
  {
    code: "LTGS",
    description: "Long Term Gas Fuel Flow System (LME)"
  },
  {
    code: "LTOL",
    description: "Long Term Oil Fuel Flow System (LME)"
  },
  {
    code: "NOX",
    description: "NOx Emission Rate System"
  },
  {
    code: "NOXC",
    description: "NOx Concentration System "
  },

  {
    code: "NOXE",
    description: "Appendix E NOx System"
  },
  {
    code: "NOXP",
    description: "NOx Emission Rate PEMS System"
  },
  {
    code: "O2",
    description: "O2 Concentration System"
  },
  {
    code: "OILM",
    description: "Mass of Oil Fuel Flow System"
  },
  {
    code: "OILV",
    description: "Volumetric Oil Fuel Flow System"
  },
  {
    code: "OP",
    description: "Opacity (ARP only)"
  },
  {
    code: "PM",
    description: "Particulate Matter Monitoring System"
  },
  {
    code: "SO2",
    description: "SO2 Concentration System"
  },
  {
    code: "ST",
    description: "Sorbent Trap Monitoring System"
  },
];

export const designations = [
  {
    code: "P",
    description: "Primary"
  },
  {
    code: "PB",
    description: "Primary Bypass",
    detail:
      "a monitoring system located on a bypass stack before a heat recovery steam generator (HRSG)1"
  },
  {
    code: "RB",
    description: "Redundant Backup",
    detail:
      "a redundant backup (RB) monitoring system is operated and maintained by meeting all of the same program QA/QC requirements as a primary system"
  },
  {
    code: "B",
    description: "Non-Redundant Backup",
    detail:
      "a 'cold' backup or portable monitoring system, having its own probe, sample interface, and analytical components"
  },
  {
    code: "DB",
    description: "Data Backup",
    detail:
      "a system comprised of the analytical components contained in the primary monitoring system (or in a redundant backup system), but includes a backup DAHS component"
  },
  {
    code: "RM",
    description: "Reference Method Backup",
    detail:
      "a monitoring system that is operated as a reference method pursuant to the requirements of Appendix A to Part 60"
  },
  {
    code: "CI2",
    description: "Certified Monitoring System",
    detail: "at the Inlet to an Emission Control Device"
  },
];

export const fuels = [
  {
    code: "BFG",
    description: "Blast Furnace Gas"
  },
  {
    code: "BUT",
    description: "Butane Gas"
  },
  {
    code: "CGD",
    description: "Coal Derived Gas"
  },
  {
    code: "COG",
    description: "Coke Oven Gas"
  },
  {
    code: "DGG",
    description: "Digester Gas"
  },
  {
    code: "DSL",
    description: "Diesel Oil"
  },
  {
    code: "LFG",
    description: "Landfill Gas"
  },
  {
    code: "LPG",
    description: "Liquefied Petroleum Gas",
    detail: "(if measured as a gas)"
  },
  {
    code: "MIX",
    description: "Mixture of oil/gas fuel types",
    detail: "(for NOXE system for co-fired curve only)"
  },
  {
    code: "NFS",
    description: "Non-Fuel-Specific for all CEMS",
    detail:
      "(including H2O), Sorbent Trap Monitoring Systems, and Opacity Systems"
  },
  {
    code: "NNG",
    description: "Natural Gas"
  },
  {
    code: "OGS",
    description: "Other Gas"
  },
  {
    code: "OIL",
    description: "Residual Oil"
  },
  {
    code: "OOL",
    description: "Other Oil"
  },
  {
    code: "PDG",
    description: "Producer Gas"
  },
  {
    code: "PNG",
    description: "Pipeline Natural Gas"
  },
  {
    code: "PRG",
    description: "Process Gas"
  },
  {
    code: "PRP",
    description: "Propane Gas"
  },
  {
    code: "RFG",
    description: "Refinery Gas"
  },
  {
    code: "SRG",
    description: "Unrefined Sour Gas"
  },
];
