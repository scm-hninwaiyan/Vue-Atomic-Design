import { fnsIsEqual, format, getDateFromHourString, addMinutes, isAfter, isBefore, parse, endOfToday } from "@/utils";

// お届け時間の切替単位
export const UNIT_TIMES = [60, 30, 15];

/**
 *  お届け時間絞り込み用のOptionを生成する
 */
export const genDeliveryTimeOptions = ({ openingTime = "0000", closingTime = "2700", unit = 30 }) => {
  const openingDate = getDateFromHourString(openingTime);
  const closingDate = getDateFromHourString(closingTime);

  const options = [];

  let addedDate = openingDate;

  // 無限LOOP回避用INDEX
  const FOR_AVOID_INFINITE_LOOP = 100;

  for (let count = 0; count < FOR_AVOID_INFINITE_LOOP; count++) {
    const startTimePlus1Min = addMinutes(addedDate, 1);
    addedDate = addMinutes(addedDate, unit);
    options.push(genOption(startTimePlus1Min, addedDate));

    if (isEqualOrAfter(addedDate, closingDate)) {
      break;
    }
  }
  return options;
};

const genOption = (startDate, endDate) => {
  // 日をまたいでいるかどうか
  const isOverDayStartDate = isAfter(startDate, endOfToday());
  const isOverDayEndDate = isAfter(endDate, endOfToday());

  const startTimeLabel = format(startDate, "HH:mm");
  const endTimeLabel = format(endDate, "HH:mm");

  // 日をまたいでいる場合、25:00等で表記する
  const fixedStartTime = isOverDayStartDate
    ? `${parseInt(startTimeLabel.slice(0, 2)) + 24}:${startTimeLabel.slice(3, 5)}`
    : startTimeLabel;
  const fixedEndTime = isOverDayEndDate
    ? `${parseInt(endTimeLabel.slice(0, 2)) + 24}:${endTimeLabel.slice(3, 5)}`
    : endTimeLabel;

  // valueの場合、25:00等は素直に翌日として表現するため、下記の形式で保持する
  const startTimeValue = format(startDate, "yyyyMMddHHmmss");
  const endTimeValue = format(endDate, "yyyyMMddHHmmss");

  return {
    value: `${startTimeValue}-${endTimeValue}`,
    label: `${fixedStartTime}〜${fixedEndTime}`,
  };
};

/**
 *  デフォルトで選択されるお届け時間の値を導出する。
 *  baseOptionが指定されていない場合、現在時刻をもとにデフォルトで選択されるお届け時間を返却する。
 *  eg) 現在時刻が、14:10で、表示範囲が60minの場合、14:01〜15:00のOptionを返却する
 *
 *  baseOptionが指定されている場合、baseOptionをもとに選択されるお届け時間を返却する。
 *  eg) baseOptionが、14:00〜15:00の場合で、表示範囲が15minの場合、14:16〜14:30
 *
 * @param {*} unit お届け時間の単位(60/30/15min)
 * @param {*} baseOption 基準となるお届け時間のOption
 */
export const getDefaultOption = ({ unit = 60, baseOption = null, openingTime, closingTime }) => {
  const baseDateTime = baseOption ? genDateFromOption(baseOption).startDateTime : new Date();
  const options = genDeliveryTimeOptions({ unit, openingTime, closingTime });

  // 基準となる時間がお届け時間From/Toの間に収まるアイテム
  const defaultOption = options.find(option => {
    const { startDateTime, endDateTime } = genDateFromOption(option);
    return isEqualOrAfter(baseDateTime, startDateTime) && isEqualOrBefore(baseDateTime, endDateTime);
  });

  // 基準となる時間がお届け時間Fromより前の直近のアイテム
  // 切り替えボタンで、お届け時間を60分単位から15分単位と少ない単位にした場合の考慮
  const firstOption = options.find(option => {
    const { startDateTime } = genDateFromOption(option);
    return isEqualOrBefore(baseDateTime, startDateTime);
  });

  return defaultOption || firstOption || options[0];
};

/**
 *  お届け時間のオプションの値から、お届け時間from/toを20211231235959の形式に変換した値を返す
 * @param {Object} option
 */
export const genStringDateFromOption = option => {
  const { startDateTime, endDateTime } = genDateFromOption(option);

  return {
    stringStartTime: format(startDateTime, "yyyyMMddHHmmss"),
    stringEndTime: format(endDateTime, "yyyyMMddHHmmss"),
  };
};

/**
 * お届け時間のオプションの値の"20210519140123-20210519150023"を from:Date, to:Date の形式に変換する
 * @param {string} optionValue
 */
export const optionValueToDate = option => {
  const [from, to] = option.value.split("-");
  const baseDate = new Date();
  return {
    from: parse(from, "yyyyMMddHHmmss", baseDate),
    to: parse(to, "yyyyMMddHHmmss", baseDate),
  };
};

/**
 *  お届け時間のオプションの値から、開始と終了時間のDateオブジェクトを作成する
 * @param {*} option
 * @param {*} baseDate
 */
const genDateFromOption = (option, baseDate = new Date()) => {
  const [startTime, endTime] = option.value.split("-");
  return {
    startDateTime: parse(startTime, "yyyyMMddHHmmss", baseDate),
    endDateTime: parse(endTime, "yyyyMMddHHmmss", baseDate),
  };
};

/**
 * 基準日がtargetDate以降かどうかを判断する
 * @param {Date} baseDate
 * @param {Date} targetDate
 */
const isEqualOrAfter = (baseDate, targetDate) => {
  return fnsIsEqual(baseDate, targetDate) || isAfter(baseDate, targetDate);
};

/**
 * 基準日がtargetDate以前かどうかを判断する
 * @param {Date} baseDate
 * @param {Date} targetDate
 */
const isEqualOrBefore = (baseDate, targetDate) => {
  return fnsIsEqual(baseDate, targetDate) || isBefore(baseDate, targetDate);
};
