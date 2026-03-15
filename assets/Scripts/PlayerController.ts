import { _decorator, Component, input, Input, EventTouch, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

    start() {
        // Đăng ký sự kiện vuốt chạm trên toàn màn hình
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    onDestroy() {
        // LUÔN LUÔN nhớ hủy đăng ký sự kiện khi node bị xóa để tránh rò rỉ bộ nhớ
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    onTouchMove(event: EventTouch) {
        // Lấy độ lệch (delta) của ngón tay so với khung hình trước đó
        const touchDelta = event.getDelta();

        // Lấy vị trí hiện tại của phi thuyền
        const currentPos = this.node.position;

        // Tính toán vị trí mới
        const newPosX = currentPos.x + touchDelta.x;
        const newPosY = currentPos.y + touchDelta.y;

        // Cập nhật vị trí mới cho phi thuyền
        this.node.setPosition(newPosX, newPosY, currentPos.z);
    }
}