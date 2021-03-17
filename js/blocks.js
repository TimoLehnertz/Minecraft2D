
const tileWidth = 16;
let texturepack = "atlas1";
//height: 31
//width:  55
const textureAtlasMap = {
    outline: {
        x: 1,
        y: 27,
        width: 1,
        height: 1
    },
    activeFrame: {
        x: 2,
        y: 10,
        width: 2,
        height: 2
    },
    broken: { x: 3, y: 28, width: 1, height: 1 },//x + (level of brokenness - 1),
    steve: {
        x: 0,
        y: 0,
        width: 200 / tileWidth,
        height: 400 / tileWidth
    },
    /**
     * tools
     */
    /**
     * Wood
     */
    woodenAxe: { x: 49, y: 5, width: 1, height: 1},
    woodenHoe: {
        x: 49,
        y: 6,
        width: 1,
        height: 1
    },
    woodenPickaxe: {
        x: 49,
        y: 7,
        width: 1,
        height: 1
    },
    woodenShovel: {
        x: 49,
        y: 8,
        width: 1,
        height: 1
    },
    woodenSword: { x: 49, y: 9, width: 1, height: 1},
    /**
     * stone
     */
    stoneAxe: { x: 48, y: 26, width: 1, height: 1},
    stoneHoe: {
        x: 49,
        y: 27,
        width: 1,
        height: 1
    },
    stonePickaxe: {
        x: 49,
        y: 28,
        width: 1,
        height: 1
    },
    stoneShovel: {
        x: 49,
        y: 29,
        width: 1,
        height: 1
    },
    stoneSword: {
        x: 49,
        y: 30,
        width: 1,
        height: 1
    },
    /**
     * iron
     */
    ironAxe: {
        x: 46,
        y: 28,
        width: 1,
        height: 1
    },
    ironHoe: {
        x: 47,
        y: 0,
        width: 1,
        height: 1
    },
    ironPickaxe: {
        x: 47,
        y: 4,
        width: 1,
        height: 1
    },
    ironShovel: {
        x: 47,
        y: 5,
        width: 1,
        height: 1
    },
    ironSword: {
        x: 47,
        y: 6,
        width: 1,
        height: 1
    },
    /**
     * gold
     */
    goldAxe: {
        x: 46,
        y: 18,
        width: 1,
        height: 1
    },
    goldPickaxe: {
        x: 46,
        y: 23,
        width: 1,
        height: 1
    },
    goldShovel: {
        x: 46,
        y: 24,
        width: 1,
        height: 1
    },
    goldShovel: {
        x: 46,
        y: 25,
        width: 1,
        height: 1
    },
    goldSword: {
        x: 46,
        y: 26,
        width: 1,
        height: 1
    },
    /**
     * dia
     */
    diamondHoe: {
        x: 44,
        y: 18,
        width: 1,
        height: 1
    },
    diamondPickaxe: { x: 43, y: 21, width: 1, height: 1},
    diamondShovel: { x: 43, y: 22, width: 1, height: 1},
    diamondSword: {
        x: 44,
        y: 23,
        width: 1,
        height: 1
    },





    /**
     * blocks
     */
    grass: {
        x: 28,
        y: 31,
        width: 1,
        height: 1
    },
    dirt: {
        x: 14,
        y: 28,
        width: 1,
        height: 1
    },
    cobble: {
        x: 16,
        y: 27,
        width: 1,
        height: 1
    },
    stone: { x: 37, y: 3, width: 1, height: 1},
    diamondAxe: { x: 43, y: 14, width: 1, height: 1},
    /**
     * wood
     */
    oaklog: { x: 33, y: 19, width: 1, height: 1},
    oakPlank: { x: 34, y: 22, width: 1, height: 1},
    darkOakLog: { x: 33, y: 21, width: 1, height: 1},
    darkOakPlank: { x: 34, y: 19, width: 1, height: 1},
    birchLog: { x: 33, y: 15, width: 1, height: 1},
    birchPlank: { x: 34, y: 20, width: 1, height: 1},
    oakSampling: { x: 36, y: 26, width: 1, height: 1},
    darkOakSampling: { x: 36, y: 28, width: 1, height: 1},
    birchSampling: { x: 36, y: 24, width: 1, height: 1},
    /**
     * leaves
     */
    leaf: { x: 0, y: 0, width: 1, height: 1},
    /**
     * ores
     */
    diamondOre: { x: 13, y: 28, width: 1, height: 1},
    redstoneOre: { x: 36, y: 7, width: 1, height: 1},
    coalOre: { x: 14, y: 27, width: 1, height: 1},
    ironOre: { x: 32, y: 27, width: 1, height: 1},
    smaragdOre: { x: 19, y: 29, width: 1, height: 1},
    goldOre: { x: 25, y: 31, width: 1, height: 1},
    diamond: { x: 43, y: 13, width: 1, height: 1},
    smaragd: { x: 44, y: 18, width: 1, height: 1},
    iron: { x: 46, y: 2, width: 1, height: 1},
    gold: { x: 45, y: 20, width: 1, height: 1},
    charCoal: { x: 40, y: 3, width: 1, height: 1},
    coal: { x: 42, y: 9, width: 1, height: 1},
    flint: { x: 45, y: 9, width: 1, height: 1},
    goldBlock: { x: 24, y: 31, width: 1, height: 1},
    diamondBlock: { x: 12, y: 28, width: 1, height: 1},
    ironBlock: { x: 32, y: 26, width: 1, height: 1},
    coalBLock: { x: 27, y: 13, width: 1, height: 1},
    redstone: { x: 48, y: 7, width: 1, height: 1},
    lapis: { x: 44, y: 1, width: 1, height: 1},

     /**
      * stuff
      */
    tnt: { x: 37, y: 23, width: 1, height: 1},
    enchantmentTable: { x: 21, y: 29, width: 1, height: 1},
    craftingtTable: { x: 27, y: 27, width: 1, height: 1},
    flowerPink: { x: 2, y: 30, width: 1, height: 1},
    flowerYellow: { x: 4, y: 30, width: 1, height: 1},
    flowerRed: { x: 8, y: 30, width: 1, height: 1},
    flowerBig: { x: 14, y: 29, width: 1, height: 1},
    ladder: { x: 33, y: 0, width: 1, height: 1},
    obsidian: { x: 34, y: 12, width: 1, height: 1},
    furnanceOff: { x: 17, y: 30, width: 1, height: 1},
    furnanceOn: { x: 18, y: 30, width: 1, height: 1},
    bookshelf: { x: 18, y: 26, width: 1, height: 1},
    mosyCobblestone: { x: 17, y: 27, width: 1, height: 1},
    glowstone: { x: 23, y: 31, width: 1, height: 1},
    bedrock: { x: 11, y: 26, width: 1, height: 1},
    stick: { x: 1, y: 25, width: 1, height: 1},

    /**
     * food
     */
     bread: { x: 39, y: 18, width: 1, height: 1},
     apple: { x: 38, y: 27, width: 1, height: 1},
     goldenApple: { x: 38, y: 28, width: 1, height: 1},
     carrot: { x: 39, y: 27, width: 1, height: 1},

};

class Item extends Panel {

    static CRAFTING_RECIPES = [
        {
            getResult: () => new IronBlock(),
            amount: 1,//optional default 1
            recipe: [
                ["iron", "iron", "iron"],
                ["iron", "iron", "iron"],
                ["iron", "iron", "iron"],
            ]
        }, {
            getResult: () => new CraftingTable(),
            amount: 1,//optional default 1
            recipe: [
                [null, null, null],
                [null, "oakPlank", "oakPlank"],
                [null, "oakPlank", "oakPlank"],
            ]
        },{
            getResult: () => new Furnance(),
            recipe: [
                ["Cobblestone", "Cobblestone", "Cobblestone"],
                ["Cobblestone", null, "Cobblestone"],
                ["Cobblestone", "Cobblestone", "Cobblestone"]
            ],
        }, {
            getResult: () => new OakPlank(),
            recipe: [
                [null, null, null],
                [null, "OakLog", null],
                [null, null, null]
            ],
            amount: 4
        }, {
            getResult: () => new Stick(),
            recipe: [
                [null, null, null],
                [null, "OakPlank", null],
                [null, "OakPlank", null]
            ],
            amount: 4
        }, {
            getResult: () => new WoodenAxe(),
            recipe: [
                [null, "OakPlank", "OakPlank"],
                [null, "stick", "OakPlank"],
                [null, "stick", null]
            ],
        },{
            getResult: () => new WoodenPickaxe(),
            recipe: [
                ["OakPlank", "OakPlank", "OakPlank"],
                [null, "stick", null],
                [null, "stick", null]
            ],
        },{
            getResult: () => new WoodenSword(),
            recipe: [
                [null, "OakPlank", null],
                [null, "OakPlank", null],
                [null, "stick", null]
            ],
        },{
            getResult: () => new WoodenHoe(),
            recipe: [
                [null, "OakPlank", "OakPlank"],
                [null, "stick", null],
                [null, "stick", null]
            ],
        },{
            getResult: () => new WoodenShovel(),
            recipe: [
                [null, "OakPlank", null],
                [null, "stick", null],
                [null, "stick", null]
            ],
        },
    ]

    

    static TYPE_NONE  = -1;
    static TYPE_SHOVEL  = 0;
    static TYPE_PICKAXE = 1;
    static TYPE_AXE     = 2;
    static TYPE_SWORD   = 3;

    static CAN_BREAK_GRASS = 0;
    static CAN_BREAK_STONE = 1;
    static CAN_BREAK_DIAMONDS = 2;
    static CAN_BREAK_OBSIDIAN = 3;

    static EFFICIENCY_HAND = 0.5;
    static EFFICIENCY_WOOD = 0.8;
    static EFFICIENCY_STONE = 1.3;
    static EFFICIENCY_IRON = 2;
    static EFFICIENCY_GOLD = 3;
    static EFFICIENCY_DIAMOND = 4;

    constructor(name, texture, textureMeta, type, setup){
        super(0, 0, 20, 20);
        setup = setup ?? {};
        this.setup = setup;

        this.name = name;
        this.texture = texture ?? texturepack;
        this.textureMeta = textureMeta;
        this.type = type;
     
        this.efficiency = setup.efficiency ?? 1;
        this.maxStack = setup.maxStack ?? 64;
        this.attackDmg = setup.attackDmg ?? 1;
        this.stack = setup.stack ?? 1;
        this.breakLevel = setup.breakLevel ?? 0;
        this.fuel = setup.fuel ?? 0;//for furnance
        this.getFurnanceResult = setup.getFurnanceResult ?? (() => null);//for furnance

        this.dropped = false;
        this.padding = 4;
        this.placed = false;
    }

    draw(drawer, x, y){
        if(!this.visible){
            return;
        }

        drawer.draw(this.texture, x + this.x + this.padding, y + this.y + this.padding, this.width - this.padding * 2, this.height - this.padding * 2, this.textureMeta.x * 16, this.textureMeta.y * 16, this.textureMeta.width * tileWidth, this.textureMeta.height * tileWidth);
        if(this.stack > 1){
            let add = 0;
            if(this.stack < 10){
                add = 4;
            }
            drawer.fillRect(x + this.x + this.width - 20, y + this.y + this.height - 25, 20, 25, "#333A");
            drawer.text(x + this.x + this.width - 20 + add, y + this.y + this.height - 5, this.stack, "20px Arial", "white");
        }
    }

    isStackableWith(item){
        if(!item){
            return false;
        }
        return this.name === item.name;
    }

    stackItem(item){
        const overflow = (this.stack + item.stack) - this.maxStack;
        if(overflow > 0){
            this.stack = this.maxStack;
            item.stack = overflow;
            return item;
        } else {
            this.stack += item.stack;
        }
    }

    clone(){
        const clone = new Item(this.name, this.texture, this.textureMeta, this.type, this.setup);
        clone.x = this.x;
        clone.y = this.y;
        clone.width = this.width;
        clone.height = this.height;
        clone.stack = this.stack;
        clone.fuel = this.fuel;
        return clone;
    }

    static craft(ingredients){
        let countA = Item.countIngredients(ingredients);
        for (const recipe of Item.CRAFTING_RECIPES) {
            const countB = Item.countIngredients(recipe.recipe);
            if(countB !== countA){
                continue;
            }
            for (let xOffset = -3; xOffset <= 3; xOffset++) {
                for (let yOffset = -3; yOffset <= 3; yOffset++) {
                    const offsetted = Item.getOffsetedRecipe(ingredients, xOffset, yOffset);
                    const countA = Item.countIngredients(offsetted);
                    if(countB !== countA){
                        continue;
                    }
                    const match = Item.recipeMatch(recipe.recipe, offsetted);
                    if(match === countB){
                        const res = recipe.getResult();
                        res.stack = recipe.amount ?? 1;
                        console.log("crafting " + res.name);
                        return res;
                    }
                }
            }
        }
        return null;
    }

    static getOffsetedRecipe(recipe, offsetX, offsetY){
        const out = [];
        for (let x = 0; x < recipe.length; x++) {
            out[x] = [];
            for (let y = 0; y < recipe[x].length; y++) {
                const x1 = x + offsetX;
                const y1 = y + offsetY;
                if(x1 >= 0 && x1 < recipe.length && y1 >= 0 && y1 < recipe[x].length) {
                    out[x][y] = recipe[x1][y1];
                } else{
                    out[x][y] = null;
                }
            }
        }
        return out;
    }

    static countIngredients(recipe){
        let count = 0;
        for (const row of recipe) {
            for (const item of row) {
                if(item){
                    count++;
                }
            }
        }
        return count;
    }

    static recipeMatch(a, b){
        let matched = 0;
        for (let x = 0; x < Math.min(a.length, b.length); x++) {
            for (let y = 0; y < Math.min(a[x].length, b[x].length); y++) {
                if(!a[x][y] || !b[x][y]){
                    continue;
                }
                if(a[x][y].toLowerCase() === b[x][y].toLowerCase()){
                    matched++;
                }
            }
        }
        return matched;
    }
}

class Block extends Item {

    constructor(name, x, y, texture, textureMeta, type, world, setup, itemSetup){
        super(name, texture, textureMeta, type, itemSetup);
        this.itemSetup = itemSetup;
        if(setup === undefined){
            setup = {};
        }
        this.setup = setup;

        this.isBlock = true;
        this.pos = new Point(x, y);
        this.world = world;
        this.width = setup.width ?? 1;
        this.height = setup.height ?? 1;
        this.solid = setup.solid ?? true;
        this.visible = setup.visible ?? true;
        this.minTool = setup.minTool ?? 0;
        this.resistance = setup.resistance ?? 100;//minimum 1
        this.canBePlaced = setup.canBePlaced ?? true;
        this.getDrop = setup.getDrop ?? (tool => this);
        this.canBeReplaced = setup.canBeReplaced ?? false;
        this.indestructable = setup.indestructable ?? false;
        this.onrightclick = setup.onrightclick ?? (() => false);
        this.layer = setup.layer ?? 0;
        this.fuel = setup.fuel ?? itemSetup?.fuel ?? 0
        this.getFurnanceResult = setup.getFurnanceResult ?? itemSetup?.getFurnanceResult ?? (() => null);
        
        this.hitbox = setup.hitbox ?? new Hitbox(0, 0, 1, 1);
        this.hitbox.gPosRef = this.pos;
        
        this.border = Math.random() > 0.99;
        this.showHitbox = false;
        this.placed = false;
        this.broken = 0;

    }

    draw(drawer, camera, y) {
        if(!this.placed){
            return super.draw(drawer, camera/**(x) */, y);
        }
        if(!this.visible) {
            return;
        }
        const texName = texturepack;
        const screen = camera.worldToScreen(this.pos, drawer.screen);

        drawer.draw(texName, screen.pos.x, screen.pos.y, screen.size * this.width, screen.size * this.height,
            this.textureMeta.x * tileWidth, this.textureMeta.y * tileWidth, this.textureMeta.width * tileWidth, this.textureMeta.height * tileWidth);

        if(this.border){
            drawer.draw(texName, screen.pos.x, screen.pos.y, screen.size * this.width, screen.size * this.height,
                textureAtlasMap.outline.x * tileWidth, textureAtlasMap.outline.y * tileWidth, textureAtlasMap.outline.width * tileWidth, textureAtlasMap.outline.height * tileWidth);
        }
        if(this.broken > 0){
            this.broken = Math.min(this.broken, 10);
            const broken = parseInt(this.broken);
            drawer.draw(texName, screen.pos.x, screen.pos.y, screen.size * this.width, screen.size * this.height,
                (textureAtlasMap.broken.x + broken - 1) * tileWidth, textureAtlasMap.broken.y * tileWidth, textureAtlasMap.broken.width * tileWidth, textureAtlasMap.broken.height * tileWidth);
        }
        if(this.showHitbox){
            const start = camera.worldToScreen(this.hitbox.topLeft, drawer.screen);
            drawer.rect(start.pos.x, start.pos.y, this.hitbox.width * start.size, this.hitbox.height * start.size);
        }
    }

    tick(elapsed){
        if(!this.getHit){
            this.broken = Math.max(0, this.broken - (1000 / elapsed) * 0.01);
        }
        this.getHit = false;
    }

    hit(elapsed, tool){
        if(this.indestructable){
            return;
        }
        this.getHit = true;
        if(!tool || tool.isBlock){
            tool = new Hand();
        }
        let dmg = 0;
        if(tool.type === this.type){
            dmg = tool.efficiency;
        } else {
            dmg = tool.efficiency / 4;
        }
        dmg /= this.resistance;
        this.broken += dmg * (1000 / elapsed);
        if(this.broken >= 10){
            this.break(tool);
        }
    }

    break(tool){
        if(this.destroyed){
            return;
        }
        const drop = this.getDrop(tool);
        this.placed = false;
        this.destroyed = true;


        this.world.destroyBlock(this);
        const droppedItem = new DroppedItem(drop, this.pos.x + this.width / 2, this.pos.y + this.width / 2, this.world.game, 100);
        droppedItem.vel.y = 4;
        this.world.spawnEntity(droppedItem);
    }

    clone(){
        const cpy = new Block(this.name, this.x, this.y, this.tetxure, this.textureMeta, this.type, this.maxStack, this.world, this.setup, this.itemSetup);
        cpy.stack = this.stack;
        cpy.width = this.width;
        cpy.height = this.height;
        cpy.solid = this.solid;
        cpy.onrightclick = this.onrightclick;
        cpy.fuel = this.fuel;
        cpy.getDrop = this.getDrop;
        return cpy;
    }
}

/**
 * tools
 */
/**
 * wood
 */
 class Hand extends Item {
    constructor(){
        super("Hand", texturepack, textureAtlasMap.hand, Item.TYPE_NONE, {});
    }
}

class WoodenPickaxe extends Item {
    constructor(){
        super("Wooden_pickaxe", texturepack, textureAtlasMap.woodenPickaxe, Item.TYPE_PICKAXE, {
            efficiency: Item.EFFICIENCY_WOOD,
            breakLevel: Item.CAN_BREAK_STONE,
            fuel: 1
        });
    }
}

class WoodenAxe extends Item {
    constructor(){
        super("Wooden_axe", texturepack, textureAtlasMap.woodenAxe, Item.TYPE_AXE, {
            efficiency: Item.EFFICIENCY_WOOD,
            fuel: 1
        });
    }
}

class WoodenShovel extends Item {
    constructor(){
        super("Wooden_shovel", texturepack, textureAtlasMap.woodenShovel, Item.TYPE_SHOVEL, {
            efficiency: Item.EFFICIENCY_WOOD,
            fuel: 1
        });
    }
}

class WoodenSword extends Item {
    constructor(){
        super("Wooden_sword", texturepack, textureAtlasMap.woodenSword, Item.TYPE_SWORD, {
            attackDmg: 3,
            fuel: 1
        });
    }
}

class WoodenHoe extends Item {
    constructor() {
        super("Wooden_hoe", texturepack, textureAtlasMap.woodenHoe, Item.TYPE_HOE, {
            fuel: 1
        });
    }
}

/**
 * stone
 */
class StonePickaxe extends Item {
    constructor(){
        super("Stone_pickaxe", texturepack, textureAtlasMap.stonePickaxe, Item.TYPE_PICKAXE, {
            efficiency: Item.EFFICIENCY_STONE,
            breakLevel: Item.CAN_BREAK_STONE
        });
    }
}

class StoneAxe extends Item {
    constructor(){
        super("Stone_axe", texturepack, textureAtlasMap.stoneAxe, Item.TYPE_AXE, {
            efficiency: Item.EFFICIENCY_STONE,
        });
    }
}

class StoneShovel extends Item {
    constructor(){
        super("Stone_shovel", texturepack, textureAtlasMap.stoneShovel, Item.TYPE_SHOVEL, {
            efficiency: Item.EFFICIENCY_STONE,
        });
    }
}

class StoneSword extends Item {
    constructor(){
        super("Stone_sword", texturepack, textureAtlasMap.stoneSword, Item.TYPE_SWORD, {
            attackDmg: 4
        });
    }
}

class StoneHoe extends Item {
    constructor(){
        super("Wooden_hoe", texturepack, textureAtlasMap.stoneHoe, Item.TYPE_HOE, {
        });
    }
}

/**
 * iron
 */
class IronPickaxe extends Item {
    constructor(){
        super("Iron_pickaxe", texturepack, textureAtlasMap.ironPickaxe, Item.TYPE_PICKAXE, {
            efficiency: Item.EFFICIENCY_IRON,
            breakLevel: Item.CAN_BREAK_DIAMONDS
        });
    }
}

class IronAxe extends Item {
    constructor(){
        super("Iron_axe", texturepack, textureAtlasMap.ironAxe, Item.TYPE_AXE, {
            efficiency: Item.EFFICIENCY_STONE,
        });
    }
}

class IronShovel extends Item {
    constructor(){
        super("Iron_shovel", texturepack, textureAtlasMap.ironShovel, Item.TYPE_SHOVEL, {
            efficiency: Item.EFFICIENCY_IRON,
        });
    }
}

class IronSword extends Item {
    constructor(){
        super("Iron_sword", texturepack, textureAtlasMap.ironSword, Item.TYPE_SWORD, {
            attackDmg: 5
        });
    }
}

class IronHoe extends Item {
    constructor(){
        super("Iron_hoe", texturepack, textureAtlasMap.ironHoe, Item.TYPE_HOE, {
        });
    }
}

/**
 * gold
 */
class GoldPickaxe extends Item {
    constructor(){
        super("Gold_pickaxe", texturepack, textureAtlasMap.goldPickaxe, Item.TYPE_PICKAXE, {
            efficiency: Item.EFFICIENCY_GOLD,
            breakLevel: Item.CAN_BREAK_DIAMONDS
        });
    }
}

class GoldAxe extends Item {
    constructor(){
        super("Gold_axe", texturepack, textureAtlasMap.goldAxe, Item.TYPE_AXE, {
            efficiency: Item.EFFICIENCY_GOLD,
        });
    }
}

class GoldShovel extends Item {
    constructor(){
        super("Gold_shovel", texturepack, textureAtlasMap.goldSword, Item.TYPE_SHOVEL, {
            efficiency: Item.EFFICIENCY_GOLD,
        });
    }
}

class GoldSword extends Item {
    constructor(){
        super("Gold_sword", texturepack, textureAtlasMap.goldSword, Item.TYPE_SWORD, {
            attackDmg: 5
        });
    }
}

class GoldHoe extends Item {
    constructor(){
        super("Gold_hoe", texturepack, textureAtlasMap.goldHoe, Item.TYPE_HOE, {
        });
    }
}

/**
 * diamond
 */
class DiamondPickaxe extends Item {
    constructor(){
        super("Diamond_pickaxe", texturepack, textureAtlasMap.diamondPickaxe, Item.TYPE_PICKAXE, {
            efficiency: Item.EFFICIENCY_DIAMOND,
            breakLevel: Item.CAN_BREAK_OBSIDIAN
        });
    }
}

class DiamondAxe extends Item {
    constructor(){
        super("Diamond_axe", texturepack, textureAtlasMap.diamondAxe, Item.TYPE_AXE, {
            efficiency: Item.EFFICIENCY_DIAMOND,
        });
    }
}

class DiamondShovel extends Item {
    constructor(){
        super("Diamond_shovel", texturepack, textureAtlasMap.diamondShovel, Item.TYPE_SHOVEL, {
            efficiency: Item.EFFICIENCY_DIAMOND,
        });
    }
}

class DiamondSword extends Item {
    constructor(){
        super("Diamond_sword", texturepack, textureAtlasMap.diamondSword, Item.TYPE_SWORD, {
            attackDmg: 7,
        });
    }
}

class DiamondHoe extends Item {
    constructor(){
        super("Diamond_hoe", texturepack, textureAtlasMap.diamondHoe, Item.TYPE_HOE, {
        });
    }
}

/**
 * blocks
 */
class GrassBlock extends Block {
    static NAME = "Grass";
    constructor(x, y, world) {
        super(GrassBlock.NAME, x, y, texturepack, textureAtlasMap.grass, Item.TYPE_SHOVEL, world);
    }
}

class DirtBlock extends Block {
    static NAME = "Dirt";
    constructor(x, y, world) {
        super(DirtBlock.NAME, x, y, texturepack, textureAtlasMap.dirt, Item.TYPE_SHOVEL, world);
    }
}

class Cobblestone extends Block {
    static NAME = "Cobblestone";
    constructor(x, y, world) {
        super(Cobblestone.NAME, x, y, texturepack, textureAtlasMap.cobble, Item.TYPE_PICKAXE, world, {
            resistance: 400,
            minTool: Item.CAN_BREAK_STONE,
            getFurnanceResult: () => new Stone()
        });
    }
}

class Bedrock extends Block {
    constructor(x, y, world) {
        super("Bedrock", x, y, texturepack, textureAtlasMap.bedrock, Item.TYPE_HOE, world, {
            resistance: 1000000000000,
            minTool: 100
        });
    }
}

class Stone extends Block {
    static NAME = "Stone";
    constructor(x, y, world) {
        super(Stone.NAME, x, y, texturepack, textureAtlasMap.stone, Item.TYPE_PICKAXE, world, {
            resistance: 400,
            minTool: Item.CAN_BREAK_STONE,
            getDrop: () => new Cobblestone()
        });
    }
}

class IronOre extends Block {
    static NAME = "Ironore";
    constructor(x, y, world) {
        super(IronOre.NAME, x, y, texturepack, textureAtlasMap.ironOre, Item.TYPE_PICKAXE, world, {
            resistance: 450,
            minTool: Item.CAN_BREAK_STONE,
            getFurnanceResult: () => new Iron()
        });
    }
}

class CoalOre extends Block {
    static NAME = "CoalOre";
    constructor(x, y, world) {
        super(CoalOre.NAME, x, y, texturepack, textureAtlasMap.coalOre, Item.TYPE_PICKAXE, world, {
            resistance: 425,
            minTool: Item.CAN_BREAK_STONE,
            getDrop: (tool) => new Coal()
        });
    }
}

class Redstone extends Block {
    constructor(x, y, world) {
        super("Redstone", x, y, texturepack, textureAtlasMap.redstone, Item.TYPE_PICKAXE, world, {
            resistance: 435,
        });
    }
}

class GoldOre extends Block {
    static NAME = "GoldOre";
    constructor(x, y, world) {
        super(GoldOre.NAME, x, y, texturepack, textureAtlasMap.goldOre, Item.TYPE_PICKAXE, world, {
            resistance: 475,
            minTool: Item.CAN_BREAK_DIAMONDS,
            getFurnanceResult: () => new Gold()
        });
    }
}

class RedstoneOre extends Block {
    static NAME = "RedstoneOre";
    constructor(x, y, world) {
        super(RedstoneOre.NAME, x, y, texturepack, textureAtlasMap.redstoneOre, Item.TYPE_PICKAXE, world, {
            resistance: 475,
            minTool: Item.CAN_BREAK_DIAMONDS,
            getDrop: (tool) => {
                const drop = new Redstone();
                drop.stack = 1 + Math.round(Math.random() * 2);
                return drop;
            }
        });
    }
}

class SmaragdOre extends Block {
    constructor(x, y, world) {
        super("SmaragdOre", x, y, texturepack, textureAtlasMap.smaragdOre, Item.TYPE_PICKAXE, world, {
            resistance: 475,
            minTool: Item.CAN_BREAK_DIAMONDS,
            getDrop: () => new Smaragd()
        });
    }
}

class DiamondOre extends Block {
    static NAME = "DiamondOre";
    constructor(x, y, world) {
        super(DiamondOre.NAME, x, y, texturepack, textureAtlasMap.diamondOre, Item.TYPE_PICKAXE, world, {
            resistance: 525,
            minTool: Item.CAN_BREAK_DIAMONDS,
            getDrop: tool => new Diamond()
        });
    }
}

class Obsidian extends Block {
    static NAME = "Obsidian";
    constructor(x, y, world) {
        super(Obsidian.NAME, x, y, texturepack, textureAtlasMap.obsidian, Item.TYPE_PICKAXE, world, {
            resistance: 1300,
            minTool: Item.CAN_BREAK_OBSIDIAN
        });
    }
}

class CoalBlock extends Block {
    constructor(x, y, world) {
        super("CoalBlock", x, y, texturepack, textureAtlasMap.coalBLock, Item.TYPE_PICKAXE, world, {
            resistance: 400,
            fuel: 80
        });
    }
}

class IronBlock extends Block {
    constructor(x, y, world) {
        super("IronBlock", x, y, texturepack, textureAtlasMap.ironBlock, Item.TYPE_PICKAXE, world, {
            resistance: 400,
        });
    }
}

class DiamondBlock extends Block {
    constructor(x, y, world) {
        super("DiamondBlock", x, y, texturepack, textureAtlasMap.diamondBlock, Item.TYPE_PICKAXE, world, {
            resistance: 400,
        });
    }
}

class SmaragdBlock extends Block {
    constructor(x, y, world) {
        super("SmaragdBlock", x, y, texturepack, textureAtlasMap.smaragdBlock, Item.TYPE_PICKAXE, world, {
            resistance: 400,
        });
    }
}

/**
 * wod
 */
class OakLog extends Block {
    constructor(x, y, world) {
        super("OakLog", x, y, texturepack, textureAtlasMap.oaklog, Item.TYPE_AXE, world, {
            resistance: 100,
            solid: false,
            fuel: 1.5,
            getFurnanceResult: () => new Charcoal()
        });
    }
}

class OakPlank extends Block {
    constructor(x, y, world) {
        super("OakPlank", x, y, texturepack, textureAtlasMap.oakPlank, Item.TYPE_AXE, world, {
            resistance: 100,
            solid: false,
            fuel: 1.5
        });
    }
}

class DarkoakLog extends Block {
    constructor(x, y, world) {
        super("OakLog", x, y, texturepack, textureAtlasMap.darkOakLog, Item.TYPE_AXE, world, {
            resistance: 100,
            solid: false,
            fuel: 1.5,
            getFurnanceResult: () => new Charcoal()
        });
    }
}

class DarkoakPlank extends Block {
    constructor(x, y, world) {
        super("DarkOakPlank", x, y, texturepack, textureAtlasMap.darkOakPlank, Item.TYPE_AXE, world, {
            resistance: 100,
            layer: 1,
            fuel: 1.5
        });
    }
}

class Leaf extends Block {
    constructor(x, y, world) {
        super("Leaf", x, y, texturepack, textureAtlasMap.leaf, Item.TYPE_AXE, world, {
            resistance: 50,
        });
    }
}

/**
 * flowers
 */
class FlowerPink extends Block {
    constructor(x, y, world) {
        super("FlowerPink", x, y, texturepack, textureAtlasMap.flowerPink, Item.TYPE_NONE, world, {
            resistance: 1,
            solid: false,
        });
    }
}

class FlowerRed extends Block {
    constructor(x, y, world) {
        super("FlowerRed", x, y, texturepack, textureAtlasMap.flowerRed, Item.TYPE_NONE, world, {
            resistance: 1,
            solid: false,
        });
    }
}

/**
 * special blocks
 */
class CraftingTable extends Block {
    constructor(x, y, world) {
        super("CraftingTable", x, y, texturepack, textureAtlasMap.craftingtTable, Item.TYPE_AXE, world, {
            resistance: 100,
            solid: false,
            onrightclick: (player) => {
                player.inventory.openCraftingTable();
            },
            fuel: 1.5
        });
    }
}

class Furnance extends Block {
    constructor(x, y, world) {
        super("Furnancee", x, y, texturepack, textureAtlasMap.furnanceOff, Item.TYPE_AXE, world, {
            resistance: 100,
            solid: false
        });
        this.inventory = new FurnanceInventory(this);
        
        this.onrightclick = (player) => {
            player.inventory.open(this.inventory);
        }
        this.fuel = 0;
        this.progress = 0;
        this.maxFuel = 100;
        this.activated = false;
    }

    activate(fuel){
        this.maxFuel = fuel;
        this.activated = true;
        console.log("activating" + Math.random());
        this.fuel = fuel;
        this.textureMeta = textureAtlasMap.furnanceOn;
    }

    deactivate(){
        // console.log("deactivated" + Math.random());
        this.activated = false;
        this.textureMeta = textureAtlasMap.furnanceOff;
    }

    tick(elapsed) {

        this.fuel = Math.max(0, this.fuel - 0.008);

        if(!this.activated){
            this.progress = Math.max(0, this.progress - 0.01);
            return super.tick(elapsed);
        }

        const speed = 0.005;
        if(this.fuel > 0){
            this.progress += speed;

            if(this.progress >= 1){
                this.progress = 0;
                this.inventory.burn();
                this.inventory.update();
        // this.deactivate();
            }
        }
        if(this.fuel <= 0){
            this.progress = Math.max(0, this.progress - 0.01);
            this.deactivate();
            this.inventory.update();
        }
        if(this.fuel <= 0 && this.progress <= 0){
            this.deactivate();
        }
        super.tick(elapsed);
    }

    break(tool) {
        this.textureMeta = textureAtlasMap.furnanceOff;
        this.progress = 0;
        this.fuel = 0;
        this.inventory.dropItems();
        super.break(tool);
    }

    clone(){
        const cpy = new Furnance(this.x, this.y, this.world);
        return cpy;
    }
}

class EnchantingTable extends Block {
    constructor(x, y, world) {
        super("EnchantingTable", x, y, texturepack, textureAtlasMap.enchantingtTable, Item.TYPE_PICKAXE, world, {
            resistance: 500,
            solid: false
        });
    }
}

/**
 * items
 */
class Iron extends Item {
    constructor(){
        super("Iron", texturepack, textureAtlasMap.iron, Item.TYPE_NONE, {});
    }
}

class Coal extends Item {
    constructor(){
        super("Coal", texturepack, textureAtlasMap.coal, Item.TYPE_NONE, {
            fuel: 8
        });
    }
}

class Charcoal extends Item {
    constructor(){
        super("Charcoal", texturepack, textureAtlasMap.charCoal, Item.TYPE_NONE, {
            fuel: 8
        });
    }
}

class Smaragd extends Item {
    constructor(){
        super("Smaragd", texturepack, textureAtlasMap.smaragd, Item.TYPE_NONE, {});
    }
}

class Gold extends Item {
    constructor(){
        super("Gold", texturepack, textureAtlasMap.gold, Item.TYPE_NONE, {});
    }
}

class Diamond extends Item {
    constructor(){
        super("Diamond", texturepack, textureAtlasMap.diamond, Item.TYPE_NONE, {});
    }
}

/**
 * stuff
 */
 class Stick extends Item {
    constructor(){
        super("Stick", texturepack, textureAtlasMap.stick, Item.TYPE_NONE, {
            fuel: 0.5
        });
    }
}