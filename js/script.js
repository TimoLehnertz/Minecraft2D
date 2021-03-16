const keymap = {
    left: ["KeyA", "ArrowLeft"],
    right: ["KeyD", "ArrowRight"],
    down: ["ShiftLeft", "ShiftRight", "KeyS"],
    jumb: ["Space", "KeyW", "ArrowUp"],
    zoomOut: ["KeyZ", "NumpadSubtract"],
    zoomIn: ["KeyX", "NumpadAdd"],
    inventory: ["KeyE"],
    dropItem: ["KeyQ"],
    fly: ["KeyF"],
    hotbar1: ["Digit1"],
    hotbar2: ["Digit2"],
    hotbar3: ["Digit3"],
    hotbar4: ["Digit4"],
    hotbar5: ["Digit5"],
    hotbar6: ["Digit6"],
    hotbar7: ["Digit7"],
    hotbar8: ["Digit8"],
    hotbar9: ["Digit9"],
};

function keyPressed(name, keyStatus){
    let pressed = false;
    for (const key of keymap[name]) {
        if(key in keyStatus){
            pressed |= keyStatus[key];
        }
    }
    return pressed;
}

$(function() {

    // console.log(    0      /   1 -             10 /          1);
    // console.log(box.top /    vel.y -    this.bottom /   vel.y);

    const a = new Hitbox(0, 51.5, 1, 2);
    const b = new Hitbox(0, 50,   1, 1);


    const drawer = new Drawer($("#canvas"), $(".textures"));


    window.setTimeout(() => {
        const game = new Game(drawer);
    }, 100);

    $('canvas').bind('contextmenu', e => false);
});

class Noise {

    static seed = Math.random();

    constructor(seed){
        this.seed = seed
        // this.simplex = 
    }

    static noise(x, y){
        noise.seed(Noise.seed);
        return noise.simplex2(x, y);
    }
}

class ItemFrame extends Panel {

    constructor(x = 0, y = 0, width = 100, height = 100, color = "white", inventory){
        // console.log(inventory)
        // if(inventory === un)
        super(x, y, width, height, color);
        this.inventory = inventory;
        this.standartColor = color;
        this.active = false;
        this.item = undefined;
        this.canItemBePlacedHere = true;
        this.onchange = () => false;
        this.ontake = () => false;

        if(Math.random() < 0.1){
            this.holdItem(new DiamondPickaxe());
        }
        if(Math.random() < 0.1){
            this.holdItem(new DiamondAxe());
        }

        if(Math.random() > 0.9){
            this.holdItem(new DiamondShovel());
            // this.item.stack = 20
        }
        if(Math.random() < 0.1){
            this.holdItem(new Cobblestone());
            this.item.stack = 64;
        }
    }

    draw(drawer, x = 0, y = 0){
        if(this.item){
            this.item.width = this.width;
            this.item.height = this.height;
        }
        if(this.mouseInside && this.inventory.opened){
            this.color = "#555"
        } else{
            this.color = this.standartColor;
        }
        super.draw(drawer, x, y);
        if(this.active){
            const offset = 4;
            drawer.draw("atlas", this.globalX - offset, this.globalY - offset, this.width + offset * 2, this.height + offset * 2, textureAtlasMap.activeFrame.x * tileWidth, textureAtlasMap.activeFrame.y * tileWidth, textureAtlasMap.activeFrame.width * tileWidth, textureAtlasMap.activeFrame.height * tileWidth);
        }
    }

    mousemove(e) {
        
    }

    mousedown(e){
        this.inventory.itemFrameClicked(this, e.button);
        this.onchange();
    }

    keydown(e, keys){
        if(keyPressed("dropItem", keys)) {
            const amount = e.originalEvent.ctrlKey ? 100000 : 1;
            this.inventory.dropItem(this.item, amount)
        }
    }

    canTakeItemPartly(item){
        if(!this.canItemBePlacedHere){
            return false;
        }
        if(!this.item) {
            return false;
        }
        return this.item.isStackableWith(item);
    }

    decrease(amount){
        if(!this.item){
            return;
        }
        this.item.stack -= amount;
        if(this.item.stack <= 0){
            this.holdItem(null);
        }
    }

    canTakeItem(item){
        if(!this.canItemBePlacedHere){
            return false;
        }
        if(!this.item){
            return true;
        }
        return this.item.isStackableWith(item) && this.item.stack + item.stack < this.item.maxStack;
    }
    /**
     * takes an item keeps as much of it as it can and retur the rest or whole content to be grabbed again
     */
    takeItem(item){
        if(!this.canItemBePlacedHere){
            if(item){
                return item;
            } else {
                this.onchange();
                this.ontake(this.item.stack);
                console.log("take: " + this.item.stack)
                return this.item;
            }
        }
        const previousItem = this.item;
        if(this.item){
            if(this.item.isStackableWith(item)){
                this.onchange();
                return this.item.stackItem(item);
            } else {
                this.holdItem(item);
                this.onchange();
                return previousItem;
            }
        } else if(item) {
            this.holdItem(item);
        } else {
            this.holdItem(null);
            this.onchange();
            return previousItem;
        }
        this.onchange();
    }

    takeItemKeepOwn(item){
        if(!this.canItemBePlacedHere){
            return item;
        }
        if(this.item){
            if(this.item.isStackableWith(item)){
                return this.item.stackItem(item);
            } else {
                return item;
            }
        }
        return item;
    }

    getItem(){
        const item = this.item;
        this.holdItem(null);
        return item;
    }

    holdItem(item){
        this.remove(this.item);
        this.item = item;
        if(item !== undefined && item !== null){
            item.x = 0;
            item.y = 0;
            this.add(item);
        }
        this.onchange();
    }

    getHalf(){
        if(this.item){
            const amount = Math.ceil(this.item.stack / 2);
            this.item.stack -= amount;
            const half = this.item.clone();
            // half.width = this.item.width;
            // half.height = this.item.height;
            half.stack = amount;

            if(this.item.stack === 0){
                this.holdItem(null);
            }
            this.ontake(amount);
            return half;
        }
    }
}

class CraftingFrame extends Panel {

    constructor(maxSize, frameSize, frameMargin, inventory){
        super(250, 50, 300, 200, "#0000");

        this.border = false;
        this.maxScale = maxSize;
        this.frameSize = frameSize;
        this.frameMargin = frameMargin;
        this.inventory = inventory;

        this.resultFrame = new ItemFrame(frameSize * 4, frameSize * 1.1, frameSize, frameSize, "#999", inventory);
        this.resultFrame.canItemBePlacedHere = false;
        this.resultFrame.holdItem(null);
        this.add(this.resultFrame);

        this.craftingFrames = [];
        this.crafted = 0;

        for (let y = 0; y < this.maxScale; y++) {
            this.craftingFrames[y] = [];
            for (let x = 0; x < this.maxScale; x++) {
                const craftFrame = new ItemFrame(x * (frameSize + frameMargin), y * (frameSize + frameMargin), frameSize, frameSize, "#999", inventory);
                craftFrame.holdItem(null);
                craftFrame.onchange = () => {this.update()};
                this.add(craftFrame);
                this.craftingFrames[y][x] = craftFrame;
            }
        }

        this.resultFrame.ontake = (taken) => this.decreaseIngredients(Math.min(this.crafted, taken));
    }
    
    getIngredients() {
        const ingredients = [];
        for (let y = 0; y < this.craftingFrames.length; y++) {
            for (let x = 0; x < this.craftingFrames.length; x++) {
                if(ingredients[x] == undefined){
                    ingredients[x] = [];
                }
                ingredients[x][y] = this.craftingFrames[x][y].item?.name;
            }
        }
        return ingredients;
    }

    getMinAmount(){
        let min = 100000;
        for (const row of this.craftingFrames) {
            for (const frame of row) {
                if(!frame.item){
                    continue;
                }
                min = Math.min(min, frame.item.stack);
            }
        }
        return min;
    }

    decreaseIngredients(amount){
        for (const row of this.craftingFrames) {
            for (const frame of row) {
                frame.decrease(amount);
            }
        }
    }

    update() {
        window.setTimeout(() => {
            // console.log("update")
            const craftingResult = Item.craft(this.getIngredients());
            if(craftingResult){
                const amount = Math.min(craftingResult.maxStack, this.getMinAmount());
                craftingResult.stack = amount;
                this.resultFrame.holdItem(craftingResult);
                this.crafted = amount;
            } else{
                this.resultFrame.holdItem(null);
            }
        }, 0);
    }
}

class Inventory extends Panel {

    static allInventories = [];

    constructor(entity){
        super();
        this.entity = entity;
        /**
         * specific
         */
        this.opened = false;

        /**
         * ui
         */
        this.width = 600;
        this.height = 600;
        this.padding = 20;
        this.centered = true;
        this.color = "#AAAA";
        this.border = true;
        this.borderColor = "#444";
        this.useCrafting = true;
        this.maxCraftingSize = 3;
        this.craftingSize = 2;

        this.itemRows = [];

        this.activeIndex = 0;


        this.rows = 4;
        this.cols = 9;
        this.itemMargin = 5;
        this.grabbedItem = null;

        const rowWidth = this.innerWidth;
        const itemWidth = (rowWidth - (this.cols - 1) * this.itemMargin * 1) / this.cols;

        for (let row = 0; row < this.rows; row++) {
            /**
             * row
             */
            
            const itemRow = new Panel(0, this.innerHeight - (row + 2.3) * (itemWidth + this.itemMargin), rowWidth, itemWidth, "#0000");
            itemRow.border = false;
            /**
             * column
             */
            for (let i = 0; i < this.cols; i++) {
                const itemFrame = new ItemFrame(i * (itemWidth + this.itemMargin), 0, itemWidth, itemWidth, "#999", this);
                itemRow.add(itemFrame);
            }

            this.itemRows.push(itemRow);
            this.add(itemRow);
            if(row === this.rows - 1){
                this.hotbar = itemRow;
                itemRow.y = this.innerHeight - itemWidth * 1;
            }
        }

        /**
         * crafting frame
         */
        this.add(new CraftingFrame(3, itemWidth, this.itemMargin, this));

        this.hotbar.children[0].active = true;
        this.entity.holdItem(this.hotbar.children[0].item);



        Inventory.allInventories.push(this);
    }

    destroyItem(item){
        for (const itemRow of this.itemRows) {
            for (const itemFrame of itemRow.children) {
                if(itemFrame.item === item){
                    itemFrame.holdItem(null);
                    return;
                }
            }
        }
    }

    static drawAll(drawer, elapsed){
        for (const inventory of Inventory.allInventories) {
            inventory.draw(drawer, elapsed)
        }
    }

    static closeAll(){
        for (const inventory of Inventory.allInventories) {
            inventory.opened = false;
        }
    }

   open(){
        Inventory.closeAll();
        this.opened = true;
   }

   close(){
        this.opened = false;
        this.dropItem(this.grabbedItem, 100000);
        this.remove(this.grabbedaItem);
        this.grabbedItem = null;
   }

   toggle(){
       if(this.opened){
           this.close();
       } else {
        this.open();
       }
   }

    draw(drawer, elapsed){
        this.visible = this.opened;

        if(this.opened){
            if(this.grabbedItem && this.mouse !== undefined){
                this.grabbedItem.x = this.mouse.innerX - 30;
                this.grabbedItem.y = this.mouse.innerY - 30;
            }
        } else {
            const screen = drawer.screen;
            this.hotbar.draw(drawer, screen.width / 2 - this.hotbar.width / 2, (screen.height - this.hotbar.height - 20) - this.hotbar.y);
        }
        super.draw(drawer);
    }

    mousemove(e, parsedMouse) {
        this.mouse = parsedMouse;
    }

    itemFrameClicked(frame, button){
        if(!this.opened){
            return;
        }
        if(button === Panel.LEFT_CLICK){
            this.remove(this.grabbedItem);
            this.grabbedItem = frame.takeItem(this.grabbedItem);
            this.add(this.grabbedItem);
        } else if(button === Panel.RIGHT_CLICK && frame.canItemBePlacedHere){
            if(this.grabbedItem) {//grabbing
                if(frame.canTakeItem(this.grabbedItem)){
                    const droplet = this.grabbedItem.clone();
                    droplet.stack = 1;
                    this.grabbedItem.stack--;
                    frame.takeItem(droplet);
                    if(this.grabbedItem.stack === 0){
                        this.remove(this.grabbedItem);
                        this.grabbedItem = null;
                    }
                } else{
                    this.remove(this.grabbedItem);
                    const newGrabber = frame.getItem();
                    frame.takeItem(this.grabbedItem);
                    this.grabbedItem = newGrabber;
                }
                this.remove(this.grabbedItem);

            } else{//not yet grabbing
                this.grabbedItem = frame.getHalf();
            }
            this.add(this.grabbedItem);
        }
    }

    dropItem(item, amount = 1){
        if(!item){
            return;
        }

        const drop = item.clone();
        drop.stack = Math.min(amount, item.stack);

        item.stack -= amount;
        if(item.stack <= 0){
            this.destroyItem(item);
        }

        const droppedItem = new DroppedItem(drop, this.entity.pos.x, this.entity.pos.y, this.entity.game, 1300);
        droppedItem.vel.x = -4;
        this.entity.game.spawnEntity(droppedItem);
        return item.stack > 0;
    }

    takeItem(item){
        for (const itemFrame of this.hotbar.children) {
            if(itemFrame.canTakeItemPartly(item)){
                item = itemFrame.takeItemKeepOwn(item);
                // console.log("t");
            }
        }
        if(!item) return;
        for (const itemRow of this.itemRows) {
            for (const itemFrame of itemRow.children) {
                if(itemFrame.canTakeItemPartly(item)){
                    item = itemFrame.takeItemKeepOwn(item);
                }
            }
        }
        if(!item) return;
        for (const itemFrame of this.hotbar.children) {
            if(!itemFrame.item){
                itemFrame.holdItem(item);
                return;
            }
        }
        if(!item) return;
        for (const itemRow of this.itemRows) {
            for (const itemFrame of itemRow.children) {
                if(!itemFrame.item){
                    itemFrame.holdItem(item);
                    return;
                }
            }
        }
    }

    keydown(e, keys){
        if(keyPressed("dropItem", keys)) {
            // this.dropItem(this.grabbedItem);
        }
    }

    wheel(e, up){
        const dir = up ? -1 : 1;
        const index = this.activeIndex + dir;
        if(index < 0){
            this.setActiveHotbar(this.cols - 1)
        } else if(index === this.cols){
            this.setActiveHotbar(0)
        } else {
            this.setActiveHotbar(index);
        }
        
    }

    setActiveHotbar(index) {
        this.hotbar.children[this.activeIndex].active = false;

        this.activeIndex = index;
        this.hotbar.children[index].active = true;
        this.entity.holdItem(this.hotbar.children[index].item);
    }
}

class Entity extends Point {

    constructor(x, y, width, height, texture, textureMeta, hitbox, game, visible = true, hasInventory = false){
        super(x, y);
        this.vel = new Point(0, 0);
        this.width = width;//blocks
        this.height = height;//blocks 
        this.texture = texture;
        this.gravity = 15;
        this.hitbox = hitbox;
        this.hitbox.gPosRef = this.pos;
        this.isGrounded = false;
        this.visible = visible;
        this.textureMeta = textureMeta;
        this.showHitbox = false;
        this.game = game;
        this.hasInventory = hasInventory;
        if(hasInventory){
            this.inventory = new Inventory(this);
        }
    }

    jumb(){
        if(this.isGrounded){
            this.isGrounded = false;
            this.vel.y = 15;
        }
    }

    tick(elapsed, world, keys){
        /**
         * gravity
         */
        if(this.controller){
            this.controller.tick(elapsed, keys, world.game);
        }

        this.vel.add(new Point(0, -this.gravity / elapsed));
        
        this.move(world, elapsed);

        /**
         * friction
         */
        if(this.isGrounded){
            this.vel.multiply(new Point(0.97, 0.97));
        }

        // changex = correctedPos.x - lastPos.x;
        // changey = correctedPos.y - lastPos.y;

        // this.vel.x = changex / (elapsed / 1000);
        // this.vel.y = changey / (elapsed / 1000);

        // this.vel = correctedPos.clone().subtract(lastPos).multiply(new Point(1000 / elapsed, 1000 / elapsed));
    }

    move(world, elapsed){
        
        this.isGrounded = false;

        elapsed = 11;
        const vel = this.vel.clone().multiply(new Point(elapsed / 1000, elapsed / 1000));
        
        const from = this.pos;
        const to = from.clone().add(vel);


        /**
         * getting invloved blocks
         */

        const topLeft = new Point(Math.min(from.x, to.x), Math.max(from.y, to.y)).add(this.hitbox.topLeftLocal);
        const bottomRight = new Point(Math.max(from.x, to.x), Math.min(from.y, to.y)).add(this.hitbox.bottomRightLocal);
        const width = bottomRight.x - topLeft.x;
        const height = topLeft.y - bottomRight.y;

        const hitboxes = world.getHitboxesFromRect(topLeft.x, topLeft.y, width, height);

        let movementX = to.x - from.x;
        let movementY = to.y - from.y;
        const originalMovementX = movementX;
        const originalMovementY = movementY;

        if(this.vel.x < 0) {
            hitboxes.reverse();
        }

        for (const hitbox of hitboxes) {
            const collision = this.hitbox.willHit(hitbox.hitbox, vel);
            if(!collision){
                continue;
            }
            /**
             * bleedin off speed
             */
            if(collision.vertical){
                this.isGrounded = true;
                this.vel.y = 0;
            } else {
                if(hitbox.pos.y > this.pos.y + 2 || !this.isGrounded){
                    this.vel.x = 0;
                }
            }
            if(originalMovementX > 0){
                movementX = Math.min(movementX, collision.changeX);
            } else if(originalMovementX < 0){
                movementX = Math.max(movementX, collision.changeX);
            }
            if(originalMovementY > 0){
                movementY = Math.min(movementY, collision.changeY);
            } else if(originalMovementY < 0){
                movementY = Math.max(movementY, collision.changeY);
            }
        }

        /**
         * moving
         */
        this.pos.add(new Point(movementX, movementY));


        /**
         * falloff
         */
        const fallof = 1.01;
        this.vel.multiply(new Point(1 / fallof, 1 / fallof));//half every 100ms
    }

    draw(drawer, camera){
        if(!this.visible){
            return;
        }
        // console.log();
        const screen = camera.worldToScreen(this.pos, drawer.screen);
        drawer.draw(this.texture, screen.pos.x, screen.pos.y, screen.size * this.width, screen.size * this.height,
            this.textureMeta.x * tileWidth, this.textureMeta.y * tileWidth, this.textureMeta.width * tileWidth, this.textureMeta.height * tileWidth);

        if(this.showHitbox){
            const start = camera.worldToScreen(this.hitbox.topLeft, drawer.screen);
            drawer.rect(start.pos.x, start.pos.y, this.hitbox.width * start.size, this.hitbox.height * start.size);
        }
        /**
         * hand
         */
        if(this.handItem){
            const point = camera.worldToScreen(this.pos.clone().add(new Point(0.62, -0.8)), drawer.screen);
            this.handItem.width = point.size * 0.65;
            this.handItem.height = point.size * 0.65;
            this.handItem.draw(drawer, point.pos.x, point.pos.y);
        }
    }

    holdItem(item) {
        this.handItem = item;
        if(!item){
            return;
        }
        // this.handItem = item;
        item.x = 0;
        item.y = 0;
    }

    die() {
        console.log("I died :/");
        this.game.world.entities.splice(this.game.world.entities.indexOf(this), 1);
    }
}

class Hitbox {

    constructor(x, y, width, height){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.gPosRef = new Point();
    }

    get pos(){
        return new Point(this.x, this.y);
    }

    get topLeft(){
        return new Point(this.gPosRef.x + this.x, this.gPosRef.y + this.y);
    }

    get topRight(){
        return new Point(this.gPosRef.x + this.x + this.width, this.gPosRef.y - this.y);
    }

    get bottomLeft(){
        return new Point(this.gPosRef.x + this.x, this.gPosRef.y - this.y - this.height);
    }

    get bottomRight(){
        return new Point(this.gPosRef.x + this.x + this.width, this.gPosRef.y + this.y + this.height);
    }

    /**
     * local
     */
    get bottomRightLocal(){
        return new Point(this.x + this.width, this.y - this.height);
    }

    get topLeftLocal(){
        return new Point(this.x, this.y);
    }


    get center(){
        return new Point(this.gPosRef.x + this.width / 2, this.gPosRef.y - this.height / 2);
    }

    get bottom(){
        return this.gPosRef.y + this.y - this.height;
    }

    get top(){
        return this.gPosRef.y + this.y;
    }

    get right(){
        return this.gPosRef.x + this.x + this.width;
    }

    get left(){
        return this.gPosRef.x + this.x;
    }

    static UP = 0;
    static RIGHT = 1;
    static DOWN = 2;
    static LEFT = 3;

    /**
     * improvement: check for collision in only one dimension: first check x than y
     */
    willHit(box, vel) {
        const collisionMargin = 0.015;
        /**
         * figuring out when it will hit
         */
        //box.top = this.bottom + vel.y * x         =>      box.xtop / vel.y - this.bottom / vel.y = * x
        const testTimes = [];

        if(!this.intersects(box)) {
            testTimes[Hitbox.UP] = box.top / vel.y - this.bottom / vel.y
            testTimes[Hitbox.DOWN] = box.bottom / vel.y - this.top / vel.y
            testTimes[Hitbox.LEFT] = box.left / vel.x - this.right / vel.x
            testTimes[Hitbox.RIGHT] = box.right / vel.x - this.left / vel.x

            const times = [];
            for (let i = 0; i < testTimes.length; i++) {
                if(isNaN(testTimes[i])){
                    testTimes[i] = 0;
                }
                if(testTimes[i] > 0 && testTimes[i] < 1){
                    times.push(testTimes[i]);
                }
            }
            if(times.length > 0){
                times.sort();
            }
            for (const time of times) {
                if(this.intersectsAfter(box, vel, time + 0.01)){
                    const dir = testTimes.indexOf(time);
                    let changeX = vel.x;
                    let changeY= vel.y;
                    switch(dir){
                        case Hitbox.UP: changeY= vel.y * time; break;
                        case Hitbox.RIGHT: changeX = vel.x * time; break;
                        case Hitbox.DOWN: changeY= vel.y * time; break;
                        case Hitbox.LEFT: changeX = vel.x * time; break;
                    }
                    const vertical = dir === Hitbox.UP || dir === Hitbox.DOWN;
                    if(vertical){
                        changeY += collisionMargin * (vel.y < 0 ? 1 : -1);
                    } else {
                        changeX += collisionMargin * (vel.x < 0 ? 1 : -1);
                    }
                    return {
                        dir,
                        vertical: dir === Hitbox.UP || dir === Hitbox.DOWN,
                        time,
                        changeX: changeX,
                        changeY: changeY
                    };
                }
            }
        }
    }

    intersectsAfter(hitbox2, vel, time){
        if(!hitbox2){
            return false;
        }
        const pos = this.pos.clone().add(this.gPosRef).add(vel.clone().multiply(new Point(time, time)));

        return pos.x <= hitbox2.gPosRef.x + hitbox2.x + hitbox2.width &&
        pos.x + this.width >= hitbox2.gPosRef.x + hitbox2.x &&
        pos.y >= hitbox2.y + hitbox2.gPosRef.y - hitbox2.height &&
        pos.y - this.height <= hitbox2.gPosRef.y + hitbox2.y;
    }

    get globalRect(){
        return {
            x: this.x + this.gPosRef.x,
            y: this.y + this.gPosRef.y,
            width: this.width,
            height: this.height,
        }
    }

    intersects(hitbox2){
        if(!hitbox2) return false
        const rect1 = this.globalRect;
        const rect2 = hitbox2.globalRect;

        return  rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y > rect2.y - rect2.height &&
                rect1.y - rect1.height < rect2.y;
    }

    pointInMe(gp){
        return  gp.x >= this.x + this.gPosRef.x && gp.x <= this.x + this.gPosRef.x + this.width &&
                gp.y <= this.y + this.gPosRef.y && gp.y >= this.y + this.gPosRef.y - this.height;
    }
}


class Player extends Entity {

    constructor(game, x = 0, y = 53     , texture = "steve",  hitbox = new Hitbox(0.1, -0.2, 0.8, 1.8)){
        super(x, y, 1, 2, texture, textureAtlasMap.steve, hitbox, game, true, true);
        this.controller = new KeyboardController(this);
        this.leftMouseDown = false;
        this.rightMouseDown = false;
        this.isPlayer = true;
    }

    keydown(e, keyStatus) {
        if(keyPressed("inventory", keyStatus)){
            this.inventory.toggle();
            this.controller.active = !this.inventory.opened;
        }
        if(keyPressed("dropItem", keyStatus)) {
            const amount = e.originalEvent.ctrlKey ? 100000 : 1;
            if(!this.inventory.dropItem(this.handItem, amount)){
                this.handItem = null;
            }
        }
        if(keyPressed("hotbar1", keyStatus)){
            this.inventory.setActiveHotbar(0);
        }
        if(keyPressed("hotbar2", keyStatus)){
            this.inventory.setActiveHotbar(1);
        }
        if(keyPressed("hotbar3", keyStatus)){
            this.inventory.setActiveHotbar(2);
        }
        if(keyPressed("hotbar4", keyStatus)){
            this.inventory.setActiveHotbar(3);
        }
        if(keyPressed("hotbar5", keyStatus)){
            this.inventory.setActiveHotbar(4);
        }
        if(keyPressed("hotbar6", keyStatus)){
            this.inventory.setActiveHotbar(5);
        }
        if(keyPressed("hotbar7", keyStatus)){
            this.inventory.setActiveHotbar(6);
        }
        if(keyPressed("hotbar8", keyStatus)){
            this.inventory.setActiveHotbar(7);
        }
        if(keyPressed("hotbar9", keyStatus)){
            this.inventory.setActiveHotbar(8);
        }
    }

    mousedown(e){
        if(e.originalEvent.button === Panel.LEFT_CLICK){
            this.leftMouseDown = true;
        }
        if(e.originalEvent.button === Panel.RIGHT_CLICK){
            this.rightMouseDown = true;
        }
    }

    mouseup(e){
        if(e.originalEvent.button === Panel.LEFT_CLICK){
            this.leftMouseDown = false;
        }
        if(e.originalEvent.button === Panel.RIGHT_CLICK){
            this.rightMouseDown = false;
        }
    }

    tick(elapsed, world, keys, time){
        this.playerControlls(elapsed, time, keys);
        super.tick(elapsed, world, keys);//should be last as it checks collisions and controller can move unchecked
    }

    playerControlls(elapsed, time, keys){
        if(this.leftMouseDown && this.game.hoverBlocks){
            this.game.hoverBlocks?.[0]?.hit(elapsed, this.handItem);
        }
        if(this.rightMouseDown){
            this.buildBlock();
        }
        
    }

    buildBlock(){
        if(this.game.buildBlock(this.handItem)){
            this.handItem.stack--;
            if(this.handItem.stack === 0){
                this.inventory.destroyItem(this.handItem);
                this.handItem = 0;
            }
        }
    }

    entityCollided(collider){
        if(collider.isCollectible && collider.canITakeYou(this)){
            this.inventory.takeItem(collider.item);
            collider.die();
        }
    }
}

class Game {

    constructor(drawer, camera = new Camera()){
        this.world = new World(this);
        this.drawer = drawer;
        this.camera = camera;
        this.lastUpdate = 0;
        this.keyStatus = {};
        this.mousePressed = false;
        this.debug = true;
        this.init();
        this.playerReach = 5;
        this.inputEventListener = [];
        this.fps = [];

        this.time = 0;

        this.initPlayer(this.world.entities[0]);
    }

    initPlayer(player){
        this.activePlayer = player;
        this.camera.target = this.activePlayer;
        this.inputEventListener.push(this.activePlayer);
        this.inputEventListener.push(this.activePlayer.inventory);
    }

    init(){
        this.initEvents();
        window.requestAnimationFrame((e) => {this.update(e)});
    }

    initEvents(){
        $(this.drawer.ctx.canvas).focus();
        $(this.drawer.ctx.canvas).keydown((e) => {this.keydown(e)});
        $(this.drawer.ctx.canvas).keyup((e) => {this.keyup(e)});
        $(this.drawer.ctx.canvas).mousemove((e) => {this.mousemove(e)});
        $(this.drawer.ctx.canvas).mousedown((e) => {this.mousedown(e)});
        $(this.drawer.ctx.canvas).mouseup((e) => {this.mouseup(e)});
        $(this.drawer.ctx.canvas).on("wheel", (e) => {this.wheel(e)});
    }

    callInputEvent(name, event){
        for (const listener of this.inputEventListener) {
            let redirect = false;
            if(name + "1" in listener){
                redirect = listener[name + "1"](event, this.keyStatus);
            }
            if(!redirect){
                if(name in listener){
                    redirect = listener[name](event, this.keyStatus);
                }
            }
        }
    }

    wheel(e){
        this.callInputEvent("wheel", e);
    }

    keydown(e){
        this.keyStatus[e.code] = true;
        this.callInputEvent("keydown", e);

        if(keyPressed("zoomOut", this.keyStatus)){
            this.camera.scale += 2;
        }
        if(keyPressed("zoomIn", this.keyStatus)){
            this.camera.scale -= 2;
        }
        this.camera.scale = Math.max(this.camera.minScale, Math.min(this.camera.scale, this.camera.maxScale));
    }

    keyup(e){
        this.keyStatus[e.code] = false;
        this.callInputEvent("keyup", e);
    }

    mousemove(e){
        this.mouse = e;
        this.callInputEvent("mousemove", e);
    }

    mousedown(e){
        this.mousePressed = true;
        this.callInputEvent("mousedown", e);
    }

    mouseup(e){
        this.mousePressed = false;
        this.callInputEvent("mouseup", e);
    }

    update(time){
        this.time = time;
        const elapsed = Math.min(500, time - this.lastUpdate);
        
        if(time % 1000 < elapsed * 1.5){
        }

        /**
         * update
         */
        this.camera.tick(elapsed);
        this.world.tick(elapsed, time, this.keyStatus);

        /**
         * drawing
         */
        this.draw(elapsed);
        

        /**
         * loop
         */
        this.lastUpdate = time;
        window.requestAnimationFrame((e) => {this.update(e)});
    }

    draw(elapsed){
        this.drawer.clear();
        /**
         * world
         */
        this.world.draw(this.drawer, this.camera);
        /**
         * overlays
         */
        this.drawOverlays();
        Inventory.drawAll(this.drawer, elapsed);

        if(this.debug){
           this.drawDebug(elapsed);
        }
    }

    drawOverlays(){
        if(this.activePlayer.inventory.opened){
            return;
        }
        const cursor = this.cursor;
        if(cursor){
            const hoverBlocks = this.world.getBlock(cursor.x, cursor.y);
            if(hoverBlocks && hoverBlocks[0]){
                this.hoverBlocks = hoverBlocks;
            }
            const canhover = this.world.canBlockBeplacedHere(cursor.x, cursor.y);
            if(canhover){
                const pos = this.camera.worldToScreen(new Point(Math.floor(cursor.x), Math.ceil(cursor.y)), this.drawer.screen);
                this.drawer.rect(pos.pos.x, pos.pos.y, pos.size, pos.size);
            }
        }
    }

    drawDebug(elapsed){
        const fps = Math.round(1000 / elapsed * 1);
        this.fps.push(fps);
        if(this.fps.length > 500) {
            this.fps.splice(0, 1);
        }
        this.drawer.text(10, 20, Math.round(1000 / elapsed * 1) / 1 + " fps")
        const cursor = this.cursor;
        if(cursor){
            this.drawer.text(10, 50, "mouse: " + this.mouse.offsetX + " | " + this.mouse.offsetY);
            this.drawer.text(10, 80, "cursor: " + Math.round(cursor.x * 100) /100 + " | " + Math.round(cursor.y * 100) / 100);
            const hoverBlocks = this.world.getBlock(cursor.x, cursor.y);
            if(hoverBlocks){
                let blocks = "";
                for (const block of hoverBlocks) {
                    blocks += ", " + block.name
                }
                if(hoverBlocks[0]){
                    this.drawer.text(10, 110, "block: (" + hoverBlocks[0].pos.x + "|" + hoverBlocks[0].pos.y + ")" + blocks);
                }
            }
        }
        const fpsStartX = 200;
        const fpsStartY = 100;
        for (let i = 0; i < this.fps.length; i++) {
            const fps = this.fps[i];
            let color = "green";
            if(fps < 55){
                color = "red";
            }
            this.drawer.fillRect(fpsStartX + i, fpsStartY - fps, 1, fps, color);
        }
        this.drawer.text(10, 210, "player coordinates: (" + Math.round(this.activePlayer.pos.x) + "|" + Math.round(this.activePlayer.pos.y) + ")");
    }

    get cursor(){
        if(this.mouse == undefined){
            return null;
        }
        const center = this.activePlayer.hitbox.center;
        const mouse = this.camera.screenToWorld(new Point(this.mouse.offsetX, this.mouse.offsetY), this.drawer.screen);
        let distance = mouse.distanceFrom(center);
        distance = Math.min(this.playerReach, distance);

        const coords = center.add(new Point(distance, distance).multiply(mouse.subtract(center).uniform));
        
        return coords;
    }

    buildBlock(block){
        const cursor = this.cursor;
        if(!block || !block.canBePlaced || !cursor){
            return false;
        }
        return this.world.buildBlock(block, cursor.x, cursor.y);
    }

    spawnEntity(entity) {
        return this.world.spawnEntity(entity);
    }
}

class Camera extends Point {

    /**
     * @param {*} x 
     * @param {*} y 
     * @param {*} scale how many blocks will be in view
     */
    constructor(x = 0, y = 70, scale = 30, target){
        super(x, y);
        this.scale = scale;
        this.minScale = 7;
        this.maxScale = 300;
        this.vel = new Point();
        this.target = target;
    }

    get mostLeftBlock() {
        return parseInt(this.x - this.scale / 2 - 5);
    }

    get mostRightBlock() {
        return parseInt(this.x + this.scale / 2 + 5);
    }

    get mostTopBlock() {
        return parseInt(this.y + this.scale / 2 + 5);
    }

    get mostBottomBlock() {
        return parseInt(this.y - this.scale / 2 - 5);
    }

    getVisibleCoords(){
        const startX = Math.floor(this.x - (this.scale / 2));
        const startY = Math.floor(this.y - (this.scale / 2));
        const points = [];
        for (let x = startX; x < startX + this.scale + 1; x+=1){
            for (let y = Math.max(startY, 0); y < startY + this.scale; y+=1){
                points.push(new Point(x, y));
            }
        }
        return points;
    }

    worldToScreen(worldPoint, screen){
        let x = worldPoint.x - this.x + this.scale / 2;
        x *= screen.width / this.scale;

        let y = worldPoint.y - this.y + this.scale / 2;
        y *= -screen.width / this.scale;
        y += screen.height + ((screen.width - screen.height) / 2);
        const size = screen.width / this.scale;
        return {pos: new Point(x, y), size};
    }

    screenToWorld(screenPos, screen){
        let x = this.x - (this.scale / 2) + (screenPos.x * (this.scale / screen.width));
        let y = this.y + (this.scale * (screen.height / screen.width) / 2) - (screenPos.y * (this.scale / screen.width));
        return new Point(x, y);
    }

    tick(){
        this.vel = this.target.hitbox.center.subtract(this.pos).multiply(new Point(0.1, 0.1));
        this.pos.add(this.vel);
    }
}

class Controller {
        
    constructor(entity){
        this.entity = entity;
        this.active = true;
    }
}

class KeyboardController extends Controller {

    constructor(entity){
        super(entity);
    }

    tick(elapsed, keys, game){
        if(!this.active){
            return;
        }
        if(keyPressed("left", keys)){
            this.entity.vel.add(new Point(-12 * (elapsed / 1000)));
        }
        if(keyPressed("right", keys)){
            this.entity.vel.add(new Point(12 * (elapsed / 1000)));
        }
        if(!keyPressed("right", keys) && this.entity.vel.x > 0 && this.entity.isGrounded){
            this.entity.vel.multiply(new Point(0.8, 1));
        }
        if(!keyPressed("left", keys) && this.entity.vel.x < 0 && this.entity.isGrounded){
            this.entity.vel.multiply(new Point(0.8, 1));
        }
        if(keyPressed("down", keys)){
            this.entity.vel.add(new Point(0, -10 * (elapsed / 1000)));
        }
        if(keyPressed("fly", keys)){
            this.entity.vel.add(new Point(0, 1.5));
        }
        if(keyPressed("jumb", keys)){
            this.entity.jumb();
        }
    }
}

class DroppedItemController extends Controller {

    constructor(entity){
        super(entity);
    }

    tick(elapsed, keys, game){
        if(!this.active){
            return;
        }
        if(game.time - this.entity.droppedTime < this.entity.timeout){
            return;
        }
        for (const entity of game.world.entities) {
            if(entity.isPlayer){
                const arrow = entity.pos.clone().subtract(this.entity.pos);
                let distance = arrow.length;
                if(distance < 1.7){
                    this.entity.vel.add(arrow.divide(new Point(0.5, 0.5)));
                }
            }
        }
    }
}

class World{

    constructor(game, width = 10000, height = 256, seed = 1){
        this.game = game;
        this.entities = [];// everything wich is not a block
        this.entities.push(new Player(game));
        this.changedBlocks = [];
        this.width = width;
        this.height = height;
        this.noise = new Noise(seed);

        /**
         * chunks
         */
        this.chunks = [];
        this.loadedChunks = [];
        this.loadedFrom = 0;
        this.loadedToX = 0;
        this.lastFromX = 0;
        this.lastTo = 0;
        this.blockBuffer = 20;//buffer of chunks to left and right from the screen
        this.chunkSize = 32;//width in blocks of a single chunk
        this.maxLoadedColumns = 400; //older chunks will get deleted when this number gets exeeded
        this.lastLoadedChunk = undefined;
        this.idChunk = 0;
    }

    loadChunks(fromX, toX){
        // console.log("loading from " + fromX + " to " + toX);
        // if(fromX > this.lastFromX - this.blockBuffer && toX < this.lastToX + this.blockBuffer){
        //     return;
        // }
        this.lastFromX = fromX;
        this.lastToX = toX;
        fromX = Math.floor(fromX);
        toX = Math.ceil(toX);
        fromX -= this.blockBuffer;
        toX += this.blockBuffer;

        for (let x = fromX; x <= toX; x++) {
            this.loadChunk(x);
        }
    }

    loadChunk(x){
        if(this.loadedChunks.includes(x)){
            return;
        }
        console.log("loading chunk at x=" + x + ", total chunks: " + this.loadedChunks.length);
        this.chunks[World.xToIndex(x)] = [];
        for (let y = 0; y <= this.height; y++) {
            this.chunks[World.xToIndex(x)][y] = this.worldFunction(x, y);
        }
        this.loadedChunks.push(x);
        this.cleanChunks();
    }

    cleanChunks(){
        if(this.loadedChunks.length > this.maxLoadedColumns){
            this.unloadChunk(this.loadedChunks[0]);
        }
    }

    unloadChunk(x){
        if(!this.loadedChunks.includes(x)){
            return;
        }
        console.log("deleting chunk at x=" + x);
        this.chunks[World.xToIndex(x)] = undefined;
        this.loadedChunks.splice(this.loadedChunks.indexOf(x), 1);
    }

    static xToIndex(x){
        if(x >= 0){
            return x * 2;
        } else{
            return x * -2 - 1;
        }
    }

    blockLoaded(x){
        return this.loadedChunks.includes(x);
    }

    columnFromChunks(x){
        if(!this.blockLoaded(x)){
            this.loadChunk(x);
        }
        return this.chunks[World.xToIndex(x)];
    }

    getBlock(x, y){
        x = Math.floor(x);
        y = Math.ceil(y);
        if(this.blockLoaded(x)){
            return this.columnFromChunks(x)[y];
        } else{
            console.log("not loaded")
            // this.loadChunks(x, x);
            // return this.columnFromChunks(x)[y];
        }
    }

    /**
     * @todo slow
     */
    getHitboxesFromRect(x, y, width, height){

        const collisionBuffer = 1;

        let limitX = Math.ceil(x + width);
        let limitY = Math.floor(y - height);
        x = Math.floor(x);
        y = Math.ceil(y);

        x -= collisionBuffer;
        y += collisionBuffer;
        limitX += collisionBuffer;
        limitY -= collisionBuffer;

        const hitboxes =[];

        for (x; x < limitX; x++) {
            for (let y1 = y; y1 > limitY; y1--) {
                const blocks = this.getBlock(x, y1);
                if(blocks && blocks[0] && blocks[0].solid){
                    // blocks[0].border = true;
                    hitboxes.push(blocks[0]);
                }
            }
        }
        return hitboxes;
    }

    buildBlock(block, x, y, layer = 0) {
        if(x > this.height || y < 0) {
            return;
        }
        x = Math.floor(x);
        y = Math.ceil(y);
        

        const prevBlocks = this.getBlock(x, y);

        for (const entity of this.entities) {
            if(entity.hitbox.intersects(prevBlocks?.[0]?.hitbox)){
                return false;
            }
        }

        if(prevBlocks?.[layer]){
            return false;
        }


        if(!this.canBlockBeplacedHere(x, y)){
            return false;
        }

        block = block.clone();
        block.pos.x = x;
        block.pos.y = y;
        block.placed = true;
        block.visible = true;
        block.width = 1;
        block.height = 1;
        block.world = this;

        const column = this.columnFromChunks(x);
        if(column[y] === null){ // air
            column[y] = [];
        }
        column[y][layer] = block;
        this.blockChanged(x, y);
        return true;
    }

    canBlockBeplacedHere(x, y){
        const self = this.getBlock(x, y) ?? [];
        const a = this.getBlock(x - 1, y) ?? [];
        const b = this.getBlock(x, y- 1) ?? [];
        const c = this.getBlock(x + 1, y) ?? [];
        const d = this.getBlock(x, y + 1) ?? [];
        return a[0]?.solid || b[0]?.solid || c[0]?.solid || d[0]?.solid || self[1]
    }

    worldFunction(x, y){
        if(this.changedBlocks[World.xToIndex(x)] !== undefined){
            if(this.changedBlocks[World.xToIndex(x)][y] !== undefined){
                console.log("loading block from mem");
                return this.changedBlocks[World.xToIndex(x)][y];
            }
        }
        const noise = Noise.noise(x / 6, y / 6) / 2 + 0.5;
        const xNoise = Noise.noise(x * 0.03, 0);

        const surfaceLevel = Math.round(50 + xNoise * 10);
        
        const blocks = [];
        
        /**
         * basic
         */
        let blockOnSurface = false;
        blocks[0] = new Stone(x, y, this);
        /**
         * flowers
         */
         const flowers = [
            {
                getBlock: () => new FlowerPink(x, y, this),
                probability: 0.2,
                offset: 0.7
            },
            {
                getBlock: () => new FlowerRed(x, y, this),
                probability: 0.1,
                offset: 0.5
            }
        ];

        if(y === surfaceLevel + 1){
            for (const flower of flowers) {
                if((noise + flower.offset) % 1 < flower.probability){
                    blocks[0] = flower.getBlock();
                    blockOnSurface = true;
                }
            }
        }
        


        
        if(y > surfaceLevel && !blockOnSurface) return null; //air

        /**
         * ores
         */
        const ores = [
            {
                getBlock: () => new CoalOre(x, y, this),
                minHeight: 0,
                maxHeight: 1000,
                probability: 0.15,
                offset: 1
            }, {
                getBlock: () => new IronOre(x, y, this),
                minHeight: 0,
                maxHeight: 1000,
                probability: 0.1,
                offset: 0
            }, {
                getBlock: () => new SmaragdOre(x, y, this),
                minHeight: 0,
                maxHeight: 19,
                probability: 0.001,
                offset: 0.7
            }, {
                getBlock: () => new DiamondOre(x, y, this),
                minHeight: 0,
                maxHeight: 15,
                probability: 0.001,
                offset: 0.4
            }, {
                getBlock: () => new RedstoneOre(x, y, this),
                minHeight: 0,
                maxHeight: 25,
                probability: 0.02,
                offset: 0.3
            }, {
                getBlock: () => new GoldOre(x, y, this),
                minHeight: 0,
                maxHeight: 30,
                probability: 0.01,
                offset: 0.7
            }
        ]

        // console.log(noise);
        for (const ore of ores) {
            if(y < ore.minHeight || y > ore.maxHeight){
                continue;
            }
            if((noise + ore.offset) % 1 < ore.probability){
                blocks[0] = ore.getBlock();
            }
        }

        if(y > surfaceLevel - 7 && !blockOnSurface){
            blocks[0] = new DirtBlock(x, y, this);
        }
        if(y > surfaceLevel - 1 && !blockOnSurface){
            blocks[0] = new GrassBlock(x, y, this);
        }

        /**
         * caves
         */
        let caveNoise1 = Noise.noise(x / 50, y / 25) - 0.5;
        let caveNoise2 = Noise.noise(x / 50, (y + 10) / 25) - 0.7;
        const margin = 0.13
        let cave = false;
        cave = (caveNoise1 > -margin && caveNoise1 < margin) || (caveNoise2 > -margin && caveNoise2 < margin)

        /**
         * bedrock
         */
        if(y < 4){
            const influence = (4 - y) / 4;
            if(noise < influence){
                blocks[0] = new Bedrock(x, y, this);
            }
        } else if(cave){
            return null;
        }

        blocks[0].placed = true;
        return blocks;
    }

    entityOnBlock(entity){
        if(entity.y % 1 === 0){
            return getBlock(entity.x, entity.y)
        }
    }

    tick(elapsed, time, keys){
        /**
         * Entities
         */
        for (const entity of this.entities) {
            entity.tick(elapsed, this, keys, time);
            if("entityCollided" in entity){
                for (const collider of this.entities) {
                    if(collider === entity){
                        continue;
                    }
                    if(collider.hitbox.intersects(entity.hitbox)){
                        entity.entityCollided(collider);
                    }
                }
            }
        }

        /**
         * blocks
         */
        for (const column of this.chunks) {
            if(!column) continue;
            for (const blocks of column) {
                if(!blocks) continue;
                for (const block of blocks) {
                    block.tick(elapsed);
                }
            }
        }
    }

    draw(drawer, camera) {
        /**
         * background
         */
        drawer.fillRect(0, 0, drawer.screen.width, drawer.screen.height, "#333");
        drawer.fillRect(0, 0, drawer.screen.width, camera.worldToScreen(new Point(0, 0), drawer.screen).pos.y, "#55F");
        /**
         * blocks
         */
        this.loadChunks(camera.mostLeftBlock, camera.mostRightBlock);
        for (let x = camera.mostLeftBlock; x < camera.mostRightBlock; x++) {
            const column = this.columnFromChunks(x);
            // console.log(column)
            for (let y = Math.max(0, camera.mostBottomBlock); y < Math.min(this.height, camera.mostTopBlock); y++) {
                if(column[y]){//skip air
                    for (const block of column[y]) {
                        // console.log("drawing")
                        block.draw(drawer, camera);
                    }
                }
            }
        }
        /**
         * entities
         */
        for (const entity of this.entities) {
            entity.draw(drawer, camera);
        }
    }

    spawnEntity(entity){
        this.entities.push(entity);
    }

    destroyBlock(block, layer = 0){
        const column = this.columnFromChunks(block.pos.x);
        column[block.pos.y].splice(layer, 1);
        // column[block.pos.y][layer] = undefined;
        this.blockChanged(block.pos.x, block.pos.y);
    }

    blockChanged(x, y){
        if(!this.blockLoaded(x)){
            return;
        }
        if(this.changedBlocks[World.xToIndex(x)] === undefined){
            this.changedBlocks[World.xToIndex(x)] = [];
        }
        this.changedBlocks[World.xToIndex(x)][y] = this.getBlock(x, y);
    }
}

class DroppedItem extends Entity {

    constructor(item, x, y, game, timeout) {
        super(x - 0.1, y, 0.5, 0.5, item.texture, item.textureMeta, new Hitbox(0,0,0.5, 0.7), game, true, false);
        const randomness = 0.5;
        this.vel.add(new Point(Math.random() * randomness - randomness / 2, Math.random() * randomness - randomness / 2))
        this.droppedTime = game.time;
        this.isCollectible = true;
        this.timeout = timeout;
        this.item = item;
        this.controller = new DroppedItemController(this);
    }

    canITakeYou(player){
        return this.game.time - this.droppedTime > this.timeout;
    }
}

function sortArray(array, field, asc = true){
    const mul = asc ? -1 : 1;
    array.sort((a, b) => {
        if(a[field] === undefined || b[field] === undefined){
            return 0;
        }
        if(b[field] === null && b[field] === null){
            return 0;
        }
        if(b[field] === null){
            return mul;
        }
        if(a[field] === null){
            return -mul;
        }
        if(a[field] < b[field]){
            return -mul;
        } else if(a[field] > b[field]){
            return mul;
        } else{
            return 0
        }
    });
    return array;
}