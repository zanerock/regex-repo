export const validIntlDates = [
  '2024/01/01',
  '2024/1/1',
  '1/1/1',
  '10000/1/1',
  '+2024/1/1',
  '-2024/1/1',
]

export const invalidIntlDates = [
  '2024/13/01',
  '2024/01/32',
  '01/01/2024',
]

// Capture group test data for intlDateRe
// Group numbers: [1:ceIndicator, 2:year, 3:month, 4:day]
export const intlDateCaptureGroupInputs = [
  '2024/01/02',
  '2024/1/2',
  '-2024/01/02',
  '+2024/12/31',
]

export const intlDateCaptureGroupMatches = [
  [undefined, '2024', '01', '02'],
  [undefined, '2024', '1', '2'],
  ['-', '2024', '01', '02'],
  ['+', '2024', '12', '31'],
]

export const intlDateCaptureGroupNumbers = [1, 2, 3, 4]
