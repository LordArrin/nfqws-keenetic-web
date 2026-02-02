import type { ValidateSearchUnknownValueHandler } from './createValidateSearch';

/**
 * Creates a validator function that checks if a search parameter value is a boolean.
 * Could be used with `createValidateSearch()`.
 * @example
 * ```tsx
 * {
 *   validateSearch: createValidateSearch({
 *     optionalBoolean: validateSearchIsBoolean(),
 *   }),
 * }
 * ```
 */
export function validateSearchIsBoolean(): ValidateSearchIsBooleanResult {
  return (searchParams, searchParamKey, unknownValueHandler) => {
    const searchParamValue = searchParams[searchParamKey];

    if (typeof searchParamValue === 'undefined') {
      return;
    }
    if (searchParamValue === 0 || searchParamValue === false) {
      return;
    }
    if (searchParamValue === 1 || searchParamValue === true) {
      return true;
    }
    return (
      unknownValueHandler?.(
        'validateSearchIsBoolean',
        searchParams,
        searchParamKey,
        searchParamValue,
      ) ?? undefined
    );
  };
}

type ValidateSearchIsBooleanResult = (
  searchParams: Record<string, unknown>,
  searchParamKey: string,
  unknownValueHandler: UnknownValueHandler | void,
) => boolean | undefined;

type UnknownValueHandler =
  ValidateSearchUnknownValueHandler<'validateSearchIsBoolean'>;
