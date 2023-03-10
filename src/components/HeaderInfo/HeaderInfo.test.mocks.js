// Purpose of this file is to house any large json's that we need to mock or use in our tests.
// That way the actual test file is smaller and easier to look at.
export const storeForEmissionsModule = {
    facilities: [],
    apiCallsInProgress: {
      facilities: false,
      monitoringPlans: true,
      monitoringMethods: false,
      monitoringSystems: false,
      monitoringMatsMethods: false,
      monitoringSystemsComponents: false
    },
    monitoringPlans: [
      [
        7,
        [
          {
            id: 'MDC-0046E2E41EE8478DA4F57A4760C3AF97',
            facId: 3,
            facilityName: 'Gadsden',
            configTypeCode: null,
            lastUpdated: '2009-02-20T15:09:03.000Z',
            updatedStatusFlag: 'Y',
            needsEvalFlag: 'Y',
            checkSessionId: null,
            orisCode: 7,
            name: '1',
            beginReportPeriodId: 9,
            endReportPeriodId: 64,
            active: false,
            pendingStatusCode: 'NOTSUB',
            evalStatusCode: 'EVAL',
            unitStackConfigurations: [],
            locations: [
              {
                id: '66',
                unitRecordId: 11,
                unitId: '1',
                stackPipeRecordId: null,
                stackPipeId: null,
                name: '1',
                type: 'unit',
                active: true,
                activeDate: null,
                retireDate: null,
                nonLoadBasedIndicator: 0
              }
            ],
            userId: 'bvick',
            addDate: '2009-02-20T11:53:07.000Z',
            updateDate: '2015-07-13T13:36:00.000Z',
            submissionId: 880655,
            submissionAvailabilityCode: 'UPDATED',
            lastEvaluatedDate: null
          },
          {
            id: 'MDC-613AD75BF31C4B9EA561E42E38A458DE',
            facId: 3,
            facilityName: 'Gadsden',
            configTypeCode: null,
            lastUpdated: '2022-12-08T18:25:37.734Z',
            updatedStatusFlag: 'Y',
            needsEvalFlag: 'Y',
            checkSessionId: null,
            orisCode: 7,
            name: '1, 2, CS0BAN',
            beginReportPeriodId: 65,
            endReportPeriodId: null,
            active: true,
            pendingStatusCode: 'NOTSUB',
            evalStatusCode: 'EVAL',
            unitStackConfigurations: [
              {
                id: 'CAMD-C3878682C7354D87B9CEBA7F6E6EB3EF',
                unitId: '1',
                stackPipeId: 'CS0BAN',
                unitRecordId: 11,
                stackPipeRecordId: 'MDC-8093078657D641B8961D5450C2E781E8',
                beginDate: '2009-01-01',
                endDate: null,
                userId: 'vishnunavuluri',
                addDate: '2009-02-20T14:57:19.000Z',
                updateDate: '2022-12-08T18:25:35.766Z',
                active: true
              },
              {
                id: 'CAMD-A7162E07A6F7436A855F465490EA9938',
                unitId: '2',
                stackPipeId: 'CS0BAN',
                unitRecordId: 12,
                stackPipeRecordId: 'MDC-8093078657D641B8961D5450C2E781E8',
                beginDate: '2009-01-01',
                endDate: null,
                userId: 'vishnunavuluri',
                addDate: '2009-02-20T14:57:19.000Z',
                updateDate: '2022-12-08T18:25:35.809Z',
                active: true
              }
            ],
            locations: [
              {
                id: '66',
                unitRecordId: 11,
                unitId: '1',
                stackPipeRecordId: null,
                stackPipeId: null,
                name: '1',
                type: 'unit',
                active: true,
                activeDate: null,
                retireDate: null,
                nonLoadBasedIndicator: 0
              },
              {
                id: '67',
                unitRecordId: 12,
                unitId: '2',
                stackPipeRecordId: null,
                stackPipeId: null,
                name: '2',
                type: 'unit',
                active: true,
                activeDate: null,
                retireDate: null,
                nonLoadBasedIndicator: 0
              },
              {
                id: '6417',
                unitRecordId: null,
                unitId: null,
                stackPipeRecordId: 'MDC-8093078657D641B8961D5450C2E781E8',
                stackPipeId: 'CS0BAN',
                name: 'CS0BAN',
                type: 'stack',
                active: true,
                activeDate: '2009-01-01',
                retireDate: null,
                nonLoadBasedIndicator: null
              }
            ],
            userId: 'vishnunavuluri',
            addDate: '2009-02-20T11:53:07.000Z',
            updateDate: '2022-12-08T18:25:37.734Z',
            submissionId: 1395432,
            submissionAvailabilityCode: 'UPDATED',
            lastEvaluatedDate: '2022-04-25T14:13:00.000Z'
          },
          {
            id: 'MDC-F89AB87D577A4DA192AC515A7E06F3A0',
            facId: 3,
            facilityName: 'Gadsden',
            configTypeCode: null,
            lastUpdated: '2009-02-20T15:09:03.000Z',
            updatedStatusFlag: 'Y',
            needsEvalFlag: 'Y',
            checkSessionId: null,
            orisCode: 7,
            name: '2',
            beginReportPeriodId: 9,
            endReportPeriodId: 64,
            active: false,
            pendingStatusCode: 'NOTSUB',
            evalStatusCode: 'EVAL',
            unitStackConfigurations: [],
            locations: [
              {
                id: '67',
                unitRecordId: 12,
                unitId: '2',
                stackPipeRecordId: null,
                stackPipeId: null,
                name: '2',
                type: 'unit',
                active: true,
                activeDate: null,
                retireDate: null,
                nonLoadBasedIndicator: 0
              }
            ],
            userId: 'bvick',
            addDate: '2009-02-20T11:53:07.000Z',
            updateDate: '2015-07-13T13:36:00.000Z',
            submissionId: 880657,
            submissionAvailabilityCode: 'UPDATED',
            lastEvaluatedDate: null
          }
        ]
      ]
    ],
    openedFacilityTabs: {
      monitoringPlans: [],
      qaCertTestSummary: [],
      export: [],
      emissions: [
        {
          orisCode: 7,
          checkout: true,
          name: 'Gadsden (1, 2, CS0BAN) ',
          location: [
            0,
            '66'
          ],
          section: [
            4,
            'Methods'
          ],
          selectedConfig: {
            id: 'MDC-613AD75BF31C4B9EA561E42E38A458DE',
            facId: 3,
            facilityName: 'Gadsden',
            configTypeCode: null,
            lastUpdated: '2022-12-08T18:25:37.734Z',
            updatedStatusFlag: 'Y',
            needsEvalFlag: 'Y',
            checkSessionId: null,
            orisCode: 7,
            name: '1, 2, CS0BAN',
            beginReportPeriodId: 65,
            endReportPeriodId: null,
            active: true,
            pendingStatusCode: 'NOTSUB',
            evalStatusCode: 'EVAL',
            unitStackConfigurations: [
              {
                id: 'CAMD-C3878682C7354D87B9CEBA7F6E6EB3EF',
                unitId: '1',
                stackPipeId: 'CS0BAN',
                unitRecordId: 11,
                stackPipeRecordId: 'MDC-8093078657D641B8961D5450C2E781E8',
                beginDate: '2009-01-01',
                endDate: null,
                userId: 'vishnunavuluri',
                addDate: '2009-02-20T14:57:19.000Z',
                updateDate: '2022-12-08T18:25:35.766Z',
                active: true
              },
              {
                id: 'CAMD-A7162E07A6F7436A855F465490EA9938',
                unitId: '2',
                stackPipeId: 'CS0BAN',
                unitRecordId: 12,
                stackPipeRecordId: 'MDC-8093078657D641B8961D5450C2E781E8',
                beginDate: '2009-01-01',
                endDate: null,
                userId: 'vishnunavuluri',
                addDate: '2009-02-20T14:57:19.000Z',
                updateDate: '2022-12-08T18:25:35.809Z',
                active: true
              }
            ],
            locations: [
              {
                id: '66',
                unitRecordId: 11,
                unitId: '1',
                stackPipeRecordId: null,
                stackPipeId: null,
                name: '1',
                type: 'unit',
                active: true,
                activeDate: null,
                retireDate: null,
                nonLoadBasedIndicator: 0
              },
              {
                id: '67',
                unitRecordId: 12,
                unitId: '2',
                stackPipeRecordId: null,
                stackPipeId: null,
                name: '2',
                type: 'unit',
                active: true,
                activeDate: null,
                retireDate: null,
                nonLoadBasedIndicator: 0
              },
              {
                id: '6417',
                unitRecordId: null,
                unitId: null,
                stackPipeRecordId: 'MDC-8093078657D641B8961D5450C2E781E8',
                stackPipeId: 'CS0BAN',
                name: 'CS0BAN',
                type: 'stack',
                active: true,
                activeDate: '2009-01-01',
                retireDate: null,
                nonLoadBasedIndicator: null
              }
            ],
            userId: 'vishnunavuluri',
            addDate: '2009-02-20T11:53:07.000Z',
            updateDate: '2022-12-08T18:25:37.734Z',
            submissionId: 1395432,
            submissionAvailabilityCode: 'UPDATED',
            lastEvaluatedDate: '2022-04-25T14:13:00.000Z'
          },
          inactive: [
            false,
            false
          ]
        }
      ]
    },
    dropdowns: {
      defaults: [],
      formulas: [],
      loads: [],
      locationAttributesAndRelationships: [],
      methods: [],
      qualifications: [],
      lmeQualifications: [],
      leeQualifications: [],
      pctQualifications: [],
      rectangularDuctWafs: [],
      spans: [],
      systems: [],
      unitFuels: [],
      unitControls: [],
      unitCapacities: [],
      fuelFlows: [],
      systemComponents: [],
      analyzerRanges: [],
      matsMethods: []
    },
    currentTabIndex: 0
  }