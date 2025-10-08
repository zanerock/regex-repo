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

import { groupTest, groupTestPartial, testCaptureGroups } from './lib/test-lib'
import * as regex from '../date-times'
import {
  valid8601Dates,
  invalid8601Dates,
  valid8601DatesOnly,
  invalid8601DatesOnly,
  valid8601DateTimes,
  invalid8601DateTimes,
  iso8601DayCaptureGroupInputs,
  iso8601DayCaptureGroupMatches,
  iso8601DayCaptureGroupNumbers,
  iso8601TimeCaptureGroupInputs,
  iso8601TimeCaptureGroupMatches,
  iso8601TimeCaptureGroupNumbers,
  iso8601DateCaptureGroupInputs,
  iso8601DateCaptureGroupMatches,
  iso8601DateCaptureGroupNumbers
} from './data/iso-8601-date-times'
import {
  validIntlDates,
  invalidIntlDates,
  intlDateCaptureGroupInputs,
  intlDateCaptureGroupMatches,
  intlDateCaptureGroupNumbers
} from './data/intl-dates'
import {
  validRFC2822Dates,
  invalidRFC2822Dates,
  rfc2822DayCaptureGroupInputs,
  rfc2822DayCaptureGroupMatches,
  rfc2822DayCaptureGroupNumbers,
  timezoneCaptureGroupInputs,
  timezoneCaptureGroupMatches,
  timezoneCaptureGroupNumbers,
  rfc2822TimeCaptureGroupInputs,
  rfc2822TimeCaptureGroupMatches,
  rfc2822TimeCaptureGroupNumbers,
  rfc2822DateCaptureGroupInputs,
  rfc2822DateCaptureGroupMatches,
  rfc2822DateCaptureGroupNumbers
} from './data/rfc-2822-date-times'
import {
  validMilTimes,
  invalidMilTimes,
  validTimes,
  invalidTimes,
  valid24HrTimes,
  invalid24HrTimes,
  militaryTimeCaptureGroupInputs,
  militaryTimeCaptureGroupMatches,
  militaryTimeCaptureGroupNumbers,
  timeCaptureGroupInputs,
  timeCaptureGroupMatches,
  timeCaptureGroupNumbers,
  twentyFourHourTimeCaptureGroupInputs,
  twentyFourHourTimeCaptureGroupMatches,
  twentyFourHourTimeCaptureGroupNumbers
} from './data/times'
import {
  validUSDates,
  invalidUSDates,
  usDateCaptureGroupInputs,
  usDateCaptureGroupMatches,
  usDateCaptureGroupNumbers
} from './data/us-dates'

// Test iso8601DayRe
groupTest(regex.iso8601DayRe, valid8601DatesOnly, invalid8601DatesOnly, 'ISO 8601 day')
testCaptureGroups(regex.iso8601DayRe, iso8601DayCaptureGroupInputs, iso8601DayCaptureGroupMatches, iso8601DayCaptureGroupNumbers, 'ISO 8601 day capture groups')

// Test iso8601TimeRe
testCaptureGroups(regex.iso8601TimeRe, iso8601TimeCaptureGroupInputs, iso8601TimeCaptureGroupMatches, iso8601TimeCaptureGroupNumbers, 'ISO 8601 time capture groups')

// Test iso8601DateRe
groupTest(regex.iso8601DateRe, valid8601Dates, invalid8601Dates, 'ISO 8601 dates')
groupTestPartial("'" + regex.iso8601DateReString + "'", valid8601Dates, invalid8601Dates, 'ISO 8601 dates', "Hi '", "' there")
testCaptureGroups(regex.iso8601DateRe, iso8601DateCaptureGroupInputs, iso8601DateCaptureGroupMatches, iso8601DateCaptureGroupNumbers, 'ISO 8601 date capture groups')

// Test iso8601DateTimeRe
groupTest(regex.iso8601DateTimeRe, valid8601DateTimes, invalid8601DateTimes, 'ISO 8601 date with time')
groupTestPartial(regex.iso8601DateTimeReString, valid8601DateTimes, invalid8601DateTimes, 'ISO 8601 date with time')

// Test rfc2822DayRe
testCaptureGroups(regex.rfc2822DayRe, rfc2822DayCaptureGroupInputs, rfc2822DayCaptureGroupMatches, rfc2822DayCaptureGroupNumbers, 'RFC 2822 day capture groups')

// Test timezoneRe
testCaptureGroups(regex.timezoneRe, timezoneCaptureGroupInputs, timezoneCaptureGroupMatches, timezoneCaptureGroupNumbers, 'timezone capture groups')

// Test rfc2822TimeRe
testCaptureGroups(regex.rfc2822TimeRe, rfc2822TimeCaptureGroupInputs, rfc2822TimeCaptureGroupMatches, rfc2822TimeCaptureGroupNumbers, 'RFC 2822 time capture groups')

// Test rfc2822DateRe
groupTest(regex.rfc2822DateRe, validRFC2822Dates, invalidRFC2822Dates, 'RFC 2822 dates')
groupTestPartial("'" + regex.rfc2822DateReString + "'", validRFC2822Dates, invalidRFC2822Dates, 'RFC 2822 dates', "Hi '", "' there")
testCaptureGroups(regex.rfc2822DateRe, rfc2822DateCaptureGroupInputs, rfc2822DateCaptureGroupMatches, rfc2822DateCaptureGroupNumbers, 'RFC 2822 date capture groups')

// Test usDateRe
groupTest(regex.usDateRe, validUSDates, invalidUSDates, 'US date')
groupTestPartial(regex.usDateReString, validUSDates, invalidUSDates, 'US date')
testCaptureGroups(regex.usDateRe, usDateCaptureGroupInputs, usDateCaptureGroupMatches, usDateCaptureGroupNumbers, 'US date capture groups')

// Test intlDateRe
groupTest(regex.intlDateRe, validIntlDates, invalidIntlDates, 'intl date')
groupTestPartial(regex.intlDateReString, validIntlDates, invalidIntlDates, 'intl date')
testCaptureGroups(regex.intlDateRe, intlDateCaptureGroupInputs, intlDateCaptureGroupMatches, intlDateCaptureGroupNumbers, 'intl date capture groups')

// Test militaryTimeRe
groupTest(regex.militaryTimeRe, validMilTimes, invalidMilTimes, 'military time')
groupTestPartial(regex.militaryTimeReString, validMilTimes, invalidMilTimes, 'military time')
testCaptureGroups(regex.militaryTimeRe, militaryTimeCaptureGroupInputs, militaryTimeCaptureGroupMatches, militaryTimeCaptureGroupNumbers, 'military time capture groups')

// Test timeRe
groupTest(regex.timeRe, validTimes, invalidTimes, 'time (12 hr)')
groupTestPartial(regex.timeReString, validTimes, invalidTimes, 'time (12 hr)')
testCaptureGroups(regex.timeRe, timeCaptureGroupInputs, timeCaptureGroupMatches, timeCaptureGroupNumbers, 'time (12 hr) capture groups')

// Test twentyFourHourTimeRe
groupTest(regex.twentyFourHourTimeRe, valid24HrTimes, invalid24HrTimes, '24-hour time')
groupTestPartial(regex.twentyFourHourTimeReString, valid24HrTimes, invalid24HrTimes, '24-hour time')
testCaptureGroups(regex.twentyFourHourTimeRe, twentyFourHourTimeCaptureGroupInputs, twentyFourHourTimeCaptureGroupMatches, twentyFourHourTimeCaptureGroupNumbers, '24-hour time capture groups')
