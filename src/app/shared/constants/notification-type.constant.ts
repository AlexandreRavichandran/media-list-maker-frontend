export class NotificationTypeConstant {
    public static SUCCESS = {
        type: 1,
        backgroundColor: '#22BB33'
    }

    public static ERROR = {
        type: 2,
        backgroundColor: '#BB2124'
    }

    public static getColorByType(type: number): string {

        switch (type) {
            case NotificationTypeConstant.SUCCESS.type:
                return NotificationTypeConstant.SUCCESS.backgroundColor;

            case NotificationTypeConstant.ERROR.type:
                return NotificationTypeConstant.ERROR.backgroundColor;

            default:
                return '#CCCCCC';
        }

    }
}