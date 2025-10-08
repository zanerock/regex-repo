/*
Copyright 2023 Liquid Labs LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// Pulled some test data from https://www.myintervals.com/blog/2009/05/20/iso-8601-date-validation-that-doesnt-suck/ (2024-07-15)
export const valid8601DatesOnly = [
  '2009', // year only
  '-0010',
  '+0010',
  '2009-05', // month only
  '200905',
  '2009-05-19', // full date
  '20090519',
  '2009123', // ordinal/Julian date
  '2009-123',
  '2009W01',
  '2009W011',
  '2009-W01',
  '2009-W01-1',
  '2009W011',
]

export const invalid8601DatesOnly = [
  '2009-0101', // inconsistent separators
  '200901-01',
  '2009-W0101',
  '2009W01-01',
  '10', // 2 digit years
  '10-03',
  '200913', // trivially impossible dates
  '200920',
  '20090132',
]

const valid8601TimesOnly = [
  '24:00:00',
  '240000',
  '24:00:00Z',
  '01',
  '01.5',
  '01,5',
  '01:01',
  '01:01.5',
  '01:01,5',
  '0101',
  '00:23:23',
  '23:23:23',
  '23:23:23.5',
  '23:23:23,5',
  '232323',
  '232360', // leap second
  '232360.5',
  '23:23:23.23',
  '23:23:23,23',
  '23Z',
  '23:23Z',
  '23:23:23Z',
  '23:23:23.123Z',
  '23:23:23+05',
  '23:23:23+0500',
  '23:23:23+05:00',
  '232323+0500',
  '232323+05:00',
  '23:23:23-05',
  '23:23:23-0500',
  '23:23:23-05:00',
  '232323-0500',
  '232323-05:00',
]

const invalid8601TimesOnly = [
  '24:0000', // inconsistent separators
  '2400:00',
  '23:2323',
  '2323:23',
  '25:00:00', // impossible times
  '01:60:00',
  '01:01:61',
  '01:02:01+24', // impossible time zones
  '01:02:01+2400',
  '01:02:01+24:00',
  '01:02:01-24',
  '01:02:01-2400',
  '01:02:01-24:00',
  '01:02:01+00',
  '01:02:01+0000',
  '01:02:01+00:00',
  '01:02:01-00',
  '01:02:01-0000',
  '01:02:01-00:00',
]

export const valid8601DateTimes = [
  '2009-12T12:34',
  '2009-12T12:34+01',
  ...valid8601TimesOnly.map((t) => '2009-12-12T' + t),
]

const invalid8601DateAndTimes = invalid8601TimesOnly.map((t) => '2009-12-12T' + t)

export const invalid8601DateTimes = [
  '2009-12 12:34',
  '2009-12 12:34+01',
  ...invalid8601DateAndTimes,
  ...valid8601DatesOnly,
  ...valid8601TimesOnly,
]

export const valid8601Dates = [...valid8601DatesOnly, ...valid8601DateTimes]

export const invalid8601Dates = [...invalid8601DatesOnly, ...invalid8601DateAndTimes]

// Capture group test data for iso8601DayRe
// Group numbers: [1:year, 3:month, 4:day, 5:week, 6:dayOfWeek, 7:ordinal]
export const iso8601DayCaptureGroupInputs = [
  '2024-01-15',
  '2024-01',
  '2024',
  '2024-W05-5',
  '2024W055',
  '2024-W05',
  '2024W05',
  '2024-027',
]

export const iso8601DayCaptureGroupMatches = [
  ['2024', '01', '15', undefined, undefined, undefined],
  ['2024', '01', undefined, undefined, undefined, undefined],
  ['2024', undefined, undefined, undefined, undefined, undefined],
  ['2024', undefined, undefined, '05', '5', undefined],
  ['2024', undefined, undefined, '05', '5', undefined],
  ['2024', undefined, undefined, '05', undefined, undefined],
  ['2024', undefined, undefined, '05', undefined, undefined],
  ['2024', undefined, undefined, undefined, undefined, '027'],
]

export const iso8601DayCaptureGroupNumbers = [1, 3, 4, 5, 6, 7]

// Capture group test data for iso8601TimeRe
// Group numbers: [1:endOfDay, 3:hour, 4:hourFrac, 6:minutes, 7:minFrac, 8:seconds, 9:secFrac, 10:timezone]
export const iso8601TimeCaptureGroupInputs = [
  '12:30:40.50+1000',
  '24:00:00',
  '12.168',
  '12:30.168',
  '12:30:40Z',
]

export const iso8601TimeCaptureGroupMatches = [
  [undefined, '12', undefined, '30', undefined, '40', '50', '+1000'],
  ['24:00:00', undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, '12', '168', undefined, undefined, undefined, undefined, undefined],
  [undefined, '12', undefined, '30', '168', undefined, undefined, undefined],
  [undefined, '12', undefined, '30', undefined, '40', undefined, 'Z'],
]

export const iso8601TimeCaptureGroupNumbers = [1, 3, 4, 6, 7, 8, 9, 10]

// Capture group test data for iso8601DateRe
// Group numbers: [1:year, 3:month, 4:day, 5:week, 6:dayOfWeek, 7:ordinal, 8:endOfDay, 10:hour, 11:hourFrac, 13:minutes, 14:minFrac, 15:seconds, 16:secFrac, 17:timezone]
export const iso8601DateCaptureGroupInputs = [
  '2024-01-15T12:30:40.50+1000',
  '2024-W05-5T12:30:40.50+1000',
  '2024-027T12:30:40.50+1000',
  '2024-027T24:00:00+1000',
  '2024-027T12.168+1000',
  '2024-027T12:30.168+1000',
]

export const iso8601DateCaptureGroupMatches = [
  ['2024', '01', '15', undefined, undefined, undefined, undefined, '12', undefined, '30', undefined, '40', '50', '+1000'],
  ['2024', undefined, undefined, '05', '5', undefined, undefined, '12', undefined, '30', undefined, '40', '50', '+1000'],
  ['2024', undefined, undefined, undefined, undefined, '027', undefined, '12', undefined, '30', undefined, '40', '50', '+1000'],
  ['2024', undefined, undefined, undefined, undefined, '027', '24:00:00', undefined, undefined, undefined, undefined, undefined, undefined, '+1000'],
  ['2024', undefined, undefined, undefined, undefined, '027', undefined, '12', '168', undefined, undefined, undefined, undefined, '+1000'],
  ['2024', undefined, undefined, undefined, undefined, '027', undefined, '12', undefined, '30', '168', undefined, undefined, '+1000'],
]

export const iso8601DateCaptureGroupNumbers = [1, 3, 4, 5, 6, 7, 8, 10, 11, 13, 14, 15, 16, 17]
