import { HttpStatus } from './http-status';
import { throwError } from '../middleware/errorHandler';

// Phone Validator Function
export const phoneValidator = async (phone: string) => {
  const prefix = "+233";

  switch (true) {
    case phone.startsWith(prefix + "0"):
      return "0" + phone.slice(5); 

    case phone.startsWith(prefix):
      return "0" + phone.slice(4); 

    case /^0\d{9}$/.test(phone):
      return phone; 

    default:
      throwError(HttpStatus.BAD_REQUEST, "Invalid phone number format");
  }
};

// Check Mobile Network Function
export const checkMobileNetwork = async (phone: string) => {
  const Mtn = ["024", "025", "054", "055", "053", "059"];
  const AirtelTigo = ["027", "057", "026"];
  const Telecel = ["020", "050"];

  // Extract the local network prefix (first 3 digits)
  let phonePrefix = phone.slice(0, 3); 
  if (Mtn.includes(phonePrefix) || AirtelTigo.includes(phonePrefix) || Telecel.includes(phonePrefix)) {
    return phone;
  } else {
    throwError(HttpStatus.FORBIDDEN, "Phone number not supported");
  }
};