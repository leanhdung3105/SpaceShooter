import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {
    @property
    speed: number = 300; // Tốc độ rơi

    update(deltaTime: number) {
        let currentPos = this.node.position;
        
        // Trừ tọa độ Y để rơi xuống
        let newPosY = currentPos.y - this.speed * deltaTime; 
        
        this.node.setPosition(currentPos.x, newPosY, currentPos.z);

        // Nếu rơi quá mép dưới màn hình (y < -800) thì tự tiêu hủy để nhẹ máy
        if (newPosY < -800) {
            this.node.destroy();
        }
    }
}