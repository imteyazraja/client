import {
  ADWORDS_BY_PACKAGE,
  VFL_PACKAGE,
  PACKAGE_EXPIRY,
  FLEXI_CATEGORY
} from "./defaultprice";
const PRICE_VALIDATOR = {
  prempkg_ecs: {
    type: "default-int",
    emptyerr: "Please enter Adwords by Package - ECS Budget.",
    typeerr:
      "Adwords by Package - ECS Budget can't be less than " +
      ADWORDS_BY_PACKAGE.ECS_1YR,
    min: ADWORDS_BY_PACKAGE.ECS_1YR
  },
  prempkg_nonecs: {
    type: "default-int",
    emptyerr: "Please enter Adwords by Package - NONECS Budget.",
    typeerr:
      "Adwords by Package - NONECS Budget can't be less than " +
      ADWORDS_BY_PACKAGE.NONECS_1YR,
    min: ADWORDS_BY_PACKAGE.NONECS_1YR
  },
  prempkg_twoyr_per: {
    type: "default-dec",
    emptyerr:
      "Please enter Adwords by Package - Premium Two Year percentage value.",
    typeerr:
      "Adwords by Package - Premium Two Year percentage value can't be less than " +
      ADWORDS_BY_PACKAGE.PREM_2YR_PER,
    min: ADWORDS_BY_PACKAGE.PREM_2YR_PER
  },
  prempkg_disc_per: {
    type: "max-compare",
    emptyerr: "Please enter Adwords by Package - Discount value.",
    typeerr:
      "Adwords by Package - Discount value can't be more than " +
      ADWORDS_BY_PACKAGE.MAX_DISC_PER,
    max: ADWORDS_BY_PACKAGE.MAX_DISC_PER
  },
  prempkg_disc_eligib: {
    type: "default-int",
    emptyerr: "Please enter Adwords by Package - Discount Eligibility Amount.",
    typeerr:
      "Adwords by Package - Discount Eligibility Amount can't be less than " +
      ADWORDS_BY_PACKAGE.DISC_ELIGIB,
    min: ADWORDS_BY_PACKAGE.DISC_ELIGIB
  },
  prempkg_threemon_nonecs: {
    type: "default-int",
    emptyerr: "Please enter Adwords by Package - Three Months NONECS Price.",
    typeerr:
      "Adwords by Package - Three Months NONECS Price can't be less than " +
      ADWORDS_BY_PACKAGE.NONECS_3MON,
    min: ADWORDS_BY_PACKAGE.NONECS_3MON
  },
  prempkg_citymin_bdgt: {
    type: "default-int",
    emptyerr: "Please enter Adwords by Package - City Minimum Budget.",
    typeerr:
      "Adwords by Package - City Minimum Budget can't be less than " +
      ADWORDS_BY_PACKAGE.CITY_MIN,
    min: ADWORDS_BY_PACKAGE.CITY_MIN
  },
  pkgvfl_ecs: {
    type: "default-int",
    emptyerr: "Please enter VFL Package - ECS Budget.",
    typeerr:
      "VFL Package - ECS Budget can't be less than " + VFL_PACKAGE.ECS_1YR,
    min: VFL_PACKAGE.ECS_1YR
  },
  pkgvfl_nonecs: {
    type: "default-int",
    emptyerr: "Please enter VFL Package - NONECS Budget.",
    typeerr:
      "VFL Package - NONECS Budget can't be less than " +
      VFL_PACKAGE.NONECS_1YR,
    min: VFL_PACKAGE.NONECS_1YR
  },
  pkgvfl_ecs_custom: {
    type: "default-int",
    emptyerr: "Please enter VFL Package - ECS Custom Budget.",
    typeerr:
      "VFL Package - ECS Custom Budget can't be less than " +
      VFL_PACKAGE.ECS_CUSTOM_1YR,
    min: VFL_PACKAGE.ECS_CUSTOM_1YR
  },
  pkgvfl_nonecs_custom: {
    type: "default-int",
    emptyerr: "Please enter VFL Package - NONECS Custom Budget.",
    typeerr:
      "VFL Package - NONECS Custom Budget can't be less than " +
      VFL_PACKAGE.NONECS_CUSTOM_1YR,
    min: VFL_PACKAGE.NONECS_CUSTOM_1YR
  },
  pkgvfl_existing_ecs_per: {
    type: "default-dec",
    emptyerr:
      "Please enter VFL Package - ECS percentage value for existing contracts.",
    typeerr:
      "VFL Package - ECS percentage value for existing contracts can't be less than " +
      VFL_PACKAGE.EXIST_ECS_PER,
    min: VFL_PACKAGE.EXIST_ECS_PER
  },
  pkgvfl_existing_nonecs_per: {
    type: "default-dec",
    emptyerr:
      "Please enter VFL Package - NONECS percentage value for existing contracts.",
    typeerr:
      "VFL Package - NONECS percentage value for existing contracts can't be less than " +
      VFL_PACKAGE.EXIST_NONECS_PER,
    min: VFL_PACKAGE.EXIST_NONECS_PER
  },
  pkgvfl_expiry_ecs: {
    type: "default-int",
    emptyerr: "Please enter VFL Package - ECS Budget for expire contracts.",
    typeerr:
      "VFL Package - ECS Budget for expire contracts can't be less than " +
      VFL_PACKAGE.EXPIRY_ECS,
    min: VFL_PACKAGE.EXPIRY_ECS
  },
  pkgvfl_expiry_nonecs: {
    type: "default-int",
    emptyerr: "Please enter VFL Package - NONECS Budget for expire contracts.",
    typeerr:
      "VFL Package - NONECS Budget for expire contracts can't be less than " +
      VFL_PACKAGE.EXPIRY_NONECS,
    min: VFL_PACKAGE.EXPIRY_NONECS
  },
  pkgexp_ecs: {
    type: "default-int",
    emptyerr: "Please enter Package Expiry - ECS Budget.",
    typeerr:
      "Package Expiry - ECS Budget can't be less than " +
      PACKAGE_EXPIRY.ECS_1YR,
    min: PACKAGE_EXPIRY.ECS_1YR
  },
  pkgexp_nonecs: {
    type: "default-int",
    emptyerr: "Please enter Package Expiry - NONECS Budget.",
    typeerr:
      "Package Expiry - NONECS Budget can't be less than " +
      PACKAGE_EXPIRY.NONECS_1YR,
    min: PACKAGE_EXPIRY.NONECS_1YR
  },
  pkgexp_twoyr_nonecs: {
    type: "default-int",
    emptyerr: "Please enter Package Expiry - Two Years NONECS Budget.",
    typeerr:
      "Package Expiry - Two Years NONECS Budget can't be less than " +
      PACKAGE_EXPIRY.NONECS_2YR,
    min: PACKAGE_EXPIRY.NONECS_2YR
  },
  flxcat_ecs: {
    type: "default-int",
    emptyerr: "Please enter Adwords by Flexi Category - ECS Budget.",
    typeerr:
      "Adwords by Flexi Category - ECS Budget can't be less than " +
      FLEXI_CATEGORY.ECS_1YR,
    min: FLEXI_CATEGORY.ECS_1YR
  },
  flxcat_nonecs: {
    type: "default-int",
    emptyerr: "Please enter Adwords by Flexi Category - NONECS Budget.",
    typeerr:
      "Adwords by Flexi Category - NONECS Budget can't be less than " +
      FLEXI_CATEGORY.NONECS_1YR,
    min: FLEXI_CATEGORY.NONECS_1YR
  },
  flxcat_twoyr_per: {
    type: "default-dec",
    emptyerr:
      "Please enter Adwords by Flexi Category - Premium Two Year percentage value.",
    typeerr:
      "Adwords by Flexi Category - Premium Two Year percentage value can't be less than " +
      FLEXI_CATEGORY.PREM_2YR_PER,
    min: FLEXI_CATEGORY.PREM_2YR_PER
  }
};

export default PRICE_VALIDATOR;
