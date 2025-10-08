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
import * as regex from '../ids'
import {
  validUuid,
  invalidUuid,
  validSsn,
  invalidSsn,
  ssnCaptureGroupInputs,
  ssnCaptureGroupMatches,
  validEin,
  invalidEin
} from './data/ids'

groupTest(regex.uuidRe, validUuid, invalidUuid, 'uuidRe')
groupTestPartial(regex.uuidReString, validUuid, invalidUuid, 'uuidRe')

groupTest(regex.ssnRe, validSsn, invalidSsn, 'SSN')
groupTestPartial(regex.ssnReString, validSsn, invalidSsn, 'SSN')
testCaptureGroups(regex.ssnRe, ssnCaptureGroupInputs, ssnCaptureGroupMatches, 'SSN capture groups')

groupTest(regex.einRe, validEin, invalidEin, 'EIN')
groupTestPartial(regex.einReString, validEin, invalidEin, 'EIN')
