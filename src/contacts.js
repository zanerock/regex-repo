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

const usPhoneReString = '^(\\+?1[._ -]?)?(\\(\\d{3}\\)|\\d{3})[._ -]?\\d{3}[._ -]?\\d{4}$'
// Contact info: Matches US phone numbers with optional country code and area code.
export const usPhoneRE = new RegExp(usPhoneReString)
const zipCodeReString = '^\\d{5}([._ -]?\\d{4})?$'
// Contact info: Matches 5 or 9 digit US zip codes.
export const zipCodeRE = new RegExp(zipCodeReString)
