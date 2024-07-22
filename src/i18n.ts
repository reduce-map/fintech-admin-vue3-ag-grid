import { createI18n } from "vue-i18n";
import enLocal from "./locales/en.ts";
import uaLocal from "./locales/ua.ts";

import en from "view-ui-plus/dist/locale/en-US.js";
import ua from "view-ui-plus/dist/locale/uk-UA.js";

const messages = {
  "en-US": {
    ...en,
    ...enLocal,
  },
  "uk-UA": {
    ...ua,
    ...uaLocal,
  },
};

const i18n = createI18n({
  allowComposition: true,
  globalInjection: true,
  legacy: false,
  locale: "en-US",
  fallbackLocale: "en-US",
  messages,
});

export default i18n;

export interface I18nMessages {
  publicProfile: string;
  publicProfileInfo: string;
  personalCabinet: string;
  exchangeApplications: string;
  changePassword: string;
  personalData: string;
  userVerification: string;
  logout: string;
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  saveChanges: string;
  companyName: string;
  logo: string;
  siteUrl: string;
  verificationInformation: string;
  usePermanentAddress: string;
  identityDocuments: string;
  companyDocuments: string;
  documentsVerified: string;
  attentionNeeded: string;
  country: string;
  streetAddress: string;
  city: string;
  stateProvince: string;
  zipPostalCode: string;
  importantChangesNotice: string;
  notifications: string;
  byEmail: string;
  comments: string;
  getNotifiedComments: string;
  applications: string;
  getNotifiedApplication: string;
  getNotifiedProcessed: string;
  internalProfileUrl: string;
  processed: string;
  cancel: string;
  save: string;
  clickHere: string;
  needOnlineExchange: string;
  generalSettings: string;
  autoReLoginSteam: string;
  autoIncrementOrder: string;
  priceCalculation: string;
  desiredProfitPercentage: string;
  minimumProfitValue: string;
  exactProfitValue: string;
  filters: string;
  glassCoefficient: string;
  salesPerDay: string;
  listingPosition: string;
  reports: string;
  statisticsCollectionTime: string;
  on: string;
  off: string;
  selectAutoReLoginSteam: string;
  selectAutoIncrementOrder: string;
  enterDesiredProfitPercentage: string;
  enterMinimumProfitValue: string;
  enterExactProfitValue: string;
  enterGlassCoefficient: string;
  enterSalesPerDay: string;
  enterListingPosition: string;
  selectStatisticsCollectionTime: string;
}
