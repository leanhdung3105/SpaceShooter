import { _decorator, Component, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    @property
    speed: number = 800; 

    start() {
        // 1. Lấy component Collider2D đang gắn trên viên đạn
        let collider = this.getComponent(Collider2D);
        if (collider) {
            // 2. Lắng nghe sự kiện "Bắt đầu chạm vào thứ khác"
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    // Hàm này sẽ tự động chạy khi viên đạn chạm vào một khung Collider khác
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        
        if (otherCollider.node.getComponent('Enemy')) {
            
            // CÁCH SỬA LỖI: Bọc lệnh destroy() vào trong scheduleOnce để delay sang frame sau
            this.scheduleOnce(() => {
                
                // Kiểm tra xem node có còn tồn tại không trước khi xóa 
                // (Tránh lỗi 2 viên đạn cùng bắn trúng 1 thiên thạch ở cùng 1 lúc)
                if (otherCollider.node && otherCollider.node.isValid) {
                    otherCollider.node.destroy();
                }
                
                if (this.node && this.node.isValid) {
                    this.node.destroy();
                }
                
            }, 0); 
            
        }
    }

    update(deltaTime: number) {
        let currentPos = this.node.position;
        let newPosY = currentPos.y + this.speed * deltaTime;
        this.node.setPosition(currentPos.x, newPosY, currentPos.z);

        if (newPosY > 700) {
            this.node.destroy();
        }
    }
}