/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ValidateSearchUnknownValueHandler } from './createValidateSearch';

/**
 * Creates a validator function that checks if a search parameter value is
 * one of the values in the provided enumeration.
 * Could be used with `createValidateSearch()`.
 *
 * @param enumeration - An object or array representing the enumeration.
 * @param defaultValue - The default value to return if the search parameter value is not in the enumeration.
 *
 * @example
 * ```tsx
 * {
 *   validateSearch: createValidateSearch({
 *     optionalSource: validateSearchEnumerationIn(SourceEnum),
 *     requiredSource: validateSearchEnumerationIn(
 *       { main_banner: 'banner', secondary_banner: 'sub-banner', 'sub-banner' },
 *     ),
 *     optionalType: validateSearchEnumerationIn(['type1', 'type2']),
 *     requiredType: validateSearchEnumerationIn(['type1', 'type2'], 'type1'),
 *   }),
 * }
 * ```
 */
export function validateSearchEnumerationIn<
  const TEnum extends Enumeration,
  const TDefaultValue extends ValidatorDefaultValue<TEnum>,
>(
  enumeration: TEnum,
  defaultValue: TDefaultValue,
): ValidateSearchEnumerationInValidator<TEnum, TDefaultValue>;
export function validateSearchEnumerationIn<const TEnum extends Enumeration>(
  enumeration: TEnum,
): ValidateSearchEnumerationInValidator<TEnum>;
export function validateSearchEnumerationIn<
  const TEnum extends Enumeration,
  const TDefaultValue extends ValidatorDefaultValue<TEnum> = undefined,
>(
  enumeration: TEnum,
  defaultValue: TDefaultValue | undefined = undefined,
): ValidateSearchEnumerationInValidator<TEnum, TDefaultValue> {
  return (searchParams, searchParamKey, unknownValueHandler) => {
    const searchParamValue = searchParams[searchParamKey];
    if (typeof searchParamValue === 'undefined') {
      return defaultValue;
    }
    return Object.values(enumeration).includes(searchParamValue)
      ? searchParamValue
      : (unknownValueHandler?.(
          'validateSearchEnumerationIn',
          searchParams,
          searchParamKey,
          searchParamValue,
          defaultValue,
          enumeration,
        ) ?? defaultValue);
  };
}

type ValidatorDefaultValue<TEnum extends Enumeration> =
  | ExtractEnumerationValues<TEnum>
  | undefined;

type ValidateSearchEnumerationInValidator<
  TEnum extends Enumeration,
  TDefaultValue extends ValidatorDefaultValue<TEnum> = undefined,
> = (
  searchParams: Record<string, any>,
  searchParamKey: string,
  unknownValueHandler: UnknownValueHandler | void,
) => ResolvedValidateSearchEnumerationInResult<TEnum, TDefaultValue>;

type ResolvedValidateSearchEnumerationInResult<
  TEnum extends Enumeration,
  TDefaultValue extends ValidatorDefaultValue<TEnum>,
> = TDefaultValue extends undefined
  ? ExtractEnumerationValues<TEnum> | undefined
  : ExtractEnumerationValues<TEnum>;

type UnknownValueHandler =
  ValidateSearchUnknownValueHandler<'validateSearchEnumerationIn'>;

type Enumeration = ReadonlyArray<any> | Readonly<Record<string, any>>;

type ExtractEnumerationValues<TEnum> =
  TEnum extends ReadonlyArray<infer T>
    ? T
    : TEnum extends Record<string, infer T>
      ? T
      : never;
