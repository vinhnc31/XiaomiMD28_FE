import Config from 'react-native-config';
console.log('Config: ', Config);

export const API_URL = Config.API_URL;
export const ONESIGNAL_APP_ID = Config.ONESIGNAL_APP_ID;
export const GOOGLE_MAPS_PLACES_API_KEY = Config.GOOGLE_MAPS_PLACES_API_KEY;
export const SOCKET_PATH = Config.SOCKET_PATH;

export const SYSTEM_COLORS = {
  THEME: '#FFA602',
  GRAY: '#F0F0F0',
  GRAY_MORE: '#cccccc',
  RED: '#FF0F00',
  BLUE: '#189EFF',
  MAPLINE: '#50c168',
};

export const REASON = {
  OTHER: 'OTHER',
  CHANGE_ADDRESS: 'CHANGE_ADDRESS',
  MISPLACED_TIME: 'MISPLACED_TIME',
  ADD_MORE: 'ADD_MORE',
};

export const CHOOSE_PAYMENT = {
  QR_PAYMENT: 'QR',
  CASH_PAYMENT: 'CASH',
};

export const CHOOSE_TIME = {
  THREE_HOUSE: 'THREE_HOUSE',
  EIGHT_HOUSE: 'EIGHT_HOUSE',
};

export const RESPONSE_STATUS = {
  SUCESS: 200,
  NOT_FOUND: 404,
  INTERVAL_SERVER: 500,
  FORBIDDEN: 403,
  BAD_REQUEST: 400,
};

export const ACCOUNT_TYPE = 'CUSTOMER';

export const INVALID_TOKEN = 'INVALID_TOKEN';

export const TIME_EXPIRED = 25;

export enum ACTIVITY_TYPE {
  // Thuê tài xế
  HIRE_DRIVER,
  // Xe tiện chuyến
  CONVENIENT_CAR,
  // Taxi Nội Bài
  NOI_BAI_TAXI,
}

export const TRIP_STATUS = {
  INIT: 'INIT', // Khởi tạo
  LOKING_FOR_DRIVER: 'LOKING_FOR_DRIVER', // Đang tìm tài xế
  CONFIRM: 'CONFIRM', // Tài xế nhận chuyến
  DRIVER_COMING: 'DRIVER_COMING', // Tài xế đang đến
  DEPART: 'DEPART', // Khởi hành
  CANCEL: 'CANCEL', // Hủy
  FINISH: 'FINISH', // Hoàn thành
  NEED_DRIVER: 'NEED_DRIVER', // Cần điều tài xế
  ARRIVED: 'ARRIVED', // Tài xế đã đến điểm đón
};

export enum PAYMENT_METHOD {
  CASH = 'CASH', // tiền mặt
  QR = 'QR', // chuyển khoản
}

export enum NotificationType {
  System = 0, // Thông báo từ CMS
  DriverConfirm = 1, // Đã có tài xế
  DriverComing = 2, // tài xế đang đến
  CanceBooking = 3, // Hủy chuyến
  FinishBooking = 4, // Hoàn thành chuyến
  DriverArrived = 5, // Tài xế đã đến điểm đón
  NewVoucher = 6, // Khuyến mãi mới
  BalanceMin = 7, // Thông báo cho tài xế khi số tiền dưới 500.000đ,
  NewBooking = 8, // Thông báo có chuyến mới cho tài xế (Không xuất hiện trong màn danh sách thông báo)
  UpgradeService = 9, // Thông báo nâng gói dịch vụ
  CancelUpgradeService = 10, // Hủy nâng cấp dịch vụ
  ConfirmUpgradeService = 11, // Xác nhận nâng cấp dịch vụ
  BookingDepart = 12, // Bắt đầu chuyến đi
  NewDeviceLogin = 13, // Đăng nhập trên thiết bị mới (Không xuất hiện trong màn danh sách thông báo)
  DepositSuccess = 14, // Nạp tiền thành công
  AutoUpgradeService = 15, // Tự động nâng cấp dịch vụ
  DriverCancelBooking = 16, // Tài xế hủy chuyến
  UpdateBooking = 17, // Admin sửa chuyến chuyến
  ChangeDriver = 18, // Admin thay đổi tài xế
  StartBooking = 19, // Chuyến đi đến giờ khởi hành
  AdminCancelBooking = 20, // Admin hủy chuyến
}

export const defaultPageSize = 10;

export const LATITUDE_DELTA = 0.1;
export const LONGITUDE_DELTA = 0.1;
// export const LATITUDE_DELTA = 0.0922;
// export const LONGITUDE_DELTA = 0.0421;

export const LINK_GOOGLE_PLAY = 'https://play.google.com/store/apps/details?id=com.gocheap.customer';
export const LINK_APP_STORE = 'https://apps.apple.com/vn/app/gocheap/id6450113116';
export const LINK_ZALO = 'http://zalo.me/4028924167539517140';
export const LINK_GOOGLE_PLAY_DRIVER = 'https://play.google.com/store/apps/details?id=com.gocheapdriver';
export const LINK_APP_STORE_DRIVER = 'https://apps.apple.com/vn/app/gocheap-driverx/id6450113066';
export const HOTLINE = '+842473000636';
