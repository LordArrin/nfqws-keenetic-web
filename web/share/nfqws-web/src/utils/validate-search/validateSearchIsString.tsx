import type { ValidateSearchUnknownValueHandler } from './createValidateSearch';

/**
 * Creates a validator function that checks if a search parameter value is a string.
 * Could be used with `createValidateSearch()`.
 * @example
 * ```tsx
 * {
 *   validateSearch: createValidateSearch({
 *     optionalName: validateSearchIsString(),
 *   }),
 * }
 * ```
 */
export function validateSearchIsString(): ValidateSearchIsStringResult {
  return (searchParams, searchParamKey, unknownValueHandler) => {
    const searchParamValue = searchParams[searchParamKey];

    if (typeof searchParamValue === 'undefined') return;
    return typeof searchParamValue === 'string'
      ? searchParamValue
      : (unknownValueHandler?.(
          'validateSearchIsString',
          searchParams,
          searchParamKey,
          searchParamValue,
        ) ?? undefined);
  };
}

type ValidateSearchIsStringResult = (
  searchParams: Record<string, unknown>,
  searchParamKey: string,
  unknownValueHandler: UnknownValueHandler | void,
) => string | undefined;

type UnknownValueHandler =
  ValidateSearchUnknownValueHandler<'validateSearchIsString'>;
