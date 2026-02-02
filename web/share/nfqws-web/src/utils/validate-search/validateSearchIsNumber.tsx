import type { ValidateSearchUnknownValueHandler } from './createValidateSearch';

/**
 * Creates a validator function that checks if a search parameter value is a number.
 * Could be used with `createValidateSearch()`.
 * @example
 * ```tsx
 * {
 *   validateSearch: createValidateSearch({
 *     optionalAmount: validateSearchIsNumber(),
 *   }),
 * }
 * ```
 */
export function validateSearchIsNumber(): ValidateSearchIsNumberResult {
  return (searchParams, searchParamKey, unknownValueHandler) => {
    const searchParamValue = searchParams[searchParamKey];

    if (typeof searchParamValue === 'undefined') return;
    return typeof searchParamValue === 'number'
      ? searchParamValue
      : (unknownValueHandler?.(
          'validateSearchIsNumber',
          searchParams,
          searchParamKey,
          searchParamValue,
        ) ?? undefined);
  };
}

type ValidateSearchIsNumberResult = (
  searchParams: Record<string, unknown>,
  searchParamKey: string,
  unknownValueHandler: UnknownValueHandler | void,
) => number | undefined;

type UnknownValueHandler =
  ValidateSearchUnknownValueHandler<'validateSearchIsNumber'>;
