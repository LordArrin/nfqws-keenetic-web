import { useTranslation, type TranslationKey } from '@/hooks/useTranslation';

export const Trans = ({ i18nKey }: { i18nKey: TranslationKey }) => {
  const { t } = useTranslation();
  return <>{t(i18nKey)}</>;
};
