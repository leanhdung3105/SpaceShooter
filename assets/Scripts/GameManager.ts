import { _decorator, Component, Prefab, instantiate, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property({ type: Prefab })
    enemyPrefab: Prefab | null = null;

    @property
    spawnInterval: number = 1.0; // Cứ 1 giây rớt 1 cục thiên thạch

    start() {
        // Dùng schedule để lặp lại việc gọi hàm thả quái
        this.schedule(this.spawnEnemy, this.spawnInterval);
    }

    spawnEnemy() {
        if (!this.enemyPrefab) return;

        // 1. Tạo ra kẻ địch từ Prefab
        let enemy = instantiate(this.enemyPrefab);
        
        // 2. Thêm kẻ địch vào Canvas (this.node chính là GameManager, mà GameManager nằm trong Canvas nên ta add thẳng vào đây)
        this.node.addChild(enemy);

        // 3. Random vị trí xuất hiện trên trục X
        // Màn hình rộng 720, gốc tọa độ ở giữa. Suy ra mép trái là -360, mép phải là 360.
        // Ta random từ -300 đến 300 để thiên thạch không bị sát lề quá.
        let randomX = Math.random() * 600 - 300; 
        
        // 4. Đặt vị trí xuất phát tít trên mép trên màn hình (Y = 800)
        enemy.setPosition(randomX, 800, 0);
    }
}