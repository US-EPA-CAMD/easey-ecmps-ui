import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ImportModal from "./ImportModal";
import {
  QA_CERT_TEST_SUMMARY_STORE_NAME,
  MONITORING_PLAN_STORE_NAME,
  EMISSIONS_STORE_NAME,
} from "../../additional-functions/workspace-section-and-store-names";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
const mock = new MockAdapter(axios);
const schema = {
  "$schema": "http://json-schema.org/draft-06/schema#",
  "title": "QACertification",
  "type": "object",
  "additionalProperties": true,
  "properties": {
    "orisCode": {
      "type": "number"
    },
    "version": {
      "type": [
        "string",
        "null"
      ]
    },
    "testSummaryData": {
      "type": "array",
      "minItems": 0,
      "items": {
        "$ref": "#/definitions/TestSummary"
      }
    },
    "qaCertificationEventData": {
      "type": "array",
      "minItems": 0,
      "items": {
        "$ref": "#/definitions/QACertificationEvent"
      }
    },
    "testExtensionExemptionData": {
      "type": "array",
      "minItems": 0,
      "items": {
        "$ref": "#/definitions/TestExtensionExemption"
      }
    }
  },
  "required": [
    "orisCode"
  ],
  "definitions": {
    "TestSummary": {
      "title": "TestSummary",
      "type": "object",
      "anyOf": [
        {
          "required": [
            "stackPipeId"
          ]
        },
        {
          "required": [
            "unitId"
          ]
        }
      ],
      "additionalProperties": true,
      "properties": {
        "stackPipeId": {
          "type": [
            "string",
            "null"
          ]
        },
        "unitId": {
          "type": [
            "string",
            "null"
          ]
        },
        "testTypeCode": {
          "type": "string"
        },
        "monitoringSystemID": {
          "type": [
            "string",
            "null"
          ]
        },
        "componentID": {
          "type": [
            "string",
            "null"
          ]
        },
        "spanScaleCode": {
          "type": [
            "string",
            "null"
          ]
        },
        "testNumber": {
          "type": "string"
        },
        "testReasonCode": {
          "type": [
            "string",
            "null"
          ]
        },
        "testDescription": {
          "type": [
            "string",
            "null"
          ]
        },
        "testResultCode": {
          "type": [
            "string",
            "null"
          ]
        },
        "beginDate": {
          "type": [
            "string",
            "null"
          ],
          "format": "date"
        },
        "beginHour": {
          "type": [
            "number",
            "null"
          ]
        },
        "beginMinute": {
          "type": [
            "number",
            "null"
          ]
        },
        "endDate": {
          "type": [
            "string",
            "null"
          ],
          "format": "date"
        },
        "endHour": {
          "type": [
            "number",
            "null"
          ]
        },
        "endMinute": {
          "type": [
            "number",
            "null"
          ]
        },
        "gracePeriodIndicator": {
          "type": [
            "number",
            "null"
          ]
        },
        "year": {
          "type": [
            "number",
            "null"
          ]
        },
        "quarter": {
          "type": [
            "number",
            "null"
          ]
        },
        "testComment": {
          "type": [
            "string",
            "null"
          ]
        },
        "injectionProtocolCode": {
          "type": [
            "string",
            "null"
          ]
        },
        "calibrationInjectionData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/CalibrationInjection"
          }
        },
        "linearitySummaryData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/LinearitySummary"
          }
        },
        "rataData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/Rata"
          }
        },
        "flowToLoadReferenceData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/FlowToLoadReference"
          }
        },
        "flowToLoadCheckData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/FlowToLoadCheck"
          }
        },
        "cycleTimeSummaryData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/CycleTimeSummary"
          }
        },
        "onlineOfflineCalibrationData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/OnlineOfflineCalibration"
          }
        },
        "fuelFlowmeterAccuracyData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/FuelFlowmeterAccuracy"
          }
        },
        "transmitterTransducerData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/TransmitterTransducer"
          }
        },
        "fuelFlowToLoadBaselineData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/FuelFlowToLoadBaseline"
          }
        },
        "fuelFlowToLoadTestData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/FuelFlowToLoadCheck"
          }
        },
        "appECorrelationTestSummaryData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/AppECorrelationTestSummary"
          }
        },
        "unitDefaultTestData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/UnitDefaultTest"
          }
        },
        "hgSummaryData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/HgSummary"
          }
        },
        "testQualificationData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/TestQualification"
          }
        },
        "protocolGasData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/ProtocolGas"
          }
        },
        "airEmissionTestData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/AirEmissionTest"
          }
        }
      },
      "required": [
        "testTypeCode",
        "monitoringSystemID",
        "componentID",
        "spanScaleCode",
        "testNumber",
        "testReasonCode",
        "testDescription",
        "testResultCode",
        "beginDate",
        "beginHour",
        "beginMinute",
        "endDate",
        "endHour",
        "endMinute",
        "gracePeriodIndicator",
        "year",
        "quarter",
        "testComment",
        "injectionProtocolCode"
      ]
    },
    "QACertificationEvent": {
      "title": "QACertificationEvent",
      "type": "object",
      "anyOf": [
        {
          "required": [
            "stackPipeId"
          ]
        },
        {
          "required": [
            "unitId"
          ]
        }
      ],
      "additionalProperties": true,
      "properties": {
        "stackPipeId": {
          "type": [
            "string",
            "null"
          ]
        },
        "unitId": {
          "type": [
            "string",
            "null"
          ]
        },
        "monitoringSystemID": {
          "type": [
            "string",
            "null"
          ]
        },
        "componentID": {
          "type": [
            "string",
            "null"
          ]
        },
        "qaCertEventCode": {
          "type": "string"
        },
        "qaCertEventDate": {
          "type": "string",
          "format": "date"
        },
        "qaCertEventHour": {
          "type": [
            "number",
            "null"
          ]
        },
        "requiredTestCode": {
          "type": [
            "string",
            "null"
          ]
        },
        "conditionalBeginDate": {
          "type": [
            "string",
            "null"
          ],
          "format": "date"
        },
        "conditionalBeginHour": {
          "type": [
            "number",
            "null"
          ]
        },
        "completionTestDate": {
          "type": [
            "string",
            "null"
          ],
          "format": "date"
        },
        "completionTestHour": {
          "type": [
            "number",
            "null"
          ]
        }
      },
      "required": [
        "monitoringSystemID",
        "componentID",
        "qaCertEventCode",
        "qaCertEventDate",
        "qaCertEventHour",
        "requiredTestCode",
        "conditionalBeginDate",
        "conditionalBeginHour",
        "completionTestDate",
        "completionTestHour"
      ]
    },
    "TestExtensionExemption": {
      "title": "TestExtensionExemption",
      "type": "object",
      "anyOf": [
        {
          "required": [
            "stackPipeId"
          ]
        },
        {
          "required": [
            "unitId"
          ]
        }
      ],
      "additionalProperties": true,
      "properties": {
        "stackPipeId": {
          "type": [
            "string",
            "null"
          ]
        },
        "unitId": {
          "type": [
            "string",
            "null"
          ]
        },
        "year": {
          "type": "number"
        },
        "quarter": {
          "type": "number"
        },
        "monitoringSystemID": {
          "type": [
            "string",
            "null"
          ]
        },
        "componentID": {
          "type": [
            "string",
            "null"
          ]
        },
        "hoursUsed": {
          "type": [
            "number",
            "null"
          ]
        },
        "spanScaleCode": {
          "type": [
            "string",
            "null"
          ]
        },
        "fuelCode": {
          "type": [
            "string",
            "null"
          ]
        },
        "extensionOrExemptionCode": {
          "type": "string"
        }
      },
      "required": [
        "year",
        "quarter",
        "monitoringSystemID",
        "componentID",
        "hoursUsed",
        "spanScaleCode",
        "fuelCode",
        "extensionOrExemptionCode"
      ]
    },
    "CalibrationInjection": {
      "title": "CalibrationInjection",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "onlineOfflineIndicator": {
          "type": [
            "number",
            "null"
          ]
        },
        "upscaleGasLevelCode": {
          "type": [
            "string",
            "null"
          ]
        },
        "zeroInjectionDate": {
          "type": [
            "string",
            "null"
          ],
          "format": "date"
        },
        "zeroInjectionHour": {
          "type": [
            "number",
            "null"
          ]
        },
        "zeroInjectionMinute": {
          "type": [
            "number",
            "null"
          ]
        },
        "upscaleInjectionDate": {
          "type": [
            "string",
            "null"
          ],
          "format": "date"
        },
        "upscaleInjectionHour": {
          "type": [
            "number",
            "null"
          ]
        },
        "upscaleInjectionMinute": {
          "type": [
            "number",
            "null"
          ]
        },
        "zeroMeasuredValue": {
          "type": [
            "number",
            "null"
          ]
        },
        "upscaleMeasuredValue": {
          "type": [
            "number",
            "null"
          ]
        },
        "zeroAPSIndicator": {
          "type": [
            "number",
            "null"
          ]
        },
        "upscaleAPSIndicator": {
          "type": [
            "number",
            "null"
          ]
        },
        "zeroCalibrationError": {
          "type": [
            "number",
            "null"
          ]
        },
        "upscaleCalibrationError": {
          "type": [
            "number",
            "null"
          ]
        },
        "zeroReferenceValue": {
          "type": [
            "number",
            "null"
          ]
        },
        "upscaleReferenceValue": {
          "type": [
            "number",
            "null"
          ]
        }
      },
      "required": [
        "onlineOfflineIndicator",
        "upscaleGasLevelCode",
        "zeroInjectionDate",
        "zeroInjectionHour",
        "zeroInjectionMinute",
        "upscaleInjectionDate",
        "upscaleInjectionHour",
        "upscaleInjectionMinute",
        "zeroMeasuredValue",
        "upscaleMeasuredValue",
        "zeroAPSIndicator",
        "upscaleAPSIndicator",
        "zeroCalibrationError",
        "upscaleCalibrationError",
        "zeroReferenceValue",
        "upscaleReferenceValue"
      ]
    },
    "LinearitySummary": {
      "title": "LinearitySummary",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "gasLevelCode": {
          "type": "string"
        },
        "meanMeasuredValue": {
          "type": [
            "number",
            "null"
          ]
        },
        "meanReferenceValue": {
          "type": [
            "number",
            "null"
          ]
        },
        "percentError": {
          "type": [
            "number",
            "null"
          ]
        },
        "apsIndicator": {
          "type": [
            "number",
            "null"
          ]
        },
        "linearityInjectionData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/LinearityInjection"
          }
        }
      },
      "required": [
        "gasLevelCode",
        "meanMeasuredValue",
        "meanReferenceValue",
        "percentError",
        "apsIndicator"
      ]
    },
    "LinearityInjection": {
      "title": "LinearityInjection",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "injectionDate": {
          "type": "string",
          "format": "date"
        },
        "injectionHour": {
          "type": [
            "number",
            "null"
          ]
        },
        "injectionMinute": {
          "type": "number"
        },
        "measuredValue": {
          "type": [
            "number",
            "null"
          ]
        },
        "referenceValue": {
          "type": [
            "number",
            "null"
          ]
        }
      },
      "required": [
        "injectionDate",
        "injectionHour",
        "injectionMinute",
        "measuredValue",
        "referenceValue"
      ]
    },
    "Rata": {
      "title": "Rata",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "numberOfLoadLevels": {
          "type": [
            "number",
            "null"
          ]
        },
        "relativeAccuracy": {
          "type": [
            "number",
            "null"
          ]
        },
        "rataFrequencyCode": {
          "type": [
            "string",
            "null"
          ]
        },
        "overallBiasAdjustmentFactor": {
          "type": [
            "number",
            "null"
          ]
        },
        "rataSummaryData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/RATASummary"
          }
        }
      },
      "required": [
        "numberOfLoadLevels",
        "relativeAccuracy",
        "rataFrequencyCode",
        "overallBiasAdjustmentFactor"
      ]
    },
    "RATASummary": {
      "title": "RATASummary",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "operatingLevelCode": {
          "type": "string"
        },
        "averageGrossUnitLoad": {
          "type": [
            "number",
            "null"
          ]
        },
        "referenceMethodCode": {
          "type": [
            "string",
            "null"
          ]
        },
        "meanCEMValue": {
          "type": [
            "number",
            "null"
          ]
        },
        "meanRATAReferenceValue": {
          "type": [
            "number",
            "null"
          ]
        },
        "meanDifference": {
          "type": [
            "number",
            "null"
          ]
        },
        "standardDeviationDifference": {
          "type": [
            "number",
            "null"
          ]
        },
        "confidenceCoefficient": {
          "type": [
            "number",
            "null"
          ]
        },
        "tvalue": {
          "type": [
            "number",
            "null"
          ]
        },
        "apsIndicator": {
          "type": [
            "number",
            "null"
          ]
        },
        "apsCode": {
          "type": [
            "string",
            "null"
          ]
        },
        "relativeAccuracy": {
          "type": [
            "number",
            "null"
          ]
        },
        "biasAdjustmentFactor": {
          "type": [
            "number",
            "null"
          ]
        },
        "co2OrO2ReferenceMethodCode": {
          "type": [
            "string",
            "null"
          ]
        },
        "stackDiameter": {
          "type": [
            "number",
            "null"
          ]
        },
        "stackArea": {
          "type": [
            "number",
            "null"
          ]
        },
        "numberOfTraversePoints": {
          "type": [
            "number",
            "null"
          ]
        },
        "calculatedWAF": {
          "type": [
            "number",
            "null"
          ]
        },
        "defaultWAF": {
          "type": [
            "number",
            "null"
          ]
        },
        "rataRunData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/RATARun"
          }
        }
      },
      "required": [
        "operatingLevelCode",
        "averageGrossUnitLoad",
        "referenceMethodCode",
        "meanCEMValue",
        "meanRATAReferenceValue",
        "meanDifference",
        "standardDeviationDifference",
        "confidenceCoefficient",
        "tvalue",
        "apsIndicator",
        "apsCode",
        "relativeAccuracy",
        "biasAdjustmentFactor",
        "co2OrO2ReferenceMethodCode",
        "stackDiameter",
        "stackArea",
        "numberOfTraversePoints",
        "calculatedWAF",
        "defaultWAF"
      ]
    },
    "RATARun": {
      "title": "RATARun",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "runNumber": {
          "type": "number"
        },
        "beginDate": {
          "type": [
            "string",
            "null"
          ],
          "format": "date"
        },
        "beginHour": {
          "type": [
            "number",
            "null"
          ]
        },
        "beginMinute": {
          "type": "number"
        },
        "endDate": {
          "type": [
            "string",
            "null"
          ],
          "format": "date"
        },
        "endHour": {
          "type": [
            "number",
            "null"
          ]
        },
        "endMinute": {
          "type": "number"
        },
        "cemValue": {
          "type": [
            "number",
            "null"
          ]
        },
        "rataReferenceValue": {
          "type": [
            "number",
            "null"
          ]
        },
        "grossUnitLoad": {
          "type": [
            "number",
            "null"
          ]
        },
        "runStatusCode": {
          "type": [
            "string",
            "null"
          ]
        },
        "flowRataRunData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/FlowRATARun"
          }
        }
      },
      "required": [
        "runNumber",
        "beginDate",
        "beginHour",
        "beginMinute",
        "endDate",
        "endHour",
        "endMinute",
        "cemValue",
        "rataReferenceValue",
        "grossUnitLoad",
        "runStatusCode"
      ]
    },
    "FlowRATARun": {
      "title": "FlowRATARun",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "numberOfTraversePoints": {
          "type": [
            "number",
            "null"
          ]
        },
        "barometricPressure": {
          "type": [
            "number",
            "null"
          ]
        },
        "staticStackPressure": {
          "type": [
            "number",
            "null"
          ]
        },
        "percentCO2": {
          "type": [
            "number",
            "null"
          ]
        },
        "percentO2": {
          "type": [
            "number",
            "null"
          ]
        },
        "percentMoisture": {
          "type": [
            "number",
            "null"
          ]
        },
        "dryMolecularWeight": {
          "type": [
            "number",
            "null"
          ]
        },
        "wetMolecularWeight": {
          "type": [
            "number",
            "null"
          ]
        },
        "avgVelocityWithoutWallEffects": {
          "type": [
            "number",
            "null"
          ]
        },
        "averageVelocityWithWallEffects": {
          "type": [
            "number",
            "null"
          ]
        },
        "calculatedWAF": {
          "type": [
            "number",
            "null"
          ]
        },
        "averageStackFlowRate": {
          "type": [
            "number",
            "null"
          ]
        },
        "rataTraverseData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/RATATraverse"
          }
        }
      },
      "required": [
        "numberOfTraversePoints",
        "barometricPressure",
        "staticStackPressure",
        "percentCO2",
        "percentO2",
        "percentMoisture",
        "dryMolecularWeight",
        "wetMolecularWeight",
        "avgVelocityWithoutWallEffects",
        "averageVelocityWithWallEffects",
        "calculatedWAF",
        "averageStackFlowRate"
      ]
    },
    "RATATraverse": {
      "title": "RATATraverse",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "probeID": {
          "type": [
            "string",
            "null"
          ]
        },
        "probeTypeCode": {
          "type": [
            "string",
            "null"
          ]
        },
        "pressureMeasureCode": {
          "type": [
            "string",
            "null"
          ]
        },
        "methodTraversePointID": {
          "type": "string"
        },
        "velocityCalibrationCoefficient": {
          "type": [
            "number",
            "null"
          ]
        },
        "lastProbeDate": {
          "type": [
            "string",
            "null"
          ],
          "format": "date"
        },
        "avgVelDiffPressure": {
          "type": [
            "number",
            "null"
          ]
        },
        "avgSquareVelDiffPressure": {
          "type": [
            "number",
            "null"
          ]
        },
        "tstackTemperature": {
          "type": [
            "number",
            "null"
          ]
        },
        "pointUsedIndicator": {
          "type": [
            "number",
            "null"
          ]
        },
        "numberWallEffectsPoints": {
          "type": [
            "number",
            "null"
          ]
        },
        "yawAngle": {
          "type": [
            "number",
            "null"
          ]
        },
        "pitchAngle": {
          "type": [
            "number",
            "null"
          ]
        },
        "calculatedVelocity": {
          "type": [
            "number",
            "null"
          ]
        },
        "replacementVelocity": {
          "type": [
            "number",
            "null"
          ]
        }
      },
      "required": [
        "probeID",
        "probeTypeCode",
        "pressureMeasureCode",
        "methodTraversePointID",
        "velocityCalibrationCoefficient",
        "lastProbeDate",
        "avgVelDiffPressure",
        "avgSquareVelDiffPressure",
        "tstackTemperature",
        "pointUsedIndicator",
        "numberWallEffectsPoints",
        "yawAngle",
        "pitchAngle",
        "calculatedVelocity",
        "replacementVelocity"
      ]
    },
    "FlowToLoadReference": {
      "title": "FlowToLoadReference",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "rataTestNumber": {
          "type": [
            "string",
            "null"
          ]
        },
        "operatingLevelCode": {
          "type": "string"
        },
        "averageGrossUnitLoad": {
          "type": [
            "number",
            "null"
          ]
        },
        "averageReferenceMethodFlow": {
          "type": [
            "number",
            "null"
          ]
        },
        "referenceFlowLoadRatio": {
          "type": [
            "number",
            "null"
          ]
        },
        "averageHourlyHeatInputRate": {
          "type": [
            "number",
            "null"
          ]
        },
        "referenceGrossHeatRate": {
          "type": [
            "number",
            "null"
          ]
        },
        "calcSeparateReferenceIndicator": {
          "type": [
            "number",
            "null"
          ]
        }
      },
      "required": [
        "rataTestNumber",
        "operatingLevelCode",
        "averageGrossUnitLoad",
        "averageReferenceMethodFlow",
        "referenceFlowLoadRatio",
        "averageHourlyHeatInputRate",
        "referenceGrossHeatRate",
        "calcSeparateReferenceIndicator"
      ]
    },
    "FlowToLoadCheck": {
      "title": "FlowToLoadCheck",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "testBasisCode": {
          "type": [
            "string",
            "null"
          ]
        },
        "biasAdjustedIndicator": {
          "type": [
            "number",
            "null"
          ]
        },
        "avgAbsolutePercentDiff": {
          "type": [
            "number",
            "null"
          ]
        },
        "numberOfHours": {
          "type": [
            "number",
            "null"
          ]
        },
        "numberOfHoursExcludedForFuel": {
          "type": [
            "number",
            "null"
          ]
        },
        "numberOfHoursExcludedRamping": {
          "type": [
            "number",
            "null"
          ]
        },
        "numberOfHoursExcludedBypass": {
          "type": [
            "number",
            "null"
          ]
        },
        "numberOfHoursExcludedPreRATA": {
          "type": [
            "number",
            "null"
          ]
        },
        "numberOfHoursExcludedTest": {
          "type": [
            "number",
            "null"
          ]
        },
        "numberOfHoursExcMainBypass": {
          "type": [
            "number",
            "null"
          ]
        },
        "operatingLevelCode": {
          "type": [
            "string",
            "null"
          ]
        }
      },
      "required": [
        "testBasisCode",
        "biasAdjustedIndicator",
        "avgAbsolutePercentDiff",
        "numberOfHours",
        "numberOfHoursExcludedForFuel",
        "numberOfHoursExcludedRamping",
        "numberOfHoursExcludedBypass",
        "numberOfHoursExcludedPreRATA",
        "numberOfHoursExcludedTest",
        "numberOfHoursExcMainBypass",
        "operatingLevelCode"
      ]
    },
    "CycleTimeSummary": {
      "title": "CycleTimeSummary",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "totalTime": {
          "type": [
            "number",
            "null"
          ]
        },
        "cycleTimeInjectionData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/CycleTimeInjection"
          }
        }
      },
      "required": [
        "totalTime"
      ]
    },
    "CycleTimeInjection": {
      "title": "CycleTimeInjection",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "gasLevelCode": {
          "type": "string"
        },
        "calibrationGasValue": {
          "type": [
            "number",
            "null"
          ]
        },
        "beginDate": {
          "type": [
            "string",
            "null"
          ],
          "format": "date"
        },
        "beginHour": {
          "type": [
            "number",
            "null"
          ]
        },
        "beginMinute": {
          "type": "number"
        },
        "endDate": {
          "type": [
            "string",
            "null"
          ],
          "format": "date"
        },
        "endHour": {
          "type": [
            "number",
            "null"
          ]
        },
        "endMinute": {
          "type": "number"
        },
        "injectionCycleTime": {
          "type": [
            "number",
            "null"
          ]
        },
        "beginMonitorValue": {
          "type": [
            "number",
            "null"
          ]
        },
        "endMonitorValue": {
          "type": [
            "number",
            "null"
          ]
        }
      },
      "required": [
        "gasLevelCode",
        "calibrationGasValue",
        "beginDate",
        "beginHour",
        "beginMinute",
        "endDate",
        "endHour",
        "endMinute",
        "injectionCycleTime",
        "beginMonitorValue",
        "endMonitorValue"
      ]
    },
    "OnlineOfflineCalibration": {
      "title": "OnlineOfflineCalibration",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "onlineZeroReferenceValue": {
          "type": [
            "number",
            "null"
          ]
        },
        "onlineUpscaleReferenceValue": {
          "type": [
            "number",
            "null"
          ]
        },
        "offlineZeroReferenceValue": {
          "type": [
            "number",
            "null"
          ]
        },
        "offlineUpscaleReferenceValue": {
          "type": [
            "number",
            "null"
          ]
        },
        "onlineZeroMeasuredValue": {
          "type": [
            "number",
            "null"
          ]
        },
        "onlineUpscaleMeasuredValue": {
          "type": [
            "number",
            "null"
          ]
        },
        "offlineZeroMeasuredValue": {
          "type": [
            "number",
            "null"
          ]
        },
        "offlineUpscaleMeasuredValue": {
          "type": [
            "number",
            "null"
          ]
        },
        "onlineZeroCalibrationError": {
          "type": [
            "number",
            "null"
          ]
        },
        "onlineUpscaleCalibrationError": {
          "type": [
            "number",
            "null"
          ]
        },
        "offlineZeroCalibrationError": {
          "type": [
            "number",
            "null"
          ]
        },
        "offlineUpscaleCalibrationError": {
          "type": [
            "number",
            "null"
          ]
        },
        "UpscaleGasLevelCode": {
          "type": [
            "string",
            "null"
          ]
        },
        "onlineZeroAPSIndicator": {
          "type": [
            "number",
            "null"
          ]
        },
        "onlineUpscaleAPSIndicator": {
          "type": [
            "number",
            "null"
          ]
        },
        "offlineZeroAPSIndicator": {
          "type": [
            "number",
            "null"
          ]
        },
        "offlineUpscaleAPSIndicator": {
          "type": [
            "number",
            "null"
          ]
        },
        "onlineZeroInjectionDate": {
          "type": [
            "string",
            "null"
          ],
          "format": "date"
        },
        "onlineUpscaleInjectionDate": {
          "type": [
            "string",
            "null"
          ],
          "format": "date"
        },
        "offlineZeroInjectionDate": {
          "type": [
            "string",
            "null"
          ],
          "format": "date"
        },
        "offlineUpscaleInjectionDate": {
          "type": [
            "string",
            "null"
          ],
          "format": "date"
        },
        "onlineZeroInjectionHour": {
          "type": [
            "number",
            "null"
          ]
        },
        "onlineUpscaleInjectionHour": {
          "type": [
            "number",
            "null"
          ]
        },
        "offlineZeroInjectionHour": {
          "type": [
            "number",
            "null"
          ]
        },
        "offlineUpscaleInjectionHour": {
          "type": [
            "number",
            "null"
          ]
        }
      },
      "required": [
        "onlineZeroReferenceValue",
        "onlineUpscaleReferenceValue",
        "offlineZeroReferenceValue",
        "offlineUpscaleReferenceValue",
        "onlineZeroMeasuredValue",
        "onlineUpscaleMeasuredValue",
        "offlineZeroMeasuredValue",
        "offlineUpscaleMeasuredValue",
        "onlineZeroCalibrationError",
        "onlineUpscaleCalibrationError",
        "offlineZeroCalibrationError",
        "offlineUpscaleCalibrationError",
        "UpscaleGasLevelCode",
        "onlineZeroAPSIndicator",
        "onlineUpscaleAPSIndicator",
        "offlineZeroAPSIndicator",
        "offlineUpscaleAPSIndicator",
        "onlineZeroInjectionDate",
        "onlineUpscaleInjectionDate",
        "offlineZeroInjectionDate",
        "offlineUpscaleInjectionDate",
        "onlineZeroInjectionHour",
        "onlineUpscaleInjectionHour",
        "offlineZeroInjectionHour",
        "offlineUpscaleInjectionHour"
      ]
    },
    "FuelFlowmeterAccuracy": {
      "title": "FuelFlowmeterAccuracy",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "accuracyTestMethodCode": {
          "type": [
            "string",
            "null"
          ]
        },
        "lowFuelAccuracy": {
          "type": [
            "number",
            "null"
          ]
        },
        "midFuelAccuracy": {
          "type": [
            "number",
            "null"
          ]
        },
        "highFuelAccuracy": {
          "type": [
            "number",
            "null"
          ]
        },
        "reinstallationDate": {
          "type": [
            "string",
            "null"
          ],
          "format": "date"
        },
        "reinstallationHour": {
          "type": [
            "number",
            "null"
          ]
        }
      },
      "required": [
        "accuracyTestMethodCode",
        "lowFuelAccuracy",
        "midFuelAccuracy",
        "highFuelAccuracy",
        "reinstallationDate",
        "reinstallationHour"
      ]
    },
    "TransmitterTransducer": {
      "title": "TransmitterTransducer",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "lowLevelAccuracy": {
          "type": [
            "number",
            "null"
          ]
        },
        "lowLevelAccuracySpecCode": {
          "type": [
            "string",
            "null"
          ]
        },
        "midLevelAccuracy": {
          "type": [
            "number",
            "null"
          ]
        },
        "midLevelAccuracySpecCode": {
          "type": [
            "string",
            "null"
          ]
        },
        "highLevelAccuracy": {
          "type": [
            "number",
            "null"
          ]
        },
        "highLevelAccuracySpecCode": {
          "type": [
            "string",
            "null"
          ]
        }
      },
      "required": [
        "lowLevelAccuracy",
        "lowLevelAccuracySpecCode",
        "midLevelAccuracy",
        "midLevelAccuracySpecCode",
        "highLevelAccuracy",
        "highLevelAccuracySpecCode"
      ]
    },
    "FuelFlowToLoadBaseline": {
      "title": "FuelFlowToLoadBaseline",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "accuracyTestNumber": {
          "type": [
            "string",
            "null"
          ]
        },
        "peiTestNumber": {
          "type": [
            "string",
            "null"
          ]
        },
        "averageFuelFlowRate": {
          "type": [
            "number",
            "null"
          ]
        },
        "averageLoad": {
          "type": [
            "number",
            "null"
          ]
        },
        "baselineFuelFlowToLoadRatio": {
          "type": [
            "number",
            "null"
          ]
        },
        "fuelFlowToLoadUOMCode": {
          "type": [
            "string",
            "null"
          ]
        },
        "averageHourlyHeatInputRate": {
          "type": [
            "number",
            "null"
          ]
        },
        "baselineGHR": {
          "type": [
            "number",
            "null"
          ]
        },
        "ghrUnitsOfMeasureCode": {
          "type": [
            "string",
            "null"
          ]
        },
        "numberOfHoursExcludedCofiring": {
          "type": [
            "number",
            "null"
          ]
        },
        "numberOfHoursExcludedRamping": {
          "type": [
            "number",
            "null"
          ]
        },
        "numberOfHoursExcludedLowRange": {
          "type": [
            "number",
            "null"
          ]
        }
      },
      "required": [
        "accuracyTestNumber",
        "peiTestNumber",
        "averageFuelFlowRate",
        "averageLoad",
        "baselineFuelFlowToLoadRatio",
        "fuelFlowToLoadUOMCode",
        "averageHourlyHeatInputRate",
        "baselineGHR",
        "ghrUnitsOfMeasureCode",
        "numberOfHoursExcludedCofiring",
        "numberOfHoursExcludedRamping",
        "numberOfHoursExcludedLowRange"
      ]
    },
    "FuelFlowToLoadCheck": {
      "title": "FuelFlowToLoadCheck",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "testBasisCode": {
          "type": [
            "string",
            "null"
          ]
        },
        "averageDifference": {
          "type": [
            "number",
            "null"
          ]
        },
        "numberOfHoursUsed": {
          "type": [
            "number",
            "null"
          ]
        },
        "numberOfHoursExcludedCofiring": {
          "type": [
            "number",
            "null"
          ]
        },
        "numberOfHoursExcludedRamping": {
          "type": [
            "number",
            "null"
          ]
        },
        "numberOfHoursExcludedLowRange": {
          "type": [
            "number",
            "null"
          ]
        }
      },
      "required": [
        "testBasisCode",
        "averageDifference",
        "numberOfHoursUsed",
        "numberOfHoursExcludedCofiring",
        "numberOfHoursExcludedRamping",
        "numberOfHoursExcludedLowRange"
      ]
    },
    "AppECorrelationTestSummary": {
      "title": "AppECorrelationTestSummary",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "operatingLevelForRun": {
          "type": "number"
        },
        "meanReferenceValue": {
          "type": [
            "number",
            "null"
          ]
        },
        "averageHourlyHeatInputRate": {
          "type": [
            "number",
            "null"
          ]
        },
        "fFactor": {
          "type": [
            "number",
            "null"
          ]
        },
        "appECorrelationTestRunData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/AppECorrelationTestRun"
          }
        }
      },
      "required": [
        "operatingLevelForRun",
        "meanReferenceValue",
        "averageHourlyHeatInputRate",
        "fFactor"
      ]
    },
    "AppECorrelationTestRun": {
      "title": "AppECorrelationTestRun",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "runNumber": {
          "type": "number"
        },
        "referenceValue": {
          "type": [
            "number",
            "null"
          ]
        },
        "hourlyHeatInputRate": {
          "type": [
            "number",
            "null"
          ]
        },
        "totalHeatInput": {
          "type": [
            "number",
            "null"
          ]
        },
        "responseTime": {
          "type": [
            "number",
            "null"
          ]
        },
        "beginDate": {
          "type": [
            "string",
            "null"
          ],
          "format": "date"
        },
        "beginHour": {
          "type": [
            "number",
            "null"
          ]
        },
        "beginMinute": {
          "type": [
            "number",
            "null"
          ]
        },
        "endDate": {
          "type": [
            "string",
            "null"
          ],
          "format": "date"
        },
        "endHour": {
          "type": [
            "number",
            "null"
          ]
        },
        "endMinute": {
          "type": [
            "number",
            "null"
          ]
        },
        "appendixEHeatInputFromOilData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/AppendixEHeatInputFromOil"
          }
        },
        "appendixEHeatInputFromGasData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/AppendixEHeatInputFromGas"
          }
        }
      },
      "required": [
        "runNumber",
        "referenceValue",
        "hourlyHeatInputRate",
        "totalHeatInput",
        "responseTime",
        "beginDate",
        "beginHour",
        "beginMinute",
        "endDate",
        "endHour",
        "endMinute"
      ]
    },
    "AppendixEHeatInputFromOil": {
      "title": "AppendixEHeatInputFromOil",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "monitoringSystemID": {
          "type": "string"
        },
        "oilMass": {
          "type": [
            "number",
            "null"
          ]
        },
        "oilGCV": {
          "type": [
            "number",
            "null"
          ]
        },
        "oilGCVUnitsOfMeasureCode": {
          "type": [
            "string",
            "null"
          ]
        },
        "oilHeatInput": {
          "type": [
            "number",
            "null"
          ]
        },
        "oilVolume": {
          "type": [
            "number",
            "null"
          ]
        },
        "oilVolumeUnitsOfMeasureCode": {
          "type": [
            "string",
            "null"
          ]
        },
        "oilDensity": {
          "type": [
            "number",
            "null"
          ]
        },
        "oilDensityUnitsOfMeasureCode": {
          "type": [
            "string",
            "null"
          ]
        }
      },
      "required": [
        "monitoringSystemID",
        "oilMass",
        "oilGCV",
        "oilGCVUnitsOfMeasureCode",
        "oilHeatInput",
        "oilVolume",
        "oilVolumeUnitsOfMeasureCode",
        "oilDensity",
        "oilDensityUnitsOfMeasureCode"
      ]
    },
    "AppendixEHeatInputFromGas": {
      "title": "AppendixEHeatInputFromGas",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "monitoringSystemID": {
          "type": "string"
        },
        "gasGCV": {
          "type": [
            "number",
            "null"
          ]
        },
        "gasVolume": {
          "type": [
            "number",
            "null"
          ]
        },
        "gasHeatInput": {
          "type": [
            "number",
            "null"
          ]
        }
      },
      "required": [
        "monitoringSystemID",
        "gasGCV",
        "gasVolume",
        "gasHeatInput"
      ]
    },
    "UnitDefaultTest": {
      "title": "UnitDefaultTest",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "fuelCode": {
          "type": "string"
        },
        "noxDefaultRate": {
          "type": [
            "number",
            "null"
          ]
        },
        "operatingConditionCode": {
          "type": [
            "string",
            "null"
          ]
        },
        "groupID": {
          "type": [
            "string",
            "null"
          ]
        },
        "numberOfUnitsInGroup": {
          "type": [
            "number",
            "null"
          ]
        },
        "numberOfTestsForGroup": {
          "type": [
            "number",
            "null"
          ]
        },
        "unitDefaultTestRunData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/UnitDefaultTestRun"
          }
        }
      },
      "required": [
        "fuelCode",
        "noxDefaultRate",
        "operatingConditionCode",
        "groupID",
        "numberOfUnitsInGroup",
        "numberOfTestsForGroup"
      ]
    },
    "UnitDefaultTestRun": {
      "title": "UnitDefaultTestRun",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "operatingLevelForRun": {
          "type": "number"
        },
        "runNumber": {
          "type": "number"
        },
        "beginDate": {
          "type": [
            "string",
            "null"
          ],
          "format": "date"
        },
        "beginHour": {
          "type": [
            "number",
            "null"
          ]
        },
        "beginMinute": {
          "type": [
            "number",
            "null"
          ]
        },
        "endDate": {
          "type": [
            "string",
            "null"
          ],
          "format": "date"
        },
        "endHour": {
          "type": [
            "number",
            "null"
          ]
        },
        "endMinute": {
          "type": [
            "number",
            "null"
          ]
        },
        "responseTime": {
          "type": [
            "number",
            "null"
          ]
        },
        "referenceValue": {
          "type": [
            "number",
            "null"
          ]
        },
        "runUsedIndicator": {
          "type": [
            "number",
            "null"
          ]
        }
      },
      "required": [
        "operatingLevelForRun",
        "runNumber",
        "beginDate",
        "beginHour",
        "beginMinute",
        "endDate",
        "endHour",
        "endMinute",
        "responseTime",
        "referenceValue",
        "runUsedIndicator"
      ]
    },
    "TestQualification": {
      "title": "TestQualification",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "testClaimCode": {
          "type": "string"
        },
        "beginDate": {
          "type": [
            "string",
            "null"
          ],
          "format": "date"
        },
        "endDate": {
          "type": [
            "number",
            "null"
          ]
        },
        "highLoadPercentage": {
          "type": [
            "number",
            "null"
          ]
        },
        "midLoadPercentage": {
          "type": [
            "number",
            "null"
          ]
        },
        "lowLoadPercentage": {
          "type": [
            "number",
            "null"
          ]
        }
      },
      "required": [
        "testClaimCode",
        "beginDate",
        "endDate",
        "highLoadPercentage",
        "midLoadPercentage",
        "lowLoadPercentage"
      ]
    },
    "ProtocolGas": {
      "title": "ProtocolGas",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "gasLevelCode": {
          "type": "string"
        },
        "gasTypeCode": {
          "type": "string"
        },
        "cylinderIdentifier": {
          "type": [
            "string",
            "null"
          ]
        },
        "vendorIdentifier": {
          "type": [
            "string",
            "null"
          ]
        },
        "expirationDate": {
          "type": [
            "string",
            "null"
          ],
          "format": "date"
        }
      },
      "required": [
        "gasLevelCode",
        "gasTypeCode",
        "cylinderIdentifier",
        "vendorIdentifier",
        "expirationDate"
      ]
    },
    "AirEmissionTest": {
      "title": "AirEmissionTest",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "qiLastName": {
          "type": "string"
        },
        "qiFirstName": {
          "type": "string"
        },
        "qiMiddleInitial": {
          "type": [
            "string",
            "null"
          ]
        },
        "aetbName": {
          "type": "string"
        },
        "aetbPhoneNumber": {
          "type": "string"
        },
        "aetbEmail": {
          "type": "string"
        },
        "examDate": {
          "type": "string",
          "format": "date"
        },
        "providerName": {
          "type": "string"
        },
        "providerEmail": {
          "type": "string"
        }
      },
      "required": [
        "qiLastName",
        "qiFirstName",
        "qiMiddleInitial",
        "aetbName",
        "aetbPhoneNumber",
        "aetbEmail",
        "examDate",
        "providerName",
        "providerEmail"
      ]
    },
    "HgSummary": {
      "title": "HgSummary",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "gasLevelCode": {
          "type": "string"
        },
        "meanMeasuredValue": {
          "type": [
            "number",
            "null"
          ]
        },
        "meanReferenceValue": {
          "type": [
            "number",
            "null"
          ]
        },
        "percentError": {
          "type": [
            "number",
            "null"
          ]
        },
        "apsIndicator": {
          "type": [
            "number",
            "null"
          ]
        },
        "hgInjectionData": {
          "type": "array",
          "minItems": 0,
          "items": {
            "$ref": "#/definitions/HgInjection"
          }
        }
      },
      "required": [
        "gasLevelCode",
        "meanMeasuredValue",
        "meanReferenceValue",
        "percentError",
        "apsIndicator"
      ]
    },
    "HgInjection": {
      "title": "HgInjection",
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "injectionDate": {
          "type": "string",
          "format": "date"
        },
        "injectionHour": {
          "type": "number"
        },
        "injectionMinute": {
          "type": "number"
        },
        "measuredValue": {
          "type": [
            "number",
            "null"
          ]
        },
        "referenceValue": {
          "type": [
            "number",
            "null"
          ]
        }
      },
      "required": [
        "injectionDate",
        "injectionHour",
        "injectionMinute",
        "measuredValue",
        "referenceValue"
      ]
    }
  }
}

describe("testing ImportModal component ", () => {
  test("renders the content of ImportModal component with MONITORING_PLAN_STORE_NAME", async() => {
    mock.onGet("https://api.epa.gov/easey/dev/content-mgmt/ecmps/reporting-instructions/monitor-plan.schema.json").reply(200, schema);
    const { container, findByText, getByText } = render(
      <ImportModal
        setDisablePortBtn={jest.fn()}
        complete={false}
        setFileName={jest.fn()}
        fileName={"test"}
        setHasFormatError={jest.fn()}
        setHasInvalidJsonError={jest.fn()}
        importApiErrors={[]}
        importedFileErrorMsgs={[]}
        setImportedFile={jest.fn()}
        workspaceSection={MONITORING_PLAN_STORE_NAME}
      />
    );
    const renderedComponent = container.querySelector(
      ".import-modal-container"
    );

    expect(renderedComponent).not.toBeUndefined();
    const label = await findByText("Upload MP JSON File");
    expect(label).toBeDefined()
    const fileInputLabel = await findByText("Drag file here or");
    expect(fileInputLabel).toBeDefined()
    const fileInputLabel2 = await findByText("choose from folder");
    expect(fileInputLabel2).toBeDefined()
    const fileInput = container.querySelector("#file-input-single");
    expect(fileInput).not.toBeUndefined();
    fireEvent.change(fileInput,{
      dataTransfer: {
        files: [new File(['(⌐□_□)'], 'chucknorris.png', {type: 'image/png'})],
      }
    });
  });

  test("renders the content of ImportModal component with QA_CERT_TEST_SUMMARY_STORE_NAME", async() => {
    const fakeFile = new File(['(⌐□_□)'], {item:'chucknorris.png'}, {type: 'image/png'});
    mock.onGet("https://api.epa.gov/easey/dev/content-mgmt/ecmps/reporting-instructions/qa-certification.schema.json").reply(200, schema);

    const { container, findByText, getByText } = render(
      <ImportModal
        setDisablePortBtn={jest.fn()}
        complete={false}
        setFileName={jest.fn()}
        fileName={"test"}
        setHasFormatError={jest.fn()}
        setHasInvalidJsonError={jest.fn()}
        importApiErrors={[]}
        importedFileErrorMsgs={[]}
        setImportedFile={jest.fn()}
        workspaceSection={QA_CERT_TEST_SUMMARY_STORE_NAME}
      />
    );
    const renderedComponent = container.querySelector(
      ".import-modal-container"
    );

    expect(renderedComponent).not.toBeUndefined();
    const label = await findByText("Upload QA JSON File");
    expect(label).toBeDefined()
    const fileInputLabel = await findByText("Drag file here or");
    expect(fileInputLabel).toBeDefined()
    const fileInputLabel2 = await findByText("choose from folder");
    expect(fileInputLabel2).toBeDefined()
    const fileInput = container.querySelector("#file-input-single");
    expect(fileInput).not.toBeUndefined();
    fireEvent.change(fileInput,{
      dataTransfer: {
        files: [new File(['(⌐□_□)'], 'chucknorris.png', {type: 'image/png'})],
      }
    });
  });

  test("renders the content of ImportModal component with EMISSIONS_STORE_NAME", async() => {
    mock.onGet("https://api.epa.gov/easey/dev/content-mgmt/ecmps/reporting-instructions/emissions.schema.json").reply(200, schema);
    const { container, findByText, getByText } = render(
      <ImportModal
        setDisablePortBtn={jest.fn()}
        complete={false}
        setFileName={jest.fn()}
        fileName={"test"}
        setHasFormatError={jest.fn()}
        setHasInvalidJsonError={jest.fn()}
        importApiErrors={[]}
        importedFileErrorMsgs={[]}
        setImportedFile={jest.fn()}
        workspaceSection={EMISSIONS_STORE_NAME}
      />
    );
    const renderedComponent = container.querySelector(
      ".import-modal-container"
    );
    expect(renderedComponent).not.toBeUndefined();
    const label = await findByText("Upload Emissions JSON File");
    expect(label).toBeDefined()
    const fileInputLabel = await findByText("Drag file here or");
    expect(fileInputLabel).toBeDefined()
    const fileInputLabel2 = await findByText("choose from folder");
    expect(fileInputLabel2).toBeDefined()
    const fileInput = container.querySelector("#file-input-single");
    expect(fileInput).not.toBeUndefined();
    fireEvent.change(fileInput,{
      dataTransfer: {
        files: [new File(['(⌐□_□)'], 'chucknorris.png', {type: 'image/png'})],
      }
    });
    
  });
  test("renders the content of ImportModal component with QA_CERT_TEST_SUMMARY_STORE_NAME with file change", async () => {
    mock
      .onGet(
        "https://api.epa.gov/easey/dev/content-mgmt/ecmps/reporting-instructions/qa-certification.schema.json"
      )
      .reply(200, schema);

    const { container, findByText, getByText } = render(
      <ImportModal
        setDisablePortBtn={jest.fn()}
        complete={false}
        setFileName={jest.fn()}
        fileName={"test"}
        setHasFormatError={jest.fn()}
        setHasInvalidJsonError={jest.fn()}
        importApiErrors={null}
        importedFileErrorMsgs={[]}
        setImportedFile={jest.fn()}
        workspaceSection={QA_CERT_TEST_SUMMARY_STORE_NAME}
      />
    );
    const renderedComponent = container.querySelector(
      ".import-modal-container"
    );

    expect(renderedComponent).not.toBeUndefined();
    const fakeSchema = {
      test: [
        {
          locationId: "113",
        },
      ],
    };

    const fakeSchemaJson = JSON.stringify(fakeSchema);
    const fakeSchemaFile = new File([fakeSchemaJson], "fileSchema.json");

    const fileInput = container.querySelector("#file-input-single");

    const str = JSON.stringify(fakeSchema);
    const blob = new Blob([str]);
    const file = new File([blob], "values.json", {
      type: "application/JSON",
    });

    File.prototype.text = jest.fn().mockResolvedValueOnce(str);
    const files = [file];

    Object.defineProperty(fileInput, "files", { value: [file] });
    fireEvent.input(fileInput);
    expect(fileInput.files.length).toBe(1);
  });
  test("the fetch fails with an error for MONITORING_PLAN", () => {
    mock
      .onGet(
        "https://api.epa.gov/easey/dev/content-mgmt/ecmps/reporting-instructions/monitor-plan.schema.json"
      )
      .reply(() =>
        Promise.reject({
          customAttributes: { httpErrorStatus: 404 },
        })
      );
    let { container } = render(
      <ImportModal
        setDisablePortBtn={jest.fn()}
        complete={true}
        setFileName={jest.fn()}
        fileName={"test"}
        setHasFormatError={jest.fn()}
        setHasInvalidJsonError={jest.fn()}
        importApiErrors={["error"]}
        importedFileErrorMsgs={["error"]}
        setImportedFile={jest.fn()}
        workspaceSection={MONITORING_PLAN_STORE_NAME}
      />
    );
    const renderedComponent1 = container.querySelector(
      ".import-modal-container"
    );
    expect(renderedComponent1).not.toBeUndefined();
  });
  test("the fetch fails with an error for QA_CERT_TEST_SUMMARY", () => {
    mock
      .onGet(
        "https://api.epa.gov/easey/dev/content-mgmt/ecmps/reporting-instructions/qa-certification.schema.json"
      )
      .reply(() =>
        Promise.reject({
          customAttributes: { httpErrorStatus: 404 },
        })
      );
    let { container } = render(
      <ImportModal
        setDisablePortBtn={jest.fn()}
        complete={false}
        setFileName={jest.fn()}
        fileName={"test"}
        setHasFormatError={jest.fn()}
        setHasInvalidJsonError={jest.fn()}
        importApiErrors={["error"]}
        importedFileErrorMsgs={["error"]}
        setImportedFile={jest.fn()}
        workspaceSection={QA_CERT_TEST_SUMMARY_STORE_NAME}
      />
    );
    const renderedComponent = container.querySelector(
      ".import-modal-container"
    );

    expect(renderedComponent).not.toBeUndefined();
  });
  test("the fetch fails with an error for EMISSIONS_STORE_NAME", () => {
    mock
      .onGet(
        "https://api.epa.gov/easey/dev/content-mgmt/ecmps/reporting-instructions/emissions.schema.json"
      )
      .reply(() =>
        Promise.reject({
          customAttributes: { httpErrorStatus: 404 },
        })
      );
    let { container } = render(
      <ImportModal
        setDisablePortBtn={jest.fn()}
        complete={false}
        setFileName={jest.fn()}
        fileName={"test"}
        setHasFormatError={jest.fn()}
        setHasInvalidJsonError={jest.fn()}
        importApiErrors={[]}
        importedFileErrorMsgs={[]}
        setImportedFile={jest.fn()}
        workspaceSection={EMISSIONS_STORE_NAME}
      />
    );
    const renderedComponent2 = container.querySelector(
      ".import-modal-container"
    );
    expect(renderedComponent2).not.toBeUndefined();
  });
});
