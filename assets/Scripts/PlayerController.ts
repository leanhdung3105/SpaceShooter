import { _decorator, Component, input, Input, EventTouch, Prefab, instantiate, Collider2D, Contact2DType, IPhysics2DContact, director,PhysicsSystem2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

    @property({type: Prefab})
    bulletPrefab: Prefab | null = null; 

    @property
    shootInterval: number = 0.2; 

    start() {
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.schedule(this.shoot, this.shootInterval);

        // 1. Lấy component Collider2D của phi thuyền
        let collider = this.getComponent(Collider2D);
        if (collider) {
            // 2. Lắng nghe sự kiện va chạm
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onDestroy() {
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.unschedule(this.shoot); 
    }

    onTouchMove(event: EventTouch) {
        const touchDelta = event.getDelta();
        const currentPos = this.node.position;
        const newPosX = currentPos.x + touchDelta.x;
        const newPosY = currentPos.y + touchDelta.y;
        this.node.setPosition(newPosX, newPosY, currentPos.z);
    }

    shoot() {
        if (!this.bulletPrefab) return; 

        let bullet = instantiate(this.bulletPrefab);
        this.node.parent!.addChild(bullet); 

        let playerPos = this.node.position;
        bullet.setPosition(playerPos.x, playerPos.y + 50, playerPos.z);
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        
        if (otherCollider.node.getComponent('Enemy')) {
            console.log("💥 TÀU BỊ TRÚNG THIÊN THẠCH! GAME OVER 💥");

            this.scheduleOnce(() => {
                if (this.node && this.node.isValid) {
                    
                    // Thêm dòng này để tắt hệ thống rơi của thiên thạch và đạn
                    PhysicsSystem2D.instance.enable = false;

                    director.pause();
                    this.node.active = false; 
                }
            }, 0);
        }
    }
}