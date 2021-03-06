export const numberFormat = (num) => {
  let commaNum = '0원';
  if (num > 0 && num < 10000){
    commaNum = num/1000 +'천원';
  } else if(num >= 10000 && num < 100000000) {
    commaNum = num/10000 +'만원';
  }
  return commaNum;
};

export const numberWithCommas = (num) => {
  // 숫자만 입력 가능하게, 앞자리에 0 빼주기
  let commaNum = num.toString().replace(/^[0]|[^0-9,]/g, '');
  // 반점 제거
  commaNum = commaNum.toString().split(',').join('');
  // 3자리마다 콤마 넣어주기
  commaNum = commaNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (!commaNum) commaNum = 0;

  return commaNum;
};

export const numberWithoutCommas = (num) => {
  // 반점 제거
  const commaNum = num.toString().split(',').join('');

  return parseInt(commaNum);
};

export const getMonth = (date) => {
  const month =
    date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  return month;
};

export const getDate = (date) => {
  const dateFormat = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  return dateFormat;
};

export const getWeek = (date) => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[date];
  return dayOfWeek;
};

export const getFullDate = (date, format) => {
  const year = date.getFullYear();
  const month = getMonth(date);
  const day = getDate(date);
  const dateForm = year + format + month + format + day;
  return dateForm;
};

// 해당 달에 맞는 히스토리 필터링
export const getMonthHistory = (year, month, history) =>
  history.filter((item) => item.createdAt.getMonth() + 1 === month && item.createdAt.getFullYear() === year);

// 일자별로 히스토리를 객체형태로 반환
export const getDaysHistory = (history) => {
  const daysHistory = {};
  // 변경한 배열 생성해주는 로직 push -> concat
  history.forEach((element) => {
    const date = element.createdAt;
    const d = getFullDate(date, '.');
    daysHistory[d] = daysHistory[d] || [];
    daysHistory[d] = daysHistory[d].concat(element);
  });

  return daysHistory;
};

// 일 평균 구하기
export const getDateAverage = (history) => {
  let total = 0;
  let length = 0;
  history.forEach((item) => {
    total += item;
    length += 1;
  });
  const dayAverage = total / length;

  return dayAverage;
};



export const getAllIncome = (history) => {
  let dayAllIncome = 0;
  for (const { amount, type } of history) {
    if (type === '수입') {
      dayAllIncome += amount;
    }
  }

  return dayAllIncome;
};

export const getAllExpense = (history) => {
  let dayAllExpense = 0;
  for (const { amount, type } of history) {
    if (type === '지출') {
      dayAllExpense += amount;
    }
  }

  return dayAllExpense;
};

export const getAllPercent = (history) => {
  let total = 0;
  history.map((item) => {
    total += parseInt(item.amount);
  });
  const allPercent = history.map((item) => ({
    ...item,
    percent: ((parseInt(item.amount) / total) * 100),
  }));

  allPercent.sort((a, b) => b.percent - a.percent);
  return allPercent;
};

export const createDashArray = (history) => {
  let prevPercent = 0;
  const arr = history.map((item, index) => {
    let dasharray = '0 0 0 0';
    if (index === 0) {
      dasharray = `${item.percent} ${100 - item.percent} 0 0`;
    } else if (index === history.length - 1) {
      dasharray = `0 ${prevPercent} ${item.percent} 0`;
    } else {
      dasharray = `0 ${prevPercent} ${item.percent} ${
        100 - prevPercent - item.percent
      }`;
    }

    prevPercent += item.percent;
    return {
      ...item,
      dasharray,
    };
  });

  return arr;
};

export const validation = (data) => {
  return data;
};
