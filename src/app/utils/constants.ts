export module Constants {

    export class LocalStorageKey {
        static readonly LOCAL_STORAGE_USER_ID_KEY = 'userId';
        static readonly LOCAL_STORAGE_USER_NAME_KEY = 'userName';
        static readonly LOCAL_STORAGE_USER_PHOTO_KEY = 'userPhoto';
    }

    export class stockAiChooseLabel {
        static readonly BELOW_AVERAGE_THREE_DAYS_LABEL = '跌破所有均線三日';
        static readonly ABOVE_MOVING_AVERAGE_FIRST_DAY_LABEL = '第一天站上所有均線';
        static readonly INVESTMENT_TRUST_SELL_TO_BUY_LABEL = '投信由賣轉買超';
    }

    export class stockAiChooseValue {
        static readonly BELOW_AVERAGE_THREE_DAYS_VALUE = 'type_01';
        static readonly ABOVE_MOVING_AVERAGE_FIRST_DAY_VALUE = 'type_02';
        static readonly INVESTMENT_TRUST_SELL_TO_BUY_VALUE = 'type_03';
    }

}