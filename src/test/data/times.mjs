export const validMilTimes = [
  '2400',
  '0000',
  '0130',
]

export const invalidMilTimes = [
  '2500',
  '2060',
  '300',
]

export const validTimes = [
  '12:00 AM',
  '12:00:39 PM',
  '2:00:39.383 PM',
]

export const invalidTimes = [
  '13:00 AM',
  '5:60 PM',
  '7:00',
]

export const valid24HrTimes = [
  '24:00',
  '24:00:00',
  '12:00',
  '12:00:32.928',
  '01:00:32', // allow leading zero
  '00:00:00',
  '1:00:32',
  '0:00:00', // or not
]

export const invalid24HrTimes = [
  '24:01',
  '25:00',
  '12:60',
  '12:00:60',
  '12:00:10.',
]

// Capture group test data for militaryTimeRe
// Group numbers: [1:endOfDay, 2:hour, 3:minutes]
export const militaryTimeCaptureGroupInputs = [
  '2400',
  '2230',
  '0000',
  '1245',
]

export const militaryTimeCaptureGroupMatches = [
  ['2400', undefined, undefined],
  [undefined, '22', '30'],
  [undefined, '00', '00'],
  [undefined, '12', '45'],
]

export const militaryTimeCaptureGroupNumbers = [1, 2, 3]

// Capture group test data for timeRe
// Group numbers: [1:hour, 2:minutes, 3:seconds, 4:secFrac, 5:amPM]
export const timeCaptureGroupInputs = [
  '12:00 AM',
  '8:30:12.93 PM',
  '11:59:59 PM',
  '1:00 AM',
]

export const timeCaptureGroupMatches = [
  ['12', '00', undefined, undefined, 'AM'],
  ['8', '30', '12', '93', 'PM'],
  ['11', '59', '59', undefined, 'PM'],
  ['1', '00', undefined, undefined, 'AM'],
]

export const timeCaptureGroupNumbers = [1, 2, 3, 4, 5]

// Capture group test data for twentyFourHourTimeRe
// Group numbers: [1:endOfDay, 2:hour, 3:minutes, 4:seconds, 5:secFrac]
export const twentyFourHourTimeCaptureGroupInputs = [
  '12:00',
  '8:30:12.93',
  '24:00',
  '00:00:00',
  '23:59:59.999',
]

export const twentyFourHourTimeCaptureGroupMatches = [
  [undefined, '12', '00', undefined, undefined],
  [undefined, '8', '30', '12', '93'],
  ['24:00', undefined, undefined, undefined, undefined],
  [undefined, '00', '00', '00', undefined],
  [undefined, '23', '59', '59', '999'],
]

export const twentyFourHourTimeCaptureGroupNumbers = [1, 2, 3, 4, 5]
