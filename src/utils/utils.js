import dateFormat, { masks } from 'dateformat';
import moment from 'moment';
import * as _ from 'lodash';
import { Utils as FormioUtils } from 'formiojs';

masks.custom = 'd-mmm-yyyy h:MM TT';

export const formatDate = (dateValue, mask) =>
  dateValue && dateFormat(new Date(dateValue), mask ?? 'custom');

export const addDaysToDate = (date, days) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};
export const formatAmount = (amount) => amount.toLocaleString();

export const getEpoch = (time) => new Date(time).getTime();

export const summarizeTime = (milliseconds) => {
  if (milliseconds === 0) {
    return '0 s';
  } else {
    const seconds = milliseconds > 0 ? milliseconds / 1000 : null;
    const minutes = seconds > 0 ? Math.trunc(seconds / 60) : null;
    const hours = minutes > 0 ? Math.trunc(minutes / 60) : null;
    const days = hours > 0 ? Math.trunc(hours / 24) : null;

    return `${days > 0 ? days + ' days, ' : ''}${
      hours > 0 ? (hours % 24) + ' hrs, ' : ''
    }${minutes > 0 ? (minutes % 60) + ' min, ' : ''}${
      seconds ? Math.trunc(seconds % 60) + ' s' : ''
    }`;
  }
};

export const prettyPrint = (jsonString, spacing = 4) =>
  jsonString && JSON.stringify(JSON.parse(jsonString), null, spacing);

export const toTitleCase = (str) => {
  return _.startCase(_.toLower(str));
};

export const toHeaderCase = (str) => {
  const result = str.replace(/([A-Z])/g, (match, p1, offset) => {
    if (offset === 0) return match.toUpperCase();
    const prevCharacter = str[offset - 1];
    if (/[a-z]/.test(prevCharacter)) return ` ${match}`;
    return match;
  });
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

export const convertHexToRGB = (hex) => {
  // check if it's a rgba
  if (hex.match('rgba')) {
    return hex.slice(5).split(',').slice(0, -1).join(',');
  }

  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');

    return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',');
  }
};

export const getNestedProperty = (object, propName, separator = '.') => {
  const props = propName?.split(separator) ?? [];
  if (props.length === 0) return undefined;
  else if (props.length === 1) {
    return object?.[propName];
  } else {
    return getNestedProperty(
      object?.[props.at(0)],
      props.slice(1).join(separator),
      separator
    );
  }
};

export const listLookup = (items, matchBy) => {
  for (let i = 0; i < items.length; i++) {
    if (matchBy?.(items[i], i) === true) {
      // the return will break the loop and exit the function
      return items[i];
    }
  }
};

// export const slugify = (string) =>
//   string
//     ?.toString()
//     .trim()
//     .toLowerCase()
//     .replace(/\s+/g, '-')
//     .replace(/[^\w\-]+/g, '')
//     .replace(/\-\-+/g, '-')
//     .replace(/^-+/, '')
//     .replace(/-+$/, '');

export const getQueryParam = (prop) => {
  let params = {};
  let search = decodeURIComponent(
    window.location.href.slice(window.location.href.indexOf('?') + 1)
  );
  let definitions = search.split('&');
  definitions.forEach((val, key) => {
    let parts = val.split('=', 2);
    params[parts[0]] = parts[1];
  });
  return prop && prop in params ? params[prop] : null;
};

export const serializeToQueryParam = (obj, prefix, braceNested = false) => {
  let str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      let k = prefix ? `${prefix}${braceNested ? '[' + p + ']' : '.' + p}` : p,
        v = obj[p];
      str.push(
        v !== null && typeof v === 'object'
          ? serializeToQueryParam(v, k, braceNested)
          : encodeURIComponent(k) + '=' + encodeURIComponent(v)
      );
    }
  }
  return str.join('&');
};

export const validateJSON = (text, strict = false) => {
  if (!text?.length) return { isValid: !strict, json: text };
  try {
    const json = JSON.parse(text);
    return {
      isValid: true,
      json,
    };
  } catch (error) {
    return {
      isValid: false,
      error,
    };
  }
};

export const reduceObjToArray = (
  obj = {},
  keyProp = 'key',
  valueProp = 'value'
) => {
  return Object.keys(obj).map((el) => {
    const item = {};
    item[keyProp] = el;
    item[valueProp] = obj[el];
    return item;
  });
};

export const constructObjFromArray = (
  arr = [],
  keyProp = 'key',
  valueProp = 'value'
) => {
  const obj = {};
  arr.forEach((el) => {
    const key = el?.[keyProp];
    const val = el?.[valueProp];
    obj[key] = val;
  });
  return obj;
};

export const buildFormData = (dataName, data, fileName, file) => {
  const formData = new FormData();
  if (file) {
    if (file.length === 1) {
      formData.append(fileName, file[0]);
    } else if (file.length > 1) {
      let i;
      for (i = 0; i < file.length; i++) {
        formData.append(fileName, file[i]);
      }
    }
  }
  formData.append(
    dataName,
    new Blob([JSON.stringify(data)], { type: 'application/json' })
  );
  return formData;
};

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const getCodeListItemByValue = (items, value) => {
  return items?.find((item) => item.value === value);
};

export const setNestedValue = (obj, propName, value, separator = '.') => {
  if (!obj) obj = {};
  const props = propName.split(separator);
  if (props.length === 1) {
    obj[propName] = value;
  } else {
    const [firstProp, ...otherProps] = props;
    obj[firstProp] = setNestedValue(
      obj?.[firstProp],
      otherProps.join(separator),
      value,
      separator
    );
  }
  return obj;
};

export const downloadByteArray = (byte, filename, type) => {
  const link = document.createElement('a');
  link.href = getURLFromByteArray(byte, type);
  link.download = filename;
  link.click();
};

export const getURLFromByteArray = (byte, type = '') => {
  const blob = new Blob([byte], { type });
  return window.URL.createObjectURL(blob);
};

export const msToDuration = (val) => {
  let tempTime = moment.duration(val),
    timeObj = {
      years: tempTime.years(),
      months: tempTime.months(),
      days: tempTime.days(),
      hrs: tempTime.hours(),
      mins: tempTime.minutes(),
      secs: tempTime.seconds(),
      ms: tempTime.milliseconds(),
    },
    timeArr = [];

  for (let k in timeObj) {
    if (Number(timeObj[k]) > 0) {
      timeArr.push(`${timeObj[k]} ${k}`);
    }
  }

  return timeArr.join(', ');
};

export const addSchemaRequiredFields = (schema, requiredFields, labelsMap) => {
  if (schema.type === 'object') {
    Object.entries(schema.fields).forEach(([key, nestedSchema]) => {
      if (isFieldRequired(key, requiredFields)) {
        schema.fields[key] = nestedSchema.required(
          `${labelsMap[key]} is required`
        );
      }
      if (nestedSchema.type === 'object' || nestedSchema.type === 'array') {
        addSchemaRequiredFields(nestedSchema, requiredFields, labelsMap);
      }
    });
  } else if (schema.type === 'array') {
    addSchemaRequiredFields(schema.innerType, requiredFields, labelsMap);
  }
};

export const isFieldRequired = (field, requiredFields) =>
  requiredFields.includes(field);

export const isClassComponent = (component) =>
  typeof component === 'function' && !!component?.prototype?.isReactComponent;

export const isFunctionComponent = (component) => {
  return (
    typeof component === 'function' &&
    String(component)?.includes('return React.createElement')
  );
};

export const isReactComponent = (component) =>
  isFunctionComponent(component) || isClassComponent(component);

export const waitEval = (template, args, retVal) => {
  // args: is a javascript object containing values that can be
  // referenced in the template script.
  // retVal: is the key of a value in args you want this promise to
  // return if the template script does not resolve.
  return new Promise((resolve, reject) => {
    // template script must always resolve()
    if (!(template && template?.trim?.()?.length)) {
      if (retVal) {
        template = `resolve(${retVal});`;
      } else {
        resolve(null);
      }
    } else if (!template.includes('resolve(')) {
      if (retVal) {
        template += `; resolve(${retVal});`;
      } else {
        template += '; resolve(null);';
      }
    }
    FormioUtils.evaluate(template, { ...args, resolve, reject });
  });
};
export const stringifyFormikError = (error) => {
  if (typeof error === 'string') return error;
  if (Array.isArray(error))
    return error.map((el) => stringifyFormikError(el)).join(',');
  if (typeof error === 'object')
    return Object.values(error)
      .map((el) => stringifyFormikError(el))
      .join(', ');
};

export const getFieldError = (formikBag, fieldName, rawFieldError) => {
  const fieldErr = getNestedProperty(formikBag?.errors, fieldName);
  if (
    (formikBag?.submitCount > 0 ||
      getNestedProperty(formikBag?.touched, fieldName)) &&
    fieldErr
  ) {
    if (rawFieldError) return fieldErr;
    return stringifyFormikError(fieldErr);
  }
};
export const getFullDate = (date) => {
  return moment(date).format('DD-MMM-YYYY HH:mm:ss');
};
