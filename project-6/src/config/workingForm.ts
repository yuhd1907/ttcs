const workingFormList = [
  {
    label: "Tại văn phòng",
    value: "office",
  },
  {
    label: "Linh hoạt",
    value: "flexible",
  },
  {
    label: "Làm từ xa",
    value: "remote",
  },
];

export const workingFormMap = new Map(
  workingFormList.map((item) => [item.value, item.label]),
);
