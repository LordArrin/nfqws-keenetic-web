import { isValidElement, useCallback, useMemo, type ReactNode } from 'react';
import en from '@/translations/en.json';
import ru from '@/translations/ru.json';

const SUPPORTED_LANGUAGES = ['en', 'ru'];
const DEFAULT_LANGUAGE = 'en';

interface JsonObject {
  [key: string]: JsonValue;
}

type JsonValue = string | JsonObject;

type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`;

type LeafStringPaths<T> = T extends string
  ? ''
  : T extends Record<string, JsonValue>
    ? {
        [K in Extract<keyof T, string>]: T[K] extends string
          ? `${K}`
          : T[K] extends Record<string, JsonValue>
            ? `${K}${DotPrefix<LeafStringPaths<T[K]>>}`
            : never;
      }[Extract<keyof T, string>]
    : never;

export type TranslationSchema = typeof en;
export type TranslationKey = LeafStringPaths<TranslationSchema>;

export type TranslationParamValue = string | number | ReactNode;
export type TranslationParams = Record<string, TranslationParamValue>;

type TFunction = {
  (
    key: TranslationKey,
    params?: TranslationParams,
    fallback?: string,
  ): ReactNode;
  (key: string, params?: TranslationParams, fallback?: string): ReactNode;
};

const resolve = (keys: string[], pack: JsonValue): string | undefined => {
  let current: JsonValue = pack;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as JsonObject)[key];
    } else {
      return undefined;
    }
  }

  return typeof current === 'string' ? current : undefined;
};

const interpolate = (
  template: string,
  params?: TranslationParams,
): ReactNode => {
  if (!params) return template;

  const allPrimitive = Object.values(params).every(
    (v) => typeof v === 'string' || typeof v === 'number',
  );
  if (allPrimitive) {
    return template.replace(/\{\{(\w+)}}/g, (_, key) =>
      key in params ? String(params[key]) : `{{${key}}}`,
    );
  }

  const re = /\{\{(\w+)}}/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(template)) !== null) {
    const [raw, key] = match;
    const index = match.index;

    if (index > lastIndex) {
      parts.push(template.slice(lastIndex, index));
    }

    if (key in params) {
      const value = params[key];
      if (isValidElement(value)) {
        parts.push({ ...value, key: `${key}-${index}` } as ReactNode);
      } else {
        parts.push(value as ReactNode);
      }
    } else {
      parts.push(raw);
    }

    lastIndex = index + raw.length;
  }

  if (lastIndex < template.length) {
    parts.push(template.slice(lastIndex));
  }

  return parts;
};

export const useTranslation = () => {
  // TODO: storage
  const language = useMemo(() => {
    const detected = window.navigator.language.split('-')[0];
    return SUPPORTED_LANGUAGES.includes(detected) ? detected : DEFAULT_LANGUAGE;
  }, []);

  const langpack = language === 'ru' ? ru : en;
  const defaultLangpack = en;

  const t = useCallback(
    (path, params, fallback = '__MISSING__') => {
      const keys = path.split('.');

      const primary = resolve(keys, langpack);
      if (primary !== undefined) {
        return interpolate(primary, params);
      }

      if (langpack !== defaultLangpack) {
        const secondary = resolve(keys, defaultLangpack);
        if (secondary !== undefined) {
          return interpolate(secondary, params);
        }
      }

      return fallback;
    },
    [defaultLangpack, langpack],
  ) as TFunction;

  return { t };
};
