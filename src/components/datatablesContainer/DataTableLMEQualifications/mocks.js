export const getMockLMEQualifications = () => {
  const data = [
    {
      qualificationDataYear: 2015,
      operatingHours: 105,
      so2Tons: 0.9,
      noxTons: 6.4,
      id: "mock1",
      qualificationId: "NJCHQLAPA3-82CD1A0A9D2A48BFB5203F82D390183E",
      userId: "abcde",
      addDate: "2015-07-20",
      updateDate: "2015-07-20"
    },
    {
      qualificationDataYear: 2015,
      operatingHours: 105,
      so2Tons: 0.9,
      noxTons: 6.4,
      id: "mock2",
      qualificationId: "NJCHQLAPA3-82CD1A0A9D2A48BFB5203F82D390183E",
      userId: "abcde",
      addDate: "2015-07-20",
      updateDate: "2015-07-20"
    }
  ]
  return [...data]
}