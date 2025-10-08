export const validUSDates = [
  '01/01/2024',
  '1/1/2024',
  '1/1/1',
  '1/1/10000',
  '1/1/+2024',
  '1/1/-2024',
]

export const invalidUSDates = [
  '13/01/2024',
  '1/32/2024',
  '2024/01/01',
]

// Capture group test data for usDateRe
// Group numbers: [1:month, 2:day, 3:ceIndicator, 4:year]
export const usDateCaptureGroupInputs = [
  '01/02/2024',
  '1/2/2024',
  '01/02/-2024',
  '12/31/+2024',
]

export const usDateCaptureGroupMatches = [
  ['01', '02', undefined, '2024'],
  ['1', '2', undefined, '2024'],
  ['01', '02', '-', '2024'],
  ['12', '31', '+', '2024'],
]

export const usDateCaptureGroupNumbers = [1, 2, 3, 4]
