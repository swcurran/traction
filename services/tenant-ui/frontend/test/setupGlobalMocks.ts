import { config } from '@vue/test-utils';
import { vi } from 'vitest';

import {
  configStore,
  contactsStore,
  commonStore,
  governanceStore,
  issuerStore,
  messageStore,
  reservationStore,
  tenantStore,
  tokenStore,
  // Innkeeper
  innkeeperTenantsStore,
  innkeeperTokenStore,
  innkeeperOidcStore,
  // oidc
  oidcStore,
} from './__mocks__/store';

// Add mocks used in many files here. The mocks can be overridden in individual files if needed.

// Fully mock pinia with a copy of pinia's actual implementation and override the storeToRefs method to include mock of all stores.
vi.mock('pinia', async () => {
  const pinia = await vi.importActual<typeof import('pinia')>('pinia');

  return {
    ...pinia,
    storeToRefs: vi.fn(() =>
      Object.assign(
        configStore,
        contactsStore,
        commonStore,
        governanceStore,
        issuerStore,
        messageStore,
        reservationStore,
        tenantStore,
        tokenStore,
        // Innkeeper
        innkeeperTenantsStore,
        innkeeperTokenStore,
        innkeeperOidcStore,
        // oidc
        oidcStore
      )
    ),
  };
});

vi.mock('@/store', () => ({
  useConfigStore: vi.fn(() => configStore),
  useContactsStore: vi.fn(() => contactsStore),
  useCommonStore: vi.fn(() => commonStore),
  useGovernanceStore: vi.fn(() => governanceStore),
  useIssuerStore: vi.fn(() => issuerStore),
  useMessageStore: vi.fn(() => messageStore),
  useReservationStore: vi.fn(() => reservationStore),
  useTenantStore: vi.fn(() => tenantStore),
  useTokenStore: vi.fn(() => tokenStore),
  // Innkeeper
  useInnkeeperTenantsStore: vi.fn(() => innkeeperTenantsStore),
  useInnkeeperTokenStore: vi.fn(() => innkeeperTokenStore),
  useInnkeeperOidcStore: vi.fn(() => innkeeperOidcStore),
  // oidc
  useOIDCStore: vi.fn(() => oidcStore),
}));

vi.mock('vue-i18n', () => ({
  useI18n: vi.fn(() => ({
    locale: vi.fn(() => 'en'),
    t: vi.fn((key: string) => key),
  })),
}));

// Global mocks which are not imported
config.global.mocks = {
  $t: vi.fn((key: string) => key),
};