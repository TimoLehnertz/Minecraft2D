const keymap = {
    left: ["KeyA", "ArrowLeft"],
    right: ["KeyD", "ArrowRight"],
    down: ["ShiftLeft", "ShiftRight", "KeyS"],
    jumb: ["Space", "KeyW", "ArrowUp"],
    zoomOut: ["KeyZ", "NumpadSubtract"],
    zoomIn: ["KeyX", "NumpadAdd"],
    openInventory: ["KeyE"],
    closeInventory: ["KeyE", "Escape"],
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
    stats: ["KeyT"],
    kill: ["KeyK"],
};

function toggleKeys(){
    $(".controlls").toggleClass("minimized");
}

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

    // static seed = Math.round(Math.random() * 100000);
    static seed = 87046;
    // static seed = Math.random();

    constructor(seed){
        this.seed = seed
        // this.simplex = 
    }

    static noise(x, y = 0){
        noise.seed(Noise.seed);
        return noise.simplex2(x, y);
    }
}

class ItemFrame extends Panel {

    constructor(x = 0, y = 0, width = 100, height = 100, inventory, isAddon = false, color = "#777"){
        // console.log(inventory)
        // if(inventory === un)
        super(x, y, width, height, color);
        this.isAddon = isAddon;
        this.inventory = inventory;
        this.standartColor = color;
        this.border = true;
        this.borderColor = "#6663";
        this.active = false;
        this.item = undefined;
        this.canItemBePlacedHere = true;
        this.onchange = () => false;
        this.ontake = () => false;
        this.filterItems = (item) => true;

        // if(Math.random() < 0.1){
        //     this.holdItem(new DiamondPickaxe());
        // }
        // if(Math.random() < 0.1){
        //     this.holdItem(new DiamondAxe());
        // }

        // if(Math.random() > 0.9){
        //     this.holdItem(new DiamondShovel());
        //     // this.item.stack = 20
        // }
        // if(Math.random() < 0.1){
        //     this.holdItem(new Cobblestone());
        //     this.item.stack = 64;
        // }
        // if(Math.random() < 0.1){
        //     const item = new OakLog();
        //     item.stack = 20;
        //     this.holdItem(item);
        // }
        // if(Math.random() < 0.4){
        //     const item = new Torch();
        //     item.stack = 20;
            // this.holdItem(new Steak());
        // }
        if(Math.random() < 0.4){
            // const item = new CraftingTable();
            // this.holdItem(item);
        }
    }

    draw(drawer, x = 0, y = 0, filter = ""){
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
            drawer.draw("atlas", this.globalX - offset, this.globalY - offset, this.width + offset * 2, this.height + offset * 2, textureAtlasMap.activeFrame.x * tileWidth, textureAtlasMap.activeFrame.y * tileWidth, textureAtlasMap.activeFrame.width * tileWidth, textureAtlasMap.activeFrame.height * tileWidth, filter);
        }
    }

    isFull(){
        if(!this.item) return false;
        return this.item.stack >= this.item.maxStack;
    }

    mousedown(e){
        this.inventory.itemFrameClicked(this, e.button, e.shiftKey);
        this.onchange();
    }

    keydown(e, keys){
        if(keyPressed("dropItem", keys)) {
            const amount = e.originalEvent.ctrlKey ? 100000 : 1;
            this.inventory.dropItem(this.item, amount)
        }
    }

    canTakeItemPartly(item){
        if(!this.filterItems(item)){
            return false;
        }
        if(!this.canItemBePlacedHere){
            return false;
        }
        if(!this.item) {
            return false;
        }
        return this.item.isStackableWith(item);
    }

    canTakeItemIgnoreFilters(item){
        // console.log(!this.item)
        if(!this.item) return true;
        if(!item) return false;
        return this.item.isStackableWith(item) && item.stack + this.item.stack <= this.item.maxStack;
    }

    decrease(amount = 1){
        if(!this.item){
            return;
        }
        this.item.stack -= amount;
        if(this.item.stack <= 0){
            this.holdItem(null);
        }
    }

    canTakeItem(item){
        if(!this.filterItems(item)){
            return false;
        }
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
        if(!this.filterItems(item)){
            return item;
        }
        if(!this.canItemBePlacedHere){
            if(item){
                return item;
            } else {
                if(this.item){
                    const amount = this.item.stack;
                    console.log("1");
                    window.setTimeout(() => {this.ontake(amount); console.log("30");}, 0)
                }
                const returnItem = this.item;
                this.holdItem(null);
                this.onchange();
                return returnItem;
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

    takeItemKeepOwn(item) {
        if(!this.canItemBePlacedHere){
            return item;
        }
        if(this.item){
            if(this.item.isStackableWith(item)){
                return this.item.stackItem(item);
            } else {
                return item;
            }
        } else{
            this.holdItem(item);
        }
    }

    getItem(){
        const item = this.item;
        this.holdItem(null);
        return item;
    }

    holdItem(item) {
        if(item) {
            if(!this.filterItems(item)) {
                return item;
            }
        }
        this.remove(this.item);
        this.item = item;
        if(item){
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
            half.width = this.item.width;
            half.height = this.item.height;
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

        this.resultFrame = new ItemFrame(frameSize * 4, frameSize * 1.1, frameSize, frameSize, inventory);
        this.resultFrame.canItemBePlacedHere = false;
        this.resultFrame.holdItem(null);
        this.add(this.resultFrame);

        this.craftingFrames = [];
        this.crafted = 0;

        for (let y = 0; y < this.maxScale; y++) {
            this.craftingFrames[y] = [];
            for (let x = 0; x < this.maxScale; x++) {
                const craftFrame = new ItemFrame(x * (frameSize + frameMargin), y * (frameSize + frameMargin), frameSize, frameSize, inventory);
                craftFrame.holdItem(null);
                craftFrame.onchange = () => {this.update()};
                this.add(craftFrame);
                this.craftingFrames[y][x] = craftFrame;
            }
        }

        this.resultFrame.ontake = (taken) => {this.decreaseIngredients(Math.min(this.crafted, taken)); this.update()};
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
        // window.setTimeout(() => {
            // console.log("update")
            const craftingResult = Item.craft(this.getIngredients());
            if(craftingResult){
                const multiply = craftingResult.stack;
                craftingResult.stack = Math.min(multiply * this.getMinAmount(), craftingResult.maxStack);
                this.resultFrame.holdItem(craftingResult);
                this.crafted = craftingResult.stack / multiply;
            } else{
                this.resultFrame.holdItem(null);
            }
        // }, 0);
    }

    hideAllFrames(){
        for (const row of this.craftingFrames) {
            for (const frame of row) {
                frame.visible = false;
            }
        }
    }

    dropItems(){
        for (const row of this.craftingFrames) {
            for (const frame of row) {
                this.inventory.dropItem(frame.item, 10000);
                frame.holdItem(null);
                // frame.visible = false;
            }
        }
    }

    set size(size){
        this.hideAllFrames();
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                this.craftingFrames[y][x].visible = true;
            }
        }
    }
}

class InventoryAddon extends Panel{

    constructor(){
        super(0, 0, 560, 250, "#0000");
        this.border = false;
        this.frameSize = 10;
    }

    close(){
        this.dropItems();
    }

    dropItems(){
        for (const child of this.children) {
            if(child instanceof ItemFrame) {
                this.inventory?.dropItem(child.item, 10000);
                child.holdItem(null);
            }
        }
    }

    init(frameSize, inventory) {
        this.frameSize = frameSize;
        for (const frame of this.children) {
            if(frame instanceof ItemFrame){
                frame.width = frameSize;
                frame.height = frameSize;
                frame.inventory = inventory;
            }
        }
    }

    takeItem(item){
        return item;
    }
}

class FurnanceInventory extends InventoryAddon {

    constructor(furnance){
        super();
        this.furnance = furnance;

        this.fireFrame = new ItemFrame(200, 140, 100, 100,  null, true);
        this.fireFrame.filterItems = (item) => !item || item?.fuel > 0
        this.fireFrame.holdItem(null);

        this.oreFrame = new ItemFrame(200, 40, 100, 100, null, true);
        this.oreFrame.filterItems = (item) => !item || item?.getFurnanceResult()
        this.oreFrame.holdItem(null);

        this.resultFrame = new ItemFrame(350, 90, 100, 100, null, true);
        this.resultFrame.canItemBePlacedHere = false;
        this.resultFrame.holdItem(null);

        this.add(this.fireFrame);
        this.add(this.oreFrame);
        this.add(this.resultFrame);

        this.fireFrame.onchange = () => {this.update()};
        this.oreFrame.onchange = () => {this.update()};
        this.resultFrame.ontake = () => {this.update()};

        /**
         * progressbars
         */
        this.flameBorder = new Panel(190, 140, 10, 100, "#444");
        this.flame = new Panel(190, 140, 10, 100, "orange");

        this.progressBorder = new Panel(340, 90, 10, 100, "#444");
        this.progress = new Panel(340, 90, 10, 100, "cyan");

        this.add(this.flameBorder);
        this.add(this.flame);

        this.add(this.progressBorder);
        this.add(this.progress);
    }

    update() {
        const fuelItem = this.fireFrame.item;
        const oreItem = this.oreFrame.item;
        if(fuelItem && oreItem && !this.furnance.activated && this.resultFrame.canTakeItemIgnoreFilters(oreItem.getFurnanceResult())) {
            this.furnance.activate(fuelItem.fuel);
            this.fireFrame.decrease();
        }
        if(!oreItem){
            this.furnance.deactivate();
        }
    }

    burn() {
        const oreItem = this.oreFrame.item;
        if(oreItem) {
            const result = oreItem.getFurnanceResult();
            this.oreFrame.decrease();
            if(!this.resultFrame.item){
                this.resultFrame.holdItem(result);
            } else {
                this.resultFrame.decrease(-1);
            }
            this.update();
        }
    }

    draw(drawer, x, y) {
        this.flameBorder.height = this.frameSize;
        this.progressBorder.height = this.frameSize;

        const fuel = this.furnance.fuel / this.furnance.maxFuel;
        this.flame.height = fuel * this.frameSize;
        this.flame.y = 140 + this.frameSize - fuel * this.frameSize

        const progress = this.furnance.progress;
        this.progress.height = progress * this.frameSize;
        this.progress.y = 90 + this.frameSize - progress * this.frameSize

        super.draw(drawer, x, y);
    }
    /**
     * override super behavior
     */
    close(){
        // do nothing
    }

    takeItem(item){
        if(!item){
            return item;
        }
        if(item.fuel > 0){
            item = this.fireFrame.takeItemKeepOwn(item);
        }
        if(item && item.getFurnanceResult()){
            item = this.oreFrame.takeItemKeepOwn(item);
        }
        return item;
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
        this.color = "#AAAD";
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
        this.itemWidth = (rowWidth - (this.cols - 1) * this.itemMargin * 1) / this.cols;

        for (let row = 0; row < this.rows; row++) {

            /**
             * row
             */
            const itemRow = new Panel(0, this.innerHeight - (row + 2.3) * (this.itemWidth + this.itemMargin), rowWidth, this.itemWidth, "#0000");
            itemRow.border = false;

            /**
             * column
             */
            for (let i = 0; i < this.cols; i++) {
                const itemFrame = new ItemFrame(i * (this.itemWidth + this.itemMargin), 0, this.itemWidth, this.itemWidth, this);
                itemRow.add(itemFrame);
            }

            this.itemRows.push(itemRow);
            this.add(itemRow);
            if(row === this.rows - 1){
                this.hotbar = itemRow;
                itemRow.y = this.innerHeight - this.itemWidth * 1;
            }
        }

        /**
         * crafting frame
         */
        this.craftingFrame = new CraftingFrame(3, this.itemWidth, this.itemMargin, this);
        this.add(this.craftingFrame);

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
            inventory.close();
        }
    }

    openCraftingTable(){
        Inventory.closeAll();
        this.craftingFrame.visible = true;
        this.craftingFrame.size = 3;
        this.opened = true;
    }

    open(addon){
        Inventory.closeAll();
        if(addon){
            this.craftingFrame.visible = false;
            this.attatchAddon(addon)
        } else{
            this.craftingFrame.visible = true;
            this.craftingFrame.size = 2;
        }
        this.opened = true;
   }

   attatchAddon(addon) {
        this.addon = addon;
        this.add(addon);
        this.addon.inventory = this;
        addon.init(this.itemWidth, this)
   }

   detatchAddon() {
        if(this.addon){
            this.addon.close();
            this.remove(this.addon);
        }
   }

   close(){
        this.opened = false;
        this.remove(this.grabbedItem);
        this.dropItem(this.grabbedItem, 100000);
        this.grabbedItem = null;
        this.craftingFrame.dropItems();
        this.detatchAddon();
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
        } else if(this.entity.alive){
            const screen = drawer.screen;
            this.hotbar.draw(drawer, screen.width / 2 - this.hotbar.width / 2, (screen.height - this.hotbar.height - 20) - this.hotbar.y);
        }
        super.draw(drawer);
    }

    mousemove(e, parsedMouse) {
        this.mouse = parsedMouse;
    }

    itemFrameClicked(frame, button, shiftPressed){
        if(!this.opened){
            return;
        }
        if(shiftPressed && this.addon && !frame.isAddon) {
            let item = frame.item;
            item = this.addon.takeItem(item);
            if(!item || item.stack === 0){
                frame.holdItem(null);
            } else {
                frame.item.stack = item.stack;
            }
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
                    // this.remove(this.grabbedItem);
                } else if(frame.filterItems(this.grabbedItem)){
                    this.remove(this.grabbedItem);
                    const newGrabber = frame.getItem();
                    frame.takeItem(this.grabbedItem);
                    this.grabbedItem = newGrabber;
                    this.remove(this.grabbedItem);
                }

            } else{//not yet grabbing
                this.grabbedItem = frame.getHalf();
            }
            this.add(this.grabbedItem);
        }
        this.setActiveHotbar(this.activeIndex);
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

    canTakeItem(item) {
        for (const itemRow of this.itemRows) {
            for (const itemFrame of itemRow.children) {
                if(itemFrame.canTakeItem(item)){
                    return true;
                }
            }
        }
    }

    takeItem(item){
        for (const itemFrame of this.hotbar.children) {
            if(itemFrame.canTakeItemPartly(item)){
                item = itemFrame.takeItemKeepOwn(item);
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
        this.setActiveHotbar(this.activeIndex);
        if(!item) return;
        for (const itemFrame of this.hotbar.children) {
            if(!itemFrame.item){
                itemFrame.holdItem(item);
                this.setActiveHotbar(this.activeIndex);
                return;
            }
        }
        if(!item) return;
        for (const itemRow of this.itemRows) {
            for (const itemFrame of itemRow.children) {
                if(!itemFrame.item){
                    itemFrame.holdItem(item);
                    this.setActiveHotbar(this.activeIndex);
                    return;
                }
            }
        }
        return item;
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

    getAllItems(){
        const out = [];
        for (const child of this.children) {
            if(child instanceof Panel){
                for (const frame of child.children) {
                    if(frame instanceof ItemFrame){
                        if(frame.item){
                            out.push(frame.item);
                        }
                    }
                }
            }
        }
        return out;
    }

    clear(parent = this, i = 0) {
        if(!parent) return;
        for (const child of parent.children) {
            if(child instanceof ItemFrame){
                child.holdItem(null);
            } else{
                if(i < 10){
                    this.clear(child, i + 1);
                }
            }
        }
    }
}

class Entity extends Point {

    constructor(x, y, width, height, texture, textureMeta, hitbox, game, life = 0, visible = true, hasInventory = false){
        super(x, y);
        this.vel = new Point(0, 0);
        this.life = life;
        this.maxLife = life;
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
        this.regenRate = 0.01;
        this.lastHit = 0;
        this.lastDealedHit = 0;
        this.attackCooldown = 450;
        this.walkingSpeed = 0.2;
        this.light = 1;
        this.canClimb = false;
        this.dayLight = 0;

        this.alive = true;
        this.burning = 0;
        this.burnsOnSunlight = false;

        if(hasInventory){
            this.inventory = new Inventory(this);
        }
    }

    getDrops() {
        // return new FlowerPink();
    }

    jumb(){
        if(this.isGrounded){
            this.isGrounded = false;
            this.vel.y = 15;
        }
    }

    walkRight(autojumb = false) {

        this.vel.add(new Point(this.walkingSpeed));
        if(autojumb) {
            this.autojumb();
        }
        if(this.canClimb) {
            this.climb();
        }
    }

    walkLeft(autojumb = false) {
        this.vel.add(new Point(-this.walkingSpeed));
        if(autojumb) {
            this.autojumb();
        }
        if(this.canClimb) {
            this.climb();
        }
    }

    climb() {
        const xOffset = this.vel.x > 0 ? this.width + 0.2 : -.2;
        const block = this.game.world.getBlock(this.pos.x + xOffset, this.pos.y - this.height);
        if(block && block?.[0]?.solid) {
            // console.log("climbing")
            this.grounded = true;
            // this.pos.y += 0.1;
            this.vel.y = 6
        }
    }

    autojumb (){
        if(!this.isGrounded || this.canClimb){
            return;
        }
        const right = this.vel.x > 0;
        const x = this.hitbox.center.x + (right ? this.hitbox.width  : -this.hitbox.width);
        const y = this.pos.y - this.height + 0.5;
        const block1 = this.game.world.getBlock(x, y);
        const block2 = this.game.world.getBlock(x, y + 1);
        const block3 = this.game.world.getBlock(x, y + 2);
        if(block1 && block1?.[0]?.solid){
            if(!(block2 && block2?.[0]?.solid) && !(block3 && block3?.[0]?.solid)){
                this.jumb();
            }
        }
    }

    canGetHit(){
        return this.life > 0;
    }

    regen() {
        this.life = Math.min(this.life + this.regenRate, this.maxLife);
    }

    entityCollided(entity) {
        if(entity.burning > 0) {
            this.burning = 1;
        }
    }

    tick(elapsed, world, keys){
        if(this.life < this.maxLife) {
            this.regen();
        }

        if(this.controller){
            this.controller.tick(elapsed, keys, world.game);
        }

        /**
         * gravity
         */
        this.vel.add(new Point(0, -this.gravity / elapsed));
        
        this.move(world, elapsed);

        /**
         * friction
         */
        if(this.isGrounded){
            this.vel.multiply(new Point(0.97, 0.97));
        }

        /**
         * light
         */
        const center = this.hitbox.center;
        this.dayLight = this.game.world.sunLightAt(this.game.world.surfaceLevelAt(center.x), center.y);
        this.light = Math.max(this.game.world.getSourceLight(center.x, center.y) + this.dayLight, 0);
        if(this.dayLight === 1 && this.burnsOnSunlight) {
            this.burning = 3;
        }

        /**
         * burning
         */
        if(this.burning > 0) {
            this.life -= 0.05;
            this.burning = Math.max(0, this.burning -= 0.04);
        }
        /**
         * die
         */
        if(this.life <= 0 && this.maxLife > 0) {
            this.die();
        }
    }

    fallDamage(velY) {
        const minVel = 20;
        if(velY < -minVel && this.firstFall) {
            const vel = -velY - minVel;
            this.life -= Math.pow(vel / 3.5, 1.2);
        }
        this.firstFall = true;
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
                /**
                 * fall damage
                 */
                this.fallDamage(this.vel.y);
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

    getEntitiesInRadius(radius){
        const center = this.hitbox.center;
        return this.game.world.getEntitiesInRadius(center.x, center.y, radius, [this]);
    }

    draw(drawer, camera){
        if(!this.visible){
            return;
        }
        // console.log();
        const screen = camera.worldToScreen(this.pos, drawer.screen);
        let filter;
        if(this.light < 1){
            filter = "brightness(" + Math.min(1, this.light + 0.1) * 100 + "%)";
        }
        if(this.game.time - this.lastHit < 300){
            filter += "  hue-rotate(80deg)";
        }
        drawer.draw(this.texture, screen.pos.x, screen.pos.y, screen.size * this.width, screen.size * this.height,
            this.textureMeta.x * tileWidth, this.textureMeta.y * tileWidth, this.textureMeta.width * tileWidth, this.textureMeta.height * tileWidth, filter);

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
            this.handItem.draw(drawer, point.pos.x, point.pos.y, filter);
        }

        if(this.burning > 0) {
            let flame = textureAtlasMap.fire1;
            if(this.game.time % 250 < 125) {
                flame = textureAtlasMap.fire2;
            }
            drawer.draw("atlas1", screen.pos.x, screen.pos.y, screen.size * this.width, screen.size * this.height,
                flame.x * tileWidth, flame.y * tileWidth, flame.width * tileWidth, flame.height * tileWidth);
        }
    }

    holdItem(item) {
        this.handItem = item;
        if(!item) {
            return;
        }
        // this.handItem = item;
        item.x = 0;
        item.y = 0;
    }

    dealHit(dmg, radius){
        if(this.game.time - this.lastDealedHit > this.attackCooldown){
            this.lastDealedHit = this.game.time;
            this.game.world.damageEntities(dmg, this.pos.x, this.pos.y, radius, [this]);
        }
    }

    getHit(dmg, fromX, fromY) {
        this.lastHit = this.game.time;
        const knockback = 10;
        // console.log("got hit")
        if(!this.canGetHit()){
            return;
        }
        const left = fromX < this.pos.x ? 1 : -1;
        const bottom = fromY < this.pos.y ? 1 : -1;
        this.life -= dmg;
        this.vel.x += knockback * left;
        this.vel.y += knockback * bottom;
        if(this.life < 0){
            this.die()
        }
    }

    die() {
        this.game.world.entities.splice(this.game.world.entities.indexOf(this), 1);
        if(!this.alive) return false;
        console.log("I died :/");
        this.alive = false;
        let drops = this.getDrops();
        if(drops) {
            if(!Array.isArray(drops)) {
                drops = [drops];
            }
            for (const drop of drops) {
                const droppedItem = new DroppedItem(drop, this.hitbox.center.x, this.hitbox.center.y, this.game, 1300);
                droppedItem.vel.x = Math.random() * 15 - 5;
                droppedItem.vel.y = Math.random() * 10 + 10;
                this.game.spawnEntity(droppedItem);
            }
        }
        delete this.inventory;
    }
}

class Mob extends Entity {

    constructor(game, x, y, width, height, hitbox ,texture, textureMeta, setup, life = 20){
        super(x, y, width, height, texture, textureMeta, hitbox, game, life);

        if(!setup) {
            setup = {};
        }

        this.setup = setup;
        this.walkingSpeed = setup.walkingSpeed ?? 0.1;
        this.burnsOnSunlight = setup.burnsOnSunlight ?? false;
        this.canClimb = setup.canClimb ?? false;
        this.xp = setup.xp ?? 5;
        this.gravity = setup.gravity ?? 15;
        this.life = setup.life ?? 20;

        this.behavior = setup.behavior ?? {};

        this.controller = new MobController(this, this.behavior);
    }
}

class Zombie extends Mob {
    
    constructor(game, x, y) {
        super(game, x, y, 0.9, 1.8, new Hitbox(0.1, 0, 0.8, 1.8), "zombie", textureAtlasMap.zombie, {
            walkingSpeed: 0.1,
            burnsOnSunlight: true,
            behavior: {
                attackType: MobController.ALWAYS_ATTACk,
                activationRange: 16,
            }
        });
    }

    getDrops() {
        if(Math.random() < 0.05) {
            return [new Iron()];
        } else {
            const drop = new RottenFlesh();
            drop.stack = Math.floor(Math.random() * 2 + 1)
            return drop;
        }
    }
}

class Spider extends Mob {
    
    constructor(game, x, y) {
        super(game, x, y, 1.9, 0.8, new Hitbox(0.1, 0, 1.9, 0.8), texturepack, textureAtlasMap.spider, {
            walkingSpeed: 0.1,
            burnsOnSunlight: false,
            canClimb: true,
            behavior: {
                attackType: MobController.AGGRESSIVE_ALWAYS_ATTACK_EXEPT_DAYLIGHT,
                activationRange: 16,
            }
        });
    }

    getDrops() {
        if(Math.random() < 0.4) {
            return [new SpiderEye()];
        } else {
            const drop = new String();
            drop.stack = Math.floor(Math.random() * 2 + 1)
            return drop;
        }
    }
}

class Chicken extends Mob {
    
    constructor(game, x, y) {
        super(game, x, y, 0.9, 0.9, new Hitbox(0, 0, 0.9, 0.9), texturepack, textureAtlasMap.chicken, {
            walkingSpeed: 0.07,
            life: 6,
            gravity: 3,
            behavior: {
                attackType: MobController.PEACFUL,
            }
        }, 4);
    }

    getDrops() {
        if(Math.random() < 0.3) {
            return new Feather();
        } else {
            const drop = new RawChicken();
            drop.stack = Math.floor(Math.random() * 2 + 1)
            return drop;
        }
    }
}

class Cow extends Mob {
    
    constructor(game, x, y) {
        super(game, x, y, 1.4, 1.4, new Hitbox(0, 0, 1.4, 1.2), texturepack, textureAtlasMap.cow, {
            walkingSpeed: 0.07,
            life: 10,
            behavior: {
                attackType: MobController.PEACFUL,
            }
        },
        10);
    }

    getDrops() {
        if(Math.random() < 0.4) {
            return new Leather();
        } else {
            const drop = new RawBeef();
            drop.stack = Math.floor(Math.random() * 2 + 1)
            return drop;
        }
    }
}


class Pig extends Mob {
    
    constructor(game, x, y) {
        super(game, x, y, 1.4, 1.4, new Hitbox(0, 0, 1.4, 1.2), texturepack, textureAtlasMap.pig, {
            walkingSpeed: 0.07,
            life: 10,
            behavior: {
                attackType: MobController.PEACFUL,
            }
        });
    }

    getDrops() {
        const drop = new Pork();
        drop.stack = Math.floor(Math.random() * 2 + 1)
        return drop;
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
        const collisionMargin = 0.02;
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

    inRange(x, y, range){
        return this.center.distanceFrom(new Point(x, y)) < range;
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

    constructor(game, x = 5, y = 120, texture = "steve",  hitbox = new Hitbox(0.1, 0, 0.8, 1.8)){
        super(x, y, 0.9, 1.8, texture, textureAtlasMap.steve, hitbox, game, 20, true, true);
        this.vel.y = -1000;
        this.controller = new KeyboardController(this);
        this.leftMouseDown = false;
        this.rightMouseDown = false;
        this.isPlayer = true;
        this.xp = 0;
        
        /**
         * hunger
         */
        this.maxHunger = 20;
        this.hunger = 20;
        // costs
        this.buildHungerCost = 0.01;
        this.tickHungerCost = 0.00003;
        this.regenHungerCost = 0.003;
        
        this.foodProgress = 0;
    }

    regen() {
        if(this.hunger === 0) {
            return;
        }
        this.hunger -= this.regenHungerCost;
        super.regen();
    }

    
    die() {
        if(!this.alive) return false;
        this.alive = false;
        this.game.clearPlayer();
        super.die();
        for (let i = 0; i < this.xp; i++) {
            if(Math.random() <0.4) {
                const xpPoint = new XPPoint(this.pos.x, this.pos.y, this.game, 500);
                this.game.world.spawnEntity(xpPoint);
            }
        }
        window.setTimeout(() => this.game.respawnPlayer(), 2000);
    }

    getDrops() {
        const drops = this.inventory.getAllItems();
        this.inventory.clear();
        return drops;
    }

    keydown(e, keyStatus) {
        let opened = false;
        if(keyPressed("openInventory", keyStatus) && !this.inventory.opened){
            this.inventory.open();
            this.controller.active = false;
            opened = true;
        }
        if(keyPressed("closeInventory", keyStatus) && !opened){
            this.inventory.close();
            this.controller.active = true;
        }
        if(keyPressed("dropItem", keyStatus) && !this.inventory.opened) {
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
        if(this.handItem?.attackDmg > 0){
            this.dealHit(this.handItem.attackDmg, this.handItem.attackRadius);
        }
    }

    eat() {
        if(this.hunger > this.maxHunger - 1) return;
        if(!this.handItem || this.handItem.food === 0) {
            this.foodProgress = 0;
            return;
        }

        this.foodProgress += 0.08;
        if(this.foodProgress >= 1) {
            this.foodProgress = 0;
            this.hunger = Math.min(this.maxHunger, this.hunger + this.handItem.food);
            this.inventory.hotbar.children[this.inventory.activeIndex].decrease();
            this.inventory.setActiveHotbar(this.inventory.activeIndex);
        }
    }

    mouseup(e) {
        if(e.originalEvent.button === Panel.LEFT_CLICK){
            this.leftMouseDown = false;
        }
        if(e.originalEvent.button === Panel.RIGHT_CLICK){
            this.rightMouseDown = false;
        }
    }

    tick(elapsed, world, keys, time){
        this.playerControlls(elapsed, time, keys);
        this.hunger -= this.tickHungerCost;
        this.hunger = Math.max(0, this.hunger);
        if(this.hunger === 0) {
            this.life = Math.max(this.life - 0.003, 0.9);
        }
        if(this.rightMouseDown) {
            this.eat();
        }
        super.tick(elapsed, world, keys);//should be last as it checks collisions and controller can move unchecked
    }

    playerControlls(elapsed){
        if(this.inventory.opened) {
            return;
        }
        let canBreakBlock = true;
        if(this.handItem){
            canBreakBlock = this.handItem.attackDmg === 0;
        }
        if(this.leftMouseDown && this.game.hoverBlocks && canBreakBlock){
            if(this.game.hoverBlocks?.[0]){
                this.game.hoverBlocks?.[0]?.hit(elapsed, this.handItem);
            } else if(this.game.hoverBlocks?.[1]) {
                this.game.hoverBlocks?.[1]?.hit(elapsed, this.handItem);
            }
        }
        if(this.rightMouseDown){
            this.buildBlock();
        }
    }

    buildBlock(){
        if(this.game.buildBlock(this.handItem)){
            this.hunger -= this.buildHungerCost;
            this.handItem.stack--;
            if(this.handItem.stack === 0){
                this.inventory.destroyItem(this.handItem);
                this.handItem = 0;
            }
        }
    }

    entityCollided(collider){
        if(collider instanceof DroppedItem){
            if(!this.canTakeItem(collider.item)) return;
            if(collider.isCollectible && collider.canITakeYou()){
                const newItem = this.inventory.takeItem(collider.item);
                if(!newItem) {
                    collider.die();
                }  else {
                    collider.item = newItem;
                }
            }
        }
        if(collider instanceof XPPoint) {
            if(collider.canITakeYou()) {
                this.xp++;
                collider.die();
            }
        }
        super.entityCollided(collider);
    }

    canTakeItem(item){
        return this.inventory?.canTakeItem(item);
    }
}

class Heart extends Panel {

    constructor(x, width, height, hp) {
        super(x, 0, width, height, "#0000");
        this.hp = hp;
        this.state = 2;
    }

    draw(drawer, x, y) {
        const padding = 2;

        let textureMeta = textureAtlasMap.emptyHeart;
        if(this.state === 1){
            textureMeta = textureAtlasMap.halfHeart;
        } else if(this.state === 2) {
            textureMeta = textureAtlasMap.heart;
        }
        // if(this.state > 0) {
            drawer.draw(texturepack, this.x + x + padding, this.y + y + padding, this.width - padding * 2, this.width - padding * 2, textureMeta.x * tileWidth, textureMeta.y * tileWidth, textureMeta.width * tileWidth, textureMeta.height * tileWidth);
        // }
    }
}

class HungerPanel extends Panel {

    constructor(x, width, height, hp) {
        super(x, 0, width, height, "#0000");
        this.hp = hp;
        this.state = 2;
    }

    draw(drawer, x, y) {
        const padding = 2;

        let textureMeta = textureAtlasMap.emptyHunger;
        if(this.state === 1){
            textureMeta = textureAtlasMap.halfHunger;
        } else if(this.state === 2) {
            textureMeta = textureAtlasMap.fullHunger;
        }
        // if(this.state > 0) {
            drawer.draw(texturepack, this.x + x + padding, this.y + y + padding, this.width - padding * 2, this.width - padding * 2, textureMeta.x * tileWidth, textureMeta.y * tileWidth, textureMeta.width * tileWidth, textureMeta.height * tileWidth);
        // }
    }
}

class HeartRow extends Panel {
    
    constructor() {
        super(0, 0, 260, 50, "#0000");
        this.heartCount = 10;
        this.border = false;

        this.hearts = [];
        for (let heart = 0; heart < this.heartCount; heart++) {
            const heartPanel = new Heart((this.width / this.heartCount) * heart, this.width / this.heartCount, this.height);
            this.hearts.push(heartPanel);
            this.add(heartPanel);
        }
    }

    set hp (hp){
        let x = 0;
        for (let heart = 0; heart < this.heartCount; heart++) {
            const hpThreshold = heart / this.heartCount;
            const nextHpThreshold = (heart + 0.5) / this.heartCount;
            if(hp <= hpThreshold) {
                this.hearts[heart].state = 0;
            } else if(hp >= hpThreshold && hp <= nextHpThreshold) {
                this.hearts[heart].state = 1;
                x += 0.5;
            } else {
                x += 1;
                this.hearts[heart].state = 2;
            }
        }
        // console.log(x);
    }
}

class HungerRow extends Panel {
    
    constructor() {
        super(0, 0, 260, 50, "#0000");
        this.heartCount = 10;
        this.border = false;

        this.hearts = [];
        for (let heart = 0; heart < this.heartCount; heart++) {
            const heartPanel = new HungerPanel(this.width - (this.width / this.heartCount) * (heart + 1), this.width / this.heartCount, this.height);
            this.hearts.push(heartPanel);
            this.add(heartPanel);
        }
    }

    set hp (hp){
        let x = 0;
        for (let heart = 0; heart < this.heartCount; heart++) {
            const hpThreshold = heart / this.heartCount;
            const nextHpThreshold = (heart + 0.5) / this.heartCount;
            if(hp <= hpThreshold) {
                this.hearts[heart].state = 0;
            } else if(hp >= hpThreshold && hp <= nextHpThreshold) {
                this.hearts[heart].state = 1;
                x += 0.5;
            } else {
                x += 1;
                this.hearts[heart].state = 2;
            }
        }
        // console.log(x);
    }
}

class PlayerInfo extends Panel {

    constructor(player) {
        super(0, 0, 570, 50, "#0000");
        this.player = player;
        this.border = false;

        this.heartRow = new HeartRow();
        this.hungerRow = new HungerRow();
        this.hungerRow.x = 310;

        this.xpBar = new Panel(0, 30, 0, 8, "#2ebf3c");

        this.add(this.xpBar);
        this.add(this.heartRow);
        this.add(this.hungerRow);
    }

    draw(drawer, x = 0, y = 0) {
        /**
         * init
         */
        if(!this.player) return;
        const screen = drawer.screen;
        this.y = screen.height - 120;
        this.x = screen.width / 2 - this.width / 2;

        const xpStep = 10;
        this.xpBar.width = ((this.player.xp % xpStep) / xpStep) * this.width;
        this.xpBar.border = this.xpBar.width > 0;
        const level = Math.floor(this.player.xp / xpStep);
        if(level > 0) {
            // console.log("level")
            drawer.text(this.globalX + this.width / 2 - 10, this.globalY + 20, level, "22px Arial", "#7Fdf8c");
        }
        /**
         * lives
         */
        this.heartRow.hp = this.player.life / this.player.maxLife;
        this.hungerRow.hp = this.player.hunger / this.player.maxHunger;
        // console.log(this.player.life / this.player.maxLife)
        super.draw(drawer, x, y);
    }
}

class Game {

    constructor(drawer, camera = new Camera()) {
        this.world = new World(this);
        this.drawer = drawer;
        this.camera = camera;
        this.lastUpdate = 0;
        this.playerInfo = new PlayerInfo();
        this.keyStatus = {};
        this.mousePressed = false;
        this.debug = true;
        this.init();
        this.playerReach = 5;
        this.inputEventListener = [];
        this.fps = [];

        this.time = 0;

        this.respawnPlayer();
        this.inputEventListener.push(this.world);
    }

    initPlayer(player){
        this.clearPlayer();
        this.playerInfo.player = player;
        this.activePlayer = player;
        this.camera.target = player;
        this.inputEventListener.push(player);
        this.inputEventListener.push(player.inventory);
        this.world.spawnEntity(player);
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
        if(keyPressed("stats", this.keyStatus)){
            this.debug = !this.debug;
        }
        if(keyPressed("kill", this.keyStatus)) {
            this.activePlayer?.die();
        }
        this.camera.scale = Math.max(this.camera.minScale, Math.min(this.camera.scale, this.camera.maxScale));
    }

    keyup(e){
        this.keyStatus[e.code] = false;
        this.callInputEvent("keyup", e);
    }

    mousemove(e){
        // console.log(e.originalEvent);
        this.mouse = e;
        this.mouseX = e.originalEvent.offsetX;
        this.mouseY = e.originalEvent.offsetY;
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
        this.hoverBlocks = null;
        if(this.activePlayer?.inventory?.opened){
            return;
        }
        const cursor = this.cursor;
        if(cursor){
            const hoverBlocks = this.world.getBlock(cursor.x, cursor.y);
            const canhover = this.world.canBlockBeAccesed(cursor.x, cursor.y, this.activePlayer?.handItem?.layer ?? 0);
            if(canhover){
                const pos = this.camera.worldToScreen(new Point(Math.floor(cursor.x), Math.ceil(cursor.y)), this.drawer.screen);
                this.drawer.rect(pos.pos.x, pos.pos.y, pos.size, pos.size);
                if(hoverBlocks){
                    this.hoverBlocks = hoverBlocks;
                }
            }
        }
        /**
         * lives
         */
        if(this.playerInfo) {
            this.playerInfo.draw(this.drawer);
        }

    }

    drawDebug(elapsed){
        const fps = Math.round(1000 / elapsed * 1);
        this.fps.push(fps);
        let avgFps = 0;
        if(this.fps.length > 0) {
            for (const fps of this.fps) {
                avgFps += fps;
            }
            avgFps = avgFps / this.fps.length;
        }
       
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
                    if(!block) continue; 
                    blocks += ", " + block.name
                }
                if(hoverBlocks[0]){
                    this.drawer.text(10, 110, "block: (" + hoverBlocks[0].pos.x + "|" + hoverBlocks[0].pos.y + ")" + blocks);
                }
            }
        }
        const fpsStartX = 400;
        const fpsStartY = 100;
        for (let i = 0; i < this.fps.length; i++) {
            const fps = this.fps[i];
            let color = "green";
            if(fps < 55){
                color = "red";
            }
            this.drawer.fillRect(fpsStartX + i, fpsStartY - fps, 1, fps, color);
        }
        /**
         * player stuff
         */
        if(this.activePlayer) {
            this.drawer.text(10, 135, "player coordinates: (" + Math.round(this.activePlayer.pos.x) + "|" + Math.round(this.activePlayer.pos.y) + ")");
            this.drawer.text(10, 155, "player speed: (" + Math.round(this.activePlayer.vel.x) + "|" + Math.round(this.activePlayer.vel.y) + ")");
            this.drawer.text(10, 185, "Average fps: " + Math.round(avgFps));
        }
        /**
         * seed
         */
         this.drawer.text(10, 215, "Map seed: " + Noise.seed);
    }

    get cursor(){
        if(!this.mouse || !this.activePlayer){
            return null;
        }
        const center = this.activePlayer.hitbox.center;
        const mouse = this.camera.screenToWorld(new Point(this.mouseX, this.mouseY), this.drawer.screen);
        let distance = mouse.distanceFrom(center);
        // distance = Math.min(this.playerReach, distance);
        if(distance > this.playerReach){
            // console.log("max")
            return null;
        }
        // const coords = center.add(new Point(distance, distance).multiply(mouse.subtract(center).uniform));
        return mouse;
    }

    buildBlock(block){
        const cursor = this.cursor;
        if(!block || !block.canBePlaced || !cursor){
            return false;
        }
        // console.log("1")
        return this.world.buildBlock(block, cursor.x, cursor.y);
    }

    spawnEntity(entity) {
        return this.world.spawnEntity(entity);
    }

    clearPlayer() {
        if(this.activePlayer){
            this.activePlayer.die();
            console.log(this.inputEventListener.indexOf(this.activePlayer.inventory));
            this.inputEventListener.splice(this.inputEventListener.indexOf(this.activePlayer.inventory), 1);
            this.inputEventListener.splice(this.inputEventListener.indexOf(this.activePlayer), 1);
            this.activePlayer = null;
        }
    }

    respawnPlayer(){
        this.initPlayer(new Player(this));
    }
}

class Camera extends Point {

    /**
     * @param {*} x 
     * @param {*} y 
     * @param {*} scale how many blocks will be in view
     */
    constructor(x = 0, y = 70, scale = 20, target){
        super(x, y);
        this.scale = scale;
        this.minScale = 7;
        this.maxScale = 25;
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
class MobController extends Controller {

    static PEACFUL = 0
    static ATTACK_ON_ATTACK = 2
    static AGGRESSIVE_ALWAYS_ATTACK_EXEPT_DAYLIGHT = 1
    static ALWAYS_ATTACk = 3

    constructor(entity, setup){
        super(entity);
        if(!setup){
            setup = {};
        }

        this.attackType = setup.attackType ?? MobController.PEACFUL;
        this.activationRange = setup.activationRange ?? 10;
        this.hitRange = setup.hitRange ?? 2;
        this.damage = setup.damage ?? 2;
        this.attackSpeed = setup.attackSpeed ?? 0.13;
        this.autoJumb = setup.autoJumb ?? true;
        this.aggressiveOn = setup.aggressiveOn ?? (entity => entity?.isPlayer);
        this.defaultWalkSpeed = this.entity.walkSpeed;

        /**
         * random
         */
        this.aggressive = this.attackType === MobController.ALWAYS_ATTACk;
        this.timeOffset = Math.random() * 1000;
    }

    tick(elapsed, keys, game) {
        /**
         * check aggressive
         */
        if(this.attackType === MobController.ATTACK_ON_ATTACK) {
            this.aggressive = this.entity.life < this.entity.maxLife;
        }
        if(this.attackType === MobController.AGGRESSIVE_ALWAYS_ATTACK_EXEPT_DAYLIGHT) {
            this.aggressive = this.entity.life < this.entity.maxLife || this.entity.daylight < 0.9;
        }
        if(this.aggressive) {
            const enemies = this.entity.getEntitiesInRadius(this.activationRange);
            for (const enemy of enemies) {
                if(this.aggressiveOn(enemy)) {
                    if(enemy.distance123 < 4) {
                        this.entity.dealHit(4, 2);
                    }
                    if(enemy.distance123 > 0.5) {
                        if(enemy.pos.x < this.entity.pos.x) {
                            this.entity.walkLeft(this.autoJumb);
                        } else {
                            this.entity.walkRight(this.autoJumb);
                        }
                    }
                    return;
                }
            }
        }
        
        if(this.attackType === MobController.PEACFUL && this.entity.life < this.entity.maxLife) {
            this.entity.walkSpeed = this.defaultWalkSpeed * 2;
            this.running = true;
        } else {
            this.entity.walkSpeed = this.defaultWalkSpeed;
        }
        /**
         * random movement
         */
        const timeNoise = Noise.noise(this.entity.game.time / 17000, this.timeOffset);
        const leftMargin = this.running ? 0 : -.4
        const rightMargin = this.running ? 0 : .4
        if(timeNoise < leftMargin) {
            this.entity.walkLeft(this.autoJumb);
        }
        if(timeNoise > rightMargin) {
            this.entity.walkRight();
        }
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
        if(this.entity.inventory.opened){
            return;
        }
        if(keyPressed("left", keys)){
            this.entity.walkLeft();
        }
        if(keyPressed("right", keys)){
            this.entity.walkRight();
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
        this.changedBlocks = [];
        this.width = width;
        this.height = height;
        this.noise = new Noise(seed);

        /**
         * chunks
         */
        this.chunks = [];
        this.loadedChunks = [];
        this.lightSources = []
        this.loadedFrom = 0;
        this.loadedToX = 0;
        this.lastFromX = 0;
        this.lastTo = 0;
        this.blockBuffer = 1;//buffer of chunks to left and right from the screen
        this.maxLoadedColumns = 100; //older chunks will get deleted when this number gets exeeded
        this.lastLoadedChunk = undefined;
        this.idChunk = 0;
        this.surfaceMin = 60;
        this.surfaceMax = 90;

        /**
         * testing
         */
        // const zombie = new Spider(this.game, 0, 120);
        // this.entities.push(zombie);
    }

    loadChunks(fromX, toX, fromY = this.height, toY = 0){
        this.lastFromX = fromX;
        this.lastToX = toX;
        fromX = Math.floor(fromX);
        toX = Math.ceil(toX);
        if(this.loadedChunks.includes(fromX) && this.loadedChunks.includes(toX)){
            return;
        }
        let fromX1 = fromX - this.blockBuffer;
        let toX1 = toX + this.blockBuffer;

        window.setTimeout(() => {
            const updated = [];
            for (let x = fromX1; x <= toX1; x++) {
                if(this.loadChunk(x)){
                    updated.push(x);
                }
            }
            if(updated.length === 0) return;
            let min = updated[0];
            let max = updated[0];
            for (const x of updated) {
                min = Math.min(min, x);
                max = Math.max(max, x);
            }
            min -= 3;
            max += 3;
            // console.log(updated);
            // this.recalculateLightInRect(min, fromY, max - min, fromY - toY);
            // this.recalculateLightInRect(min, this.height, max - min, this.height);
        }, 0);
    }

    loadChunk(x){
        if(this.loadedChunks.includes(x)){
            return false;
        }
        console.log("loading chunk at x=" + x + ", total chunks: " + this.loadedChunks.length);
        this.chunks[World.xToIndex(x)] = [];

        

        for (let y = 0; y <= this.height; y++) {
            const block = this.worldFunction(x, y);
            this.chunks[World.xToIndex(x)][y] = block;
            if(block && block.emission > 0){
                this.lightSources.push(block);
            }
        }

        for (let y = 0; y <= this.height; y++) {
            this.updateSpawnBlock(x, y);
        }

        

        this.loadedChunks.push(x);
        this.cleanChunks();
        return true;
    }

    updateSpawnBlock(x, y) {
        const block = this.chunks[World.xToIndex(x)][y];
        const blockAbove1 = this.chunks[World.xToIndex(x)][y + 1];
        const blockAbove2 = this.chunks[World.xToIndex(x)][y + 2];

        if(!block || !block[0]) return;
        block[0].border = false;

        if(!block[0]?.solid) return;
        if(!this.isBlockObstacle(blockAbove1) && !this.isBlockObstacle(blockAbove2)) {
            block[0].spawnBlock = true;
            // block[0].border = true;
        }
    }

    isBlockObstacle(block) {
        if(!block) return false;
        return block[0]?.solid;
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
        this.lightSources.filter(e => {
            return e.pos.x === x;
          });
        console.log("deleting chunk at x=" + x);
        this.chunks[World.xToIndex(x)] = undefined;
        this.loadedChunks.splice(this.loadedChunks.indexOf(x), 1);
        /**
         * kill entities
         */
        for (const entity of this.entities) {
            if(entity.pos.x >= x - 1 &&  entity.pos.x <= x + 1) {
                entity.die();
            }
        }
    }

    static xToIndex(x){
        if(x >= 0){
            return x * 2;
        } else{
            return x * -2 - 1;
        }
    }

    blockLoaded(x){
        x = Math.floor(x);
        return this.loadedChunks.includes(x);
    }

    columnFromChunks(x) {
        if(!this.blockLoaded(x)){
            this.loadChunk(x);
        }
        return this.chunks[World.xToIndex(x)];
    }

    columnFromChunksIgnoreUnloaded(x){
        if(this.blockLoaded(x)){
            return this.chunks[World.xToIndex(x)];
        }
    }

    getBlock(x, y){
        return this.getBlockIgnoreUnloaded(x, y);
        // y = Math.ceil(y);
        // x = Math.floor(x);
        // if(this.blockLoaded(x)){
        //     return this.columnFromChunks(x)[y];
        // } else{
            // console.log("not loaded")
            // this.loadChunks(x, x);
            // return this.columnFromChunks(x)[y];
        // }
    }

    getBlockIgnoreUnloaded(x, y){
        x = Math.floor(x);
        y = Math.ceil(y);
        if(this.blockLoaded(x)){
            return this.columnFromChunks(x)[y];
        }
        return null;
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

    buildBlock(block, x, y) {
        if(x > this.height || y < 0) {
            return false;
        }
        x = Math.floor(x);
        y = Math.ceil(y);
        

        const prevBlocks = this.getBlock(x, y);

        if(block.solid){
            for (const entity of this.entities) {
                if(entity.hitbox.intersects(new Hitbox(x, y, 1, 1))){
                    return false;
                }
            }
        }

        if(prevBlocks?.[block.layer]){
            // console.log(prevBlocks);
            // console.log("layer")
            return false;
        }


        if(!this.canBlockBeplacedHere(x, y, block.layer)){
            // console.log("no")
            return false;
        }

        if(block.needsSolidBlockBelow){
            const blockBelow = this.getBlockIgnoreUnloaded(x, y - 1);
            if(!blockBelow) return false;
            if(!blockBelow?.[block.layer]) return false;
            if(!blockBelow[block.layer].solid) return false;
        }

        block = block.clone();


        if(block.emission > 0){
            this.changeLightSource(x, y, block.emissisonRange, block.emission);
            this.lightSources.push(block);
            // console.log(this.lightSources)
        }

        block.sourceLight = this.getSourceLight(x, y) + block.emission;

        block.pos.x = x;
        block.pos.y = y;
        block.placed = true;
        block.visible = true;
        block.width = 1;
        block.height = 1;
        block.world = this;
        
        block.sunLight = this.sunLightAt(this.surfaceLevelAt(x), y);

        const column = this.columnFromChunks(x);
        if(column[y] === null){ // air
            column[y] = [];
        }
        column[y][block.layer] = block;
        this.blockChanged(x, y);
        return true;
    }

    canBlockBeplacedHere(x, y, layer) {
        const reverseLayer = layer === 0 ? 1 : 1;
        const self = this.getBlock(x, y);
        const a = this.getBlock(x - 1, y);
        const b = this.getBlock(x, y - 1);
        const c = this.getBlock(x + 1, y);
        const d = this.getBlock(x, y + 1);
        // console.log((a[layer]?.solid || b[layer]?.solid || c[layer]?.solid || d[layer]?.solid || self[reverseLayer])
        // && !(a[layer]?.solid && b[layer]?.solid && c[layer]?.solid && d[layer]?.solid))
        return (a?.[layer] || b?.[layer] || c?.[layer] || d?.[layer] || self?.[reverseLayer])
        && !(a?.[layer]?.solid && b?.[layer]?.solid && c?.[layer]?.solid && d?.[layer]?.solid) && !self?.[0];
    }

    canBlockBeAccesed(x, y, layer){
        const reverseLayer = layer === 0 ? 1 : 1;
        const self = this.getBlock(x, y);
        const a = this.getBlock(x - 1, y);
        const b = this.getBlock(x, y- 1);
        const c = this.getBlock(x + 1, y);
        const d = this.getBlock(x, y + 1);
        // console.log(((a[layer]?.solid || b[layer]?.solid || c[layer]?.solid || d[layer]?.solid) || self)
        // && !(a[layer]?.solid && b[layer]?.solid && c[layer]?.solid && d[layer]?.solid))
        
        return ((a || b || c || d) || self) && !(a?.[layer]?.solid && b?.[layer]?.solid && c?.[layer]?.solid && d?.[layer]?.solid)
        // && !(a[layer]?.solid && b[layer]?.solid && c[layer]?.solid && d[layer]?.solid);
    }

    sunLightAt(surfaceLevel, y){
        return Math.max(0.05, Math.min(1, (surfaceLevel - y) / -5 + 1)); 
    }

    surfaceLevelAt(x){
        const xNoise = Noise.noise(x * 0.01, 0);
        const xNoiseSmall = Noise.noise(x * 0.05, 0);
        return Math.round(this.surfaceMin + (xNoise + xNoiseSmall * 0.2) * (this.surfaceMax - this.surfaceMin))
    }

    worldFunction(x, y){
        if(this.changedBlocks[World.xToIndex(x)] !== undefined){
            if(this.changedBlocks[World.xToIndex(x)][y] !== undefined){
                console.log("loading block from mem");
                return this.changedBlocks[World.xToIndex(x)][y];
            }
        }
        if(y > 110) return null;
        const noise = Noise.noise(x / 6, y / 6) / 2 + 0.5;
        const xNoise = Noise.noise(x * 0.01, 0);
        const xNoiseSmall = Noise.noise(x * 0.05, 0);

        const surfaceLevel = Math.round(this.surfaceMin + (xNoise + xNoiseSmall * 0.2) * (this.surfaceMax - this.surfaceMin));
        const caveOnSurface = isCave(x, surfaceLevel);
        
        let blocks = [];

        let blockOnSurface = false;
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
        if(y === surfaceLevel + 1 && !caveOnSurface){
            for (const flower of flowers) {
                if((noise + flower.offset) % 1 < flower.probability){
                    blocks[0] = flower.getBlock();
                    blockOnSurface = true;
                }
            }
        }

        const trees = [[
            [null, "Leaf", "Leaf", null, null],
            [null, "Leaf", "Leaf", "Leaf", null],
            ["Leaf", "Leaf", "Leaf", "Leaf", "Leaf"],
            ["Leaf", "Leaf", "Leaf", "Leaf", "Leaf"],
            ["Leaf", "Leaf", "Leaf", "Leaf", "Leaf"],
            ["Leaf", "Leaf", "Leaf", "Leaf", "Leaf"],
            [null, "Leaf", "Oaklog", "Leaf", null],
            [null,    null, "Oaklog", null, null],
            [null,    null, "Oaklog", null, null],
            [null,    null, "Oaklog", null, null],
            [null,    null, "Oaklog", null, null],
            [null,    null, "Oaklog", null, null],
        ],[
            [null, null, "Leaf", null, null],
            [null, "Leaf", "Leaf", "Leaf", null],
            ["Leaf", "Leaf", "Leaf", "Leaf", null],
            ["Leaf", "Leaf", "Leaf", "Leaf", "Leaf"],
            [null,   "Leaf", "Oaklog", "Leaf", null],
            [null,    null, "Oaklog", null, null],
            [null,    null, "Oaklog", null, null],
            [null,    null, "Oaklog", null, null],
            [null,    null, "Oaklog", null, null],
            [null,    null, "Oaklog", null, null],
            [null,    null, "Oaklog", null, null],
            [null,    null, "Oaklog", null, null],
            [null,    null, "Oaklog", null, null],
        ],[
            [null, null, "Leaf", null, null],
            [null, "Leaf", "Leaf", "Leaf", null],
            ["Leaf", "Leaf", "Leaf", "Leaf", null],
            ["Leaf", "Leaf", "Leaf", "Leaf", "Leaf"],
            [null,   "Leaf", "DarkOakLog", "Leaf", null],
            [null,    null, "DarkOakLog", null, null],
            [null,    null, "DarkOakLog", null, null],
            [null,    null, "DarkOakLog", null, null],
            [null,    null, "DarkOakLog", null, null],
            [null,    null, "DarkOakLog", null, null],
        ]];
        /**
         * trees
         */
        
        const treeDistance = 6;
        const treeDensity = 0.7;
        let treeX = x % treeDistance;
        
        if(x < 0){
            treeX += 5;
        }
        let treeXOrigin = x - treeX;
        // x * 0.01, 0
        const xTreeNoise = Noise.noise((treeXOrigin + 2) * 0.01)
        const xTreeNoiseSmall = Noise.noise((treeXOrigin + 2) * 0.05)
        const treeYOrigin = Math.round(this.surfaceMin + (xTreeNoise + xTreeNoiseSmall * 0.2) * (this.surfaceMax - this.surfaceMin));
        if(!isCave(treeXOrigin + 2, treeYOrigin)){
            if((Noise.noise(treeXOrigin * 1000) / 2 + 0.5) < treeDensity) {
                let treeIndex =  Math.floor((Noise.noise(treeXOrigin, 0) / 2 + 0.5) * trees.length);
                const tree = trees[treeIndex];
    
                const treeY = (y - treeYOrigin) * -1 + tree.length
    
                if(tree?.[treeY]?.[treeX]) {
                    const treeBlockType = tree?.[treeY]?.[treeX];
                    if(treeBlockType){
                        blockOnSurface = true;
                    }
                    switch(treeBlockType){
                        case "Leaf": blocks[0] = new Leaf(x, y, this); break;
                        case "Oaklog": blocks[1] = new OakLog(x, y, this); break;
                        case "DarkOakLog": blocks[1] = new DarkOakLog(x, y, this); break;
                    }
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

        for (const ore of ores) {
            if(y < ore.minHeight || y > ore.maxHeight || y > surfaceLevel){
                continue;
            }
            if((noise + ore.offset) % 1 < ore.probability){
                blocks[0] = ore.getBlock();
            }
        }

        if(y > surfaceLevel - 4 * (Noise.noise(x / 10) + 1) && !blockOnSurface){
            blocks[0] = new DirtBlock(x, y, this);
        }
        if(y === surfaceLevel && !blockOnSurface){
            blocks[0] = new GrassBlock(x, y, this);
        }


        function isCave(x ,y){
            const caveCutoff = 0.5;
            const canBeCave = Noise.noise(x / 50, y / 50) / 3 + 0.6 > caveCutoff;
            if(!canBeCave) {
                return false;
            }

            const strength = (surfaceLevel - y) / surfaceLevel + 0.4
            let caveNoise1 = Noise.noise(x / 55, y / 30);
            let caveNoise2 = Noise.noise(x / 65, (y + 300) / 35);
            const margin = 0.25 * strength;
            let cave = false;
            cave = ((caveNoise1 > -margin && caveNoise1 < margin) || (caveNoise2 > -margin && caveNoise2 < margin));
            cave &=  y <= surfaceLevel;
            return cave;
        }
        const cave = isCave(x, y);
        /**
         * caves
         */
        
        /**
         * bedrock
         */
        if(y < 4){
            const influence = (4 - y) / 4;
            if(noise < influence && !blockOnSurface){
                blocks[0] = new Bedrock(x, y, this);
            }
        } else if(cave){
            blocks = [];
        }

        /**
         * filling
         */
        if(blocks.length === 0 && !cave){
            const fillNoise = Noise.noise(x / 20, y / 20);
            if(fillNoise < 0.6){
                blocks[0] = new Stone(x, y, this);
            } else {
                blocks[0] = new Gravel(x, y, this);
            }
        }

        // if(!blocks[1]){
            if(y < surfaceLevel){
                blocks[1] = new CaveBackground(x, y, this);
            }
            // console.log(blocks);
        // }

        for (const block of blocks) {
            const sunLight = this.sunLightAt(surfaceLevel, y)
            if(block) {
                block.sunLight = sunLight;
                block.placed = true;
            }
        }
        return blocks;
    }

    getEntitiesInRadius(x, y, radius, exclude = []){
        const out= [];
        for (const entity of this.entities) {
            if(exclude.includes(entity)){
                continue;
            }
            const distance = entity.hitbox.center.distanceFrom(new Point(x, y))
            if(distance <= radius){
                entity.distance123 = distance;
                out.push(entity);
            }
        }
        sortArray(out, "distance123");
        return out;
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
            if(!this.blockLoaded(entity.pos.x)){
                continue;
            }
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
                    if(!block) continue;
                    block.tick(elapsed);
                    /**
                     * spawning
                     */
                    const maxMonsterLight = 0.3
                    const minfriendlyLight = 0.9;
                    if(this.entities.length > 100) continue;
                    if(Math.random() < 0.01) {
                        if(block.spawnBlock && this.getEntitiesInRadius(block.pos.x, block.pos.y, 20).length === 0) {
                            if(block.light < maxMonsterLight){
                                console.log("spawned monster, " + this.entities.length + "Entities");
                                this.spawnEntity(this.getRandomMonster(block.pos.x, block.pos.y));
                            }
                            if(block.light > minfriendlyLight) {
                                console.log("spawned firnedly Mob, " + this.entities.length + "Entities");
                                this.spawnEntity(this.getRandomFriendlyMob(block.pos.x, block.pos.y));
                            }
                        }
                    }
                }
            }
        }
    }

    getRandomMonster(x, y) {
        const random = Math.random();
        y += 3;
        if(random < 0.5) {
            return new Spider(this.game, x, y);
        } else {
            return new Zombie(this.game, x, y);
        }
    }

    getRandomFriendlyMob(x, y) {
        const random = Math.random();
        y += 1.5;
        if(random < 0.2) {
            return new Cow(this.game, x, y);
        } else if(random < 0.5) {
            return new Chicken(this.game, x, y);
        } else {
            return new Pig(this.game, x, y);
        }
    }

    damageEntities(dmg, x, y, radius, excluding = []){
        for (const entity of this.entities) {
            if(excluding.includes(entity) || !entity.canGetHit()){
                continue;
            }
            if(entity?.hitbox.inRange(x, y, radius)){
                entity.getHit(dmg, x, y);
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
        this.loadChunks(camera.mostLeftBlock, camera.mostRightBlock, camera.mostTopBlock, camera.mostBottomBlock);
        for (let x = camera.mostLeftBlock; x < camera.mostRightBlock; x++) {
            const column = this.columnFromChunksIgnoreUnloaded(x);
            if(!column) continue;
            // console.log(column)
            for (let y = Math.max(0, camera.mostBottomBlock); y < Math.min(this.height, camera.mostTopBlock); y++) {

                if(!column?.[y]) continue;
                const blocks = column[y];

                if(!blocks?.[0]?.solid){
                    blocks?.[1]?.draw(drawer, camera);
                }
                blocks?.[0]?.draw(drawer, camera);
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

    // recalculateLightInRect(startX, startY, width, height){
    //     console.log("width: " + width);
    //     console.log("height: " + height);
    //     console.log("recalculating: " + width * height + " blocks");
    //     for (let x = startX; x <= startX + width; x++) {
    //         for (let y = startY; y >= startX - height; y--) {
    //             const blocks = this.getBlock(x, y);
    //             if(!blocks) continue;
    //             const light = this.getLightAt(x, y);
    //             for (const block of blocks) {
    //                 if(!block) continue;
    //                 block.light = light;
    //             }
    //         }
    //     }
    // }

    destroyBlock(block, layer = 0){
        block.break();
        const column = this.columnFromChunks(block.pos.x);
        if(column[block.pos.y]?.[layer]){
            column[block.pos.y] [layer]= null;
        }
        if(column[block.pos.y]?.length === 0){
            column[block.pos.y] = null;
        }
        const blockAbove = column[block.pos.y + 1];
        if(blockAbove && block.solid) {
            let i = 0;
            for (const block of blockAbove) {
                if(block?.needsSolidBlockBelow) {
                    this.destroyBlock(block, i);
                }
                i++;
            }
        }
        if(this.lightSources.includes(block)){
            this.lightSources.splice(this.lightSources.indexOf(block), 1);
        }
        if(block.emission > 0){
            this.changeLightSource(block.pos.x, block.pos.y, block.emissisonRange, -block.emission);
        }
        this.blockChanged(block.pos.x, block.pos.y);
    }

    blockChanged(x, y){
        if(!this.blockLoaded(x)){
            return;
        }
        if(this.changedBlocks[World.xToIndex(x)] === undefined){
            this.changedBlocks[World.xToIndex(x)] = [];
        }
        const blocks = this.getBlock(x, y);
        this.changedBlocks[World.xToIndex(x)][y] = blocks;
        // this.recalculateLightInRect(x - 5, y + 5, 10, 10);
        this.updateSpawnBlock(x, y + 2);
        this.updateSpawnBlock(x, y + 1);
        this.updateSpawnBlock(x, y);
        this.updateSpawnBlock(x, y - 1);
        this.updateSpawnBlock(x, y - 2);
    }

    mousedown(e){
        console.log("mousedown")
        if(e.button === Panel.RIGHT_CLICK && !this.game.activePlayer.inventory.opened){
            const cursor = this.game.cursor;
            if(cursor){
                const blocks = this.getBlock(cursor.x, cursor.y);
                if(blocks){
                    for (const block of blocks) {
                        if(!block) continue;
                        block.onrightclick(this.game.activePlayer);
                    }
                }
            }
        }
    }

    /**
     * 
     * @param {*} strength can be negative
     */
    changeLightSource(xOrigin, yOrigin, radius, strength) {
        const origin = new Point(xOrigin, yOrigin);
        for (let x = xOrigin - radius; x <= xOrigin + radius; x++) {
            for (let y = yOrigin + radius; y >= yOrigin - radius; y--) {
                const point = new Point(x, y);
                const influence = Math.max(((radius - origin.distanceFrom(point)) / radius), 0);
                const light = influence * strength;
                const blocks = this.getBlockIgnoreUnloaded(x, y);
                if(!blocks) continue;
                for (const block of blocks) {
                    if(!block) continue;
                    block.sourceLight += light;
                }
            }
        }
    }


    getSourceLight(x, y) {
        let light = 0;
        const origin = new Point(x, y);
        const point = new Point(x, y);
        for (const source of this.lightSources) {
            const point = new Point(source.pos.x, source.pos.y);
            const influence = Math.max(((source.emissisonRange - origin.distanceFrom(point)) / source.emissisonRange), 0);
            light += influence * source.emission;
        }
        return light;
    }
}

class DroppedItem extends Entity {

    constructor(item, x, y, game, timeout) {
        super(x - 0.1, y, 0.5, 0.5, item.texture, item.textureMeta, new Hitbox(0,0,0.5, 0.7), game, 0, true, false);
        const randomness = 0.5;
        this.vel.add(new Point(Math.random() * randomness - randomness / 2, Math.random() * randomness - randomness / 2))
        this.droppedTime = game.time;
        this.isCollectible = true;
        this.timeout = timeout;
        this.item = item;
        this.controller = new DroppedItemController(this);
    }

    canITakeYou(){
        return this.game.time - this.droppedTime > this.timeout;
    }
}

class XPPoint extends Entity {

    constructor(x, y, game, timeout) {
        super(x - 0.1, y, 0.5, 0.5, texturepack, textureAtlasMap.xpPoint, new Hitbox(0,0,0.5, 0.7), game, 0, true, false);
        const randomness = 0.5;
        this.gravity = 1;
        this.vel.add(new Point(Math.random() * randomness - randomness / 2, Math.random() * randomness - randomness / 2))
        this.droppedTime = game.time;
        this.timeout = timeout;
        this.controller = new DroppedItemController(this);
    }

    canITakeYou(){
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