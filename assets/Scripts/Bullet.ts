import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    @property
    speed: number = 800; // Tốc độ bay (pixel/giây)

    update(deltaTime: number) {
        // 1. Lấy tọa độ hiện tại
        let currentPos = this.node.position;
        
        // 2. Tính tọa độ Y mới: y_mới = y_cũ + (vận tốc * thời gian của 1 frame)
        let newPosY = currentPos.y + this.speed * deltaTime;
        
        // 3. Cập nhật vị trí mới
        this.node.setPosition(currentPos.x, newPosY, currentPos.z);

        // 4. Dọn rác (Cực kỳ quan trọng): Nếu đạn bay ra khỏi mép trên màn hình (y > 700) thì xóa nó đi
        if (newPosY > 700) {
            this.node.destroy();
        }
    }
}