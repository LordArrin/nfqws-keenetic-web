import type { ValidateSearchUnknownValueHandler } from './createValidateSearch';

/**
 * Creates a validator function that checks if a search parameter value is an array.
 * Could be used with `createValidateSearch()`.
 * @example
 * ```tsx
 * {
 *   validateSearch: createValidateSearch({
 *     services: validateSearchArray(),
 *   }),
 * }
 * ```
 */
export function validateSearchArray(): ValidateSearchArrayResult {
  return (searchParams, searchParamKey, unknownValueHandler) => {
    const searchParamValue = searchParams[searchParamKey];

    if (typeof searchParamValue === 'undefined') return;
    return Array.isArray(searchParamValue)
      ? searchParamValue
      : (unknownValueHandler?.(
          'validateSearchArray',
          searchParams,
          searchParamKey,
          searchParamValue,
        ) ?? undefined);
  };
}

type ValidateSearchArrayResult = (
  searchParams: Record<string, unknown>,
  searchParamKey: string,
  unknownValueHandler: UnknownValueHandler | void,
) => string[] | undefined;

type UnknownValueHandler =
  ValidateSearchUnknownValueHandler<'validateSearchArray'>;
