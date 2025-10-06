/**
 * MATS HTML Metadata Report Generator
 *
 * Generates 508-compliant HTML string from MATS metadata payload for CROMERR archive submission.
 * Based on Claude.md documentation Section 12.8 Phase 1 implementation strategy.
 *
 * Leverages existing infrastructure:
 * - Code mapping services from retrieve-dropdown-api.js
 * - 508 compliance utilities from ensure-508.js
 * - DefaultTemplate.js structure for HTML generation
 */

import { retrieveDropdowns } from '../additional-functions/retrieve-dropdown-api';
import { formatDate } from './functions';

/**
 * Main function to generate HTML metadata report
 * @param {Object} metadataPayload - MATS metadata from MatsSubmission form
 * @returns {Promise<string>} - 508-compliant HTML string
 */
export const generateMatsHtmlReport = async (metadataPayload) => {
  if (!metadataPayload) {
    throw new Error('Metadata payload is required for HTML report generation');
  }

  try {
    // Get code mappings for translation (as per Claude.md Section 8.4.1)
    const codeMappings = await getCodeMappings();

    // Transform coded values to human-readable format
    const humanReadableData = await transformMetadataToHumanReadable(metadataPayload, codeMappings);

    // Generate 508-compliant HTML structure
    const htmlContent = generateHtmlStructure(humanReadableData);

    return htmlContent;

  } catch (error) {
    console.error('Error generating MATS HTML metadata report:', error);
    throw new Error(`Failed to generate HTML metadata report: ${error.message}`);
  }
};

/**
 * Get code mappings using existing dropdown API infrastructure
 * Based on Claude.md Section 8.4.1 - MATS Code Translation Infrastructure
 */
const getCodeMappings = async () => {
  try {
    // Use existing MATS code mapping services (retrieve-dropdown-api.js:716-762)
    const dropdownFields = [
      'matsReportTypeCodes',
      'matsPollutantCodes',      // Maps 149633→Hg, 149674→Ni, 154310→Se
      'matsTestMethodCodes',
      'matsAveragingGroupCodes'
    ];

    const codeMappings = await retrieveDropdowns(dropdownFields, true); // mats=true

    return codeMappings;

  } catch (error) {
    console.error('Error retrieving code mappings:', error);
    // Return empty mappings to prevent complete failure
    return {
      matsReportTypeCodes: [],
      matsPollutantCodes: [],
      matsTestMethodCodes: [],
      matsAveragingGroupCodes: []
    };
  }
};

/**
 * Transform coded metadata to human-readable format
 * Converts codes like 149633 → Hg, 149674 → Ni, 154310 → Se
 */
const transformMetadataToHumanReadable = async (metadataPayload, codeMappings) => {
  const transformed = { ...metadataPayload };

  // Transform report type code
  if (transformed.reportTypeCode && codeMappings.matsReportTypeCodes) {
    const reportType = codeMappings.matsReportTypeCodes.find(
      item => item.code === transformed.reportTypeCode
    );
    transformed.reportTypeDescription = reportType?.name || transformed.reportTypeCode;
  }

  // Transform pollutant codes (KEY REQUIREMENT: 149633→Hg, etc.)
  if (transformed.pollutantCodes && codeMappings.matsPollutantCodes) {
    transformed.pollutantDescriptions = transformed.pollutantCodes.map(code => {
      const pollutant = codeMappings.matsPollutantCodes.find(
        item => item.code === code
      );
      return {
        code: code,
        description: pollutant?.name || code
      };
    });
  }

  // Transform test method codes
  if (transformed.testMethodCodes && codeMappings.matsTestMethodCodes) {
    transformed.testMethodDescriptions = transformed.testMethodCodes.map(code => {
      const testMethod = codeMappings.matsTestMethodCodes.find(
        item => item.code === code
      );
      return {
        code: code,
        description: testMethod?.name || code
      };
    });
  }

  // Transform averaging group code
  if (transformed.averagingGroupCode && codeMappings.matsAveragingGroupCodes) {
    const averagingGroup = codeMappings.matsAveragingGroupCodes.find(
      item => item.code === transformed.averagingGroupCode
    );
    transformed.averagingGroupDescription = averagingGroup?.name || transformed.averagingGroupCode;
  }

  return transformed;
};

/**
 * Generate 508-compliant HTML structure
 * Based on Claude.md Section 8.5.1 - 508 Compliance Infrastructure
 * Uses DefaultTemplate.js structure as reference
 */
const generateHtmlStructure = (humanReadableData) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MATS Metadata Report</title>
    <style>
        /* Based on USWDS styling for 508 compliance */
        body {
            font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
            line-height: 1.5;
            color: #212121;
            background-color: #ffffff;
            margin: 0;
            padding: 20px;
        }
        .header {
            background-color: #005ea2;
            color: #ffffff;
            padding: 15px;
            margin-bottom: 20px;
        }
        .section {
            margin-bottom: 30px;
            border: 1px solid #dfe1e2;
            padding: 15px;
        }
        .section-title {
            background-color: #005ea2;
            color: #ffffff;
            padding: 8px 15px;
            margin: -15px -15px 15px -15px;
            font-weight: bold;
            font-size: 18px;
        }
        .field-group {
            display: flex;
            margin-bottom: 10px;
        }
        .field-label {
            font-weight: bold;
            min-width: 200px;
            padding-right: 15px;
        }
        .field-value {
            flex: 1;
        }
        .code-list {
            margin-left: 20px;
        }
        .code-item {
            margin-bottom: 5px;
        }
        /* 508 Compliance styles */
        table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 10px;
        }
        th, td {
            border: 1px solid #dfe1e2;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f0f0f0;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="header" role="banner">
        <h1>MATS Metadata Report</h1>
        <p>Human-Readable Version of Metadata.xml</p>
        <p>Generated: ${currentDate}</p>
    </div>
    
    <main role="main">
        ${generateFacilitySection(humanReadableData)}
        ${generateSubmissionSection(humanReadableData)}
        ${generateMetadataSection(humanReadableData)}
        ${generateCodeMappingsSection(humanReadableData)}
    </main>
    
    <footer role="contentinfo" style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #dfe1e2;">
        <p><strong>Note:</strong> This report was generated to provide a human-readable version of the MATS metadata.xml file for EPA CROMERR archive compliance as required by Section 508 accessibility standards.</p>
        <p>Report generated by ECMPS system on ${currentDate}</p>
    </footer>
</body>
</html>`;
};

/**
 * Generate facility information section
 */
const generateFacilitySection = (data) => {
  return `
    <section class="section" aria-labelledby="facility-title">
        <h2 id="facility-title" class="section-title">Facility Information</h2>
        <div class="field-group">
            <span class="field-label">Facility ID:</span>
            <span class="field-value">${data.facilityId || 'N/A'}</span>
        </div>
        <div class="field-group">
            <span class="field-label">Monitor Plan ID:</span>
            <span class="field-value">${data.monitorPlanId || 'N/A'}</span>
        </div>
        <div class="field-group">
            <span class="field-label">Location ID:</span>
            <span class="field-value">${data.locationId || 'N/A'}</span>
        </div>
    </section>`;
};

/**
 * Generate submission information section
 */
const generateSubmissionSection = (data) => {
  return `
    <section class="section" aria-labelledby="submission-title">
        <h2 id="submission-title" class="section-title">Submission Information</h2>
        <div class="field-group">
            <span class="field-label">Original Submission ID:</span>
            <span class="field-value">${data.originalSubmissionId || 'N/A'}</span>
        </div>
        <div class="field-group">
            <span class="field-label">Report Type:</span>
            <span class="field-value">${data.reportTypeDescription || data.reportTypeCode || 'N/A'}</span>
        </div>
        <div class="field-group">
            <span class="field-label">Reporting Period:</span>
            <span class="field-value">${data.year ? `${data.year} Q${data.quarter}` : 'N/A'}</span>
        </div>
    </section>`;
};

/**
 * Generate metadata section with test information
 */
const generateMetadataSection = (data) => {
  return `
    <section class="section" aria-labelledby="metadata-title">
        <h2 id="metadata-title" class="section-title">Test Metadata</h2>
        <div class="field-group">
            <span class="field-label">Test Number:</span>
            <span class="field-value">${data.testNumber || 'N/A'}</span>
        </div>
        <div class="field-group">
            <span class="field-label">Test Date:</span>
            <span class="field-value">${data.testDate ? formatDate(data.testDate, '/') : 'N/A'}</span>
        </div>
        <div class="field-group">
            <span class="field-label">Test Comment:</span>
            <span class="field-value">${data.testComment || 'N/A'}</span>
        </div>
        <div class="field-group">
            <span class="field-label">Averaging Group:</span>
            <span class="field-value">${data.averagingGroupDescription || data.averagingGroupCode || 'N/A'}</span>
        </div>
    </section>`;
};

/**
 * Generate code mappings section showing translated values
 * This is the KEY SECTION that shows human-readable pollutant names
 */
const generateCodeMappingsSection = (data) => {
  let pollutantsHtml = '';
  let testMethodsHtml = '';

  // Generate pollutant codes section (149633→Hg, etc.)
  if (data.pollutantDescriptions && data.pollutantDescriptions.length > 0) {
    pollutantsHtml = `
      <h3>Pollutants</h3>
      <table aria-label="Pollutant codes and descriptions">
        <thead>
          <tr>
            <th scope="col">Code</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          ${data.pollutantDescriptions.map(pollutant => `
            <tr>
              <td>${pollutant.code}</td>
              <td>${pollutant.description}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>`;
  }

  // Generate test methods section
  if (data.testMethodDescriptions && data.testMethodDescriptions.length > 0) {
    testMethodsHtml = `
      <h3>Test Methods</h3>
      <table aria-label="Test method codes and descriptions">
        <thead>
          <tr>
            <th scope="col">Code</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          ${data.testMethodDescriptions.map(method => `
            <tr>
              <td>${method.code}</td>
              <td>${method.description}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>`;
  }

  return `
    <section class="section" aria-labelledby="codes-title">
        <h2 id="codes-title" class="section-title">Code Translations</h2>
        <p>The following codes from the metadata.xml have been translated to human-readable descriptions:</p>
        ${pollutantsHtml}
        ${testMethodsHtml}
    </section>`;
};
