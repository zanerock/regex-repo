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
import { lockdownRe } from './lib/lockdown-re'
import { ipAddressReString } from './network'

/**
 * An RE ready string that matches (most) valid S3 Transfer Acceleration compatible bucket names. When using this
 * partial, you should verify the results do not match `invalidS3TaBucketNameReString`. Because of the way the RE
 * is constructed, this is one case where the partial string is not the same as that used to construct the
 * `awsS3TaBucketNameRe` RE.
 * @category AWS
 */
export const awsS3TaBucketNameReString = '[a-z0-9][a-z0-9-]{1,61}[a-z0-9]'

/**
 * An RE ready string that matches excluded S3 Transfer Acceleration compatible bucket names that would be matched
 * by `awsS3TaBucketNameReString`. Because of the way the RE is constructed, this is one case where the partial string
 * is not the same as that used to construct the `invalidS3TaBucketNameRe` RE.
 * @category AWS
 */
export const invalidS3TaBucketNameReString = `(?:^|\\s)${ipAddressReString}|(?:^|\\s)xn--|(?:^|\\s)sthree-|`
    + '.+-s3alias(?:\\s|$)|.+--ol-s3(?:\\s|$)'

const invalidS3PartialsReStringInternal = `(?!^${ipAddressReString}|^xn--|^sthree-|.+-s3alias$|.+--ol-s3$)`

const awsS3TaBucketNameReStringInternal = invalidS3PartialsReStringInternal + `^${awsS3TaBucketNameReString}$`

/**
 * Matches (most) S3 Transfer Acceleration compatible S3 bucket name. Note `awsS3TaBucketNameReString` cannot be used
 * for partial matches.
 * @category AWS
 */
export const awsS3TaBucketNameRe = new RegExp(awsS3TaBucketNameReStringInternal)

/**
 * An RE ready string that matches (most) valid S3 bucket names. When using this partial, you should verify the results
 * do not match `invalidS3PartialsReString`. Because of the way the RE is constructed, this is one case where the
 * partial string is not the same as that used to construct the `awsS3BucketNameRe` RE.
 * @category AWS
 */
export const awsS3BucketNameReString = '[a-z0-9](?:\\.?[a-z0-9-]+)+[a-z0-9]'

export const awsS3BucketNameReStringInternal = invalidS3PartialsReStringInternal + `^${awsS3BucketNameReString}$`

/**
 * Matches (most) valid S3 bucket name. Note `awsS3BucketNameReString` cannot be used for partial matches. Does not
 * enforce 63 character limit. Due to checking for invalid S3 bucket names, `awsS3BucketNameReString` embeds '^' and
 * '$' and so cannot be used for partial matches.
 * @category AWS
 */
export const awsS3BucketNameRe = lockdownRe(awsS3BucketNameReStringInternal)
