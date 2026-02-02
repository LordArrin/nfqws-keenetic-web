import type { ValidateSearchUnknownValueHandler } from './createValidateSearch';

/**
 * Creates a validator function that checks if a search parameter value is an array
 * and validates each element against the provided enumeration values.
 * Could be used with `createValidateSearch()`.
 * @example
 * ```tsx
 * {
 *   validateSearch: createValidateSearch({
 *     networks: validateSearchEnumeration(NetworkEnum),
 *     categories: validateSearchEnumeration(['category1', 'category2']),
 *   }),
 * }
 * ```
 */
export function validateSearchEnumeration<T extends string | number>(
  enumeration: ReadonlyArray<T> | Record<string, T>,
): ValidateSearchEnumerationResult<T> {
  const availableValues = Array.isArray(enumeration)
    ? enumeration
    : Object.values(enumeration);

  return (searchParams, searchParamKey, unknownValueHandler) => {
    const searchParamValue = searchParams[searchParamKey];
    if (!Array.isArray(searchParamValue)) return undefined;

    return searchParamValue.reduce<T[]>((acc, value: unknown) => {
      const validatedValue = availableValues.includes(value as T)
        ? value
        : unknownValueHandler?.(
            'validateSearchEnumeration',
            searchParams,
            searchParamKey,
            value,
            undefined,
            availableValues,
          );

      if (validatedValue !== undefined) acc.push(validatedValue as T);

      return acc;
    }, []);
  };
}

type ValidateSearchEnumerationResult<T> = (
  searchParams: Record<string, unknown>,
  searchParamKey: string,
  unknownValueHandler: UnknownValueHandler | void,
) => T[] | undefined;

type UnknownValueHandler =
  ValidateSearchUnknownValueHandler<'validateSearchEnumeration'>;
