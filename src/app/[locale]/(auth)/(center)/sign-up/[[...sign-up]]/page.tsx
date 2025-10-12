import type { Metadata } from 'next';
import { SignUp } from '@clerk/nextjs';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getI18nPath } from '@/utils/Helpers';

type ISignUpPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: ISignUpPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'SignUp',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function SignUpPage(props: ISignUpPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const hasValidClerkKey = publishableKey && 
    publishableKey !== 'pk_test_demo_key_for_development' &&
    publishableKey.startsWith('pk_');

  if (!hasValidClerkKey) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Disabled</h1>
          <p className="text-gray-600 mb-4">
            Clerk authentication is not configured. Please set up valid Clerk keys to enable authentication.
          </p>
          <p className="text-sm text-gray-500">
            See docs/environment-setup-guide.md for setup instructions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <SignUp path={getI18nPath('/sign-up', locale)} />
  );
};
