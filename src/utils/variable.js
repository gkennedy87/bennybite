import DeviceInfo from "react-native-device-info";

export const Color = {
  BACK_WHITE: "#FFFFFF",
  BACK_BLACK: "#000000",
  BACK_LIGHTGRAY: "#E0E0E0",
  BACK_DARKYELLOW: "#EF7F1F",
  BACK_LIGHTYELLOW: "#F5A91C",
  BACK_RED: "#FF2323",
  INPUT_BORDER: "#000000",

  TXT_WHITE: "#ffffff",
  TXT_BLACK: "#000000",
  TXT_DARKGRAY: "#B9B9B9",
  TXT_LIGHTGRAY: "#A1A1A1",
  TXT_GREEN: "#23C89B",
  TXT_LIGHTYELLOW: "#F5A91C",
  TXT_DARKYELLOW: "#EF7F1F",
  TXT_RED: "#FF2323",
};

export const Font = {
  MYRIAD_REGULAR: "MyriadPro-Regular",
  MYRIAD_SEMIBOLD: "MyriadPro-Semibold",

  FONTSIZE_12: 12,
  FONTSIZE_13: 13,
  FONTSIZE_14: 14,
  FONTSIZE_16: 16,
  FONTSIZE_18: 18,
  FONTSIZE_20: 20,
  FONTSIZE_22: 22,
  FONTSIZE_24: 24,
  FONTSIZE_32: 32,
  FONTSIZE_34: 34,
};

export const Globals = {
  isIpad: DeviceInfo.isTablet(),

  kDeviceToken: "deviceToken",
  kDeviceType: "deviceType",
};

export const userRole = [
  'admin',
  'staff',
  'user'
]