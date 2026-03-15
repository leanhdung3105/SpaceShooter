import { _decorator, Component, input, Input, EventTouch, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

    // Khai báo một lỗ cắm để lát nữa kéo thả khuôn đúc (Prefab) vào
    @property({type: Prefab})
    bulletPrefab: Prefab | null = null; 

    @property
    shootInterval: number = 0.2; // Tốc độ xả đạn: 0.2 giây / viên

    start() {
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        
        // Dùng hàm schedule của Cocos để gọi hàm bắn đạn lặp đi lặp lại
        this.schedule(this.shoot, this.shootInterval);
    }

    onDestroy() {
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.unschedule(this.shoot); // Hủy bắn khi tàu bị nổ
    }

    onTouchMove(event: EventTouch) {
        const touchDelta = event.getDelta();
        const currentPos = this.node.position;
        const newPosX = currentPos.x + touchDelta.x;
        const newPosY = currentPos.y + touchDelta.y;
        this.node.setPosition(newPosX, newPosY, currentPos.z);
    }

    shoot() {
        if (!this.bulletPrefab) return; // Tránh lỗi nếu bạn quên kéo Prefab vào

        // 1. Dùng lệnh instantiate để đúc ra 1 viên đạn từ khuôn
        let bullet = instantiate(this.bulletPrefab);
        
        // 2. Thêm viên đạn vào Scene (Cho nó làm con của node Canvas)
        this.node.parent!.addChild(bullet); 

        // 3. Đặt vị trí viên đạn xuất phát từ mũi tàu
        let playerPos = this.node.position;
        // Cộng thêm 50px vào trục Y để đạn chui ra từ mũi phi thuyền chứ không phải từ giữa bụng
        bullet.setPosition(playerPos.x, playerPos.y + 50, playerPos.z);
    }
}