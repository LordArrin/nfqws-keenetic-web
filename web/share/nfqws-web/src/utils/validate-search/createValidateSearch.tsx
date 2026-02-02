/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 *
 * @example
 * ```tsx
 * {
 *   validateSearch: createValidateSearch({
 *     intent: 'confirming',
 *     sources: validateSearchEnumerationIn(SourceEnum),
 *     links: validateSearchArrayIn(['first', 'second']),
 *   }),
 * }
 * ```
 */
export function createValidateSearch<
  const TValidators extends CreateValidateSearchValidators,
>(
  validators: TValidators,
  handleUnknownValue: ValidateSearchUnknownValueHandler<ValidatorName> = skipUnknownSearchParams,
) {
  return function validateSearchCallback(
    searchParams: Record<string, unknown>,
  ): ValidateSearchResult<TValidators> {
    return Object.fromEntries(
      Object.entries(validators).map(
        ([searchParamKey, validatorOrPredefinedValue]) =>
          typeof validatorOrPredefinedValue === 'function'
            ? [
                searchParamKey,
                validatorOrPredefinedValue(
                  searchParams,
                  searchParamKey,
                  handleUnknownValue,
                ),
              ]
            : [
                searchParamKey,
                validateSearchValue(
                  searchParams,
                  searchParamKey,
                  validatorOrPredefinedValue,
                  handleUnknownValue,
                ),
              ],
      ),
    ) as ValidateSearchResult<TValidators>;
  };
}

function validateSearchValue<TTargetValue>(
  searchParams: Record<string, unknown>,
  searchParamKey: string,
  targetValue: TTargetValue,
  unknownValueHandler?: UnknownMandatoryValueHandler,
) {
  const searchParamValue = searchParams[searchParamKey];

  if (typeof searchParamValue === 'undefined') return;

  if (typeof searchParamValue !== typeof targetValue) {
    return unknownValueHandler?.(
      'validateSearchValue',
      searchParams,
      searchParamKey,
      searchParamValue,
      targetValue,
    );
  }

  return searchParamValue;
}

export function skipUnknownSearchParams<
  TValue,
  TDefaultValue extends TValue | undefined,
>(
  _validatorName: ValidatorName,
  _searchParams: Record<string, unknown>,
  _searchParamKey: string,
  _value: unknown,
  defaultValue: TDefaultValue,
): TValue | TDefaultValue {
  return defaultValue;
}

type CreateValidateSearchValidators = {
  [key: string]:
    | ((
        searchParams: Record<string, any>,
        searchParamKey: string,
        unknownValueHandler?: ValidateSearchUnknownValueHandler<ValidatorName>,
      ) => any)
    | string
    | number
    | boolean
    | object;
};

type ValidateSearchResult<TValidators extends CreateValidateSearchValidators> =
  OptionalIfUndefined<{
    [K in keyof TValidators]: TValidators[K] extends (
      searchParams: Record<string, any>,
      searchParamKey: string,
    ) => infer TValidatorResult
      ? TValidatorResult
      : TValidators[K] extends string | number | boolean | object
        ? TValidators[K] | undefined
        : never;
  }>;

type UnknownMandatoryValueHandler = <
  TValue,
  TDefaultValue extends TValue | undefined,
>(
  validatorName: 'validateSearchValue',
  searchParams: Record<string, unknown>,
  searchParamKey: string,
  value: unknown,
  defaultValue: TDefaultValue,
) => TDefaultValue | void;

type OptionalIfUndefined<T> = {
  [K in keyof T as undefined extends T[K] ? K : never]?: T[K];
} & {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K];
};

export type ValidateSearchUnknownValueHandler<TValidatorName extends string> = <
  TDefaultValue = unknown,
  TValidatorMatches = unknown,
>(
  validatorName: TValidatorName,
  searchParams: Record<string, any>,
  searchParamKey: string,
  value: unknown,
  defaultValue?: TDefaultValue,
  validatorMatches?: TValidatorMatches,
) => TDefaultValue | void;

type ValidatorName =
  | 'validateSearchValue'
  | 'validateSearchIsString'
  | 'validateSearchIsNumber'
  | 'validateSearchEnumeration'
  | 'validateSearchEnumerationIn';
