const CRAFTING_RECIPES = [
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
        amount: 1,
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
        
    },{
        getResult: () => new StoneAxe(),
        recipe: [
            [null, "Cobblestone", "Cobblestone"],
            [null, "stick", "Cobblestone"],
            [null, "stick", null]
        ],
        
    },{
        getResult: () => new StonePickaxe(),
        recipe: [
            ["Cobblestone", "Cobblestone", "Cobblestone"],
            [null, "stick", null],
            [null, "stick", null]
        ],

    },{
        getResult: () => new StoneSword(),
        recipe: [
            [null, "Cobblestone", null],
            [null, "Cobblestone", null],
            [null, "stick", null]
        ],

    },{
        getResult: () => new StoneHoe(),
        recipe: [
            [null, "Cobblestone", "Cobblestone"],
            [null, "stick", null],
            [null, "stick", null]
        ],

    },{
        getResult: () => new StoneShovel(),
        recipe: [
            [null, "Cobblestone", null],
            [null, "stick", null],
            [null, "stick", null]
        ],
    },{
        getResult: () => new IronAxe(),
        recipe: [
            [null, "Iron", "Iron"],
            [null, "stick", "Iron"],
            [null, "stick", null]
        ],
        
    },{
        getResult: () => new IronPickaxe(),
        recipe: [
            ["Iron", "Iron", "Iron"],
            [null, "stick", null],
            [null, "stick", null]
        ],

    },{
        getResult: () => new IronSword(),
        recipe: [
            [null, "Iron", null],
            [null, "Iron", null],
            [null, "stick", null]
        ],

    },{
        getResult: () => new IronHoe(),
        recipe: [
            [null, "Iron", "Iron"],
            [null, "stick", null],
            [null, "stick", null]
        ],

    },{
        getResult: () => new IronShovel(),
        recipe: [
            [null, "Iron", null],
            [null, "stick", null],
            [null, "stick", null]
        ],
    },{
        getResult: () => new GoldAxe(),
        recipe: [
            [null, "Gold", "Gold"],
            [null, "stick", "Gold"],
            [null, "stick", null]
        ],
        
    },{
        getResult: () => new GoldPickaxe(),
        recipe: [
            ["Gold", "Gold", "Gold"],
            [null, "stick", null],
            [null, "stick", null]
        ],

    },{
        getResult: () => new GoldSword(),
        recipe: [
            [null, "Gold", null],
            [null, "Gold", null],
            [null, "stick", null]
        ],

    },{
        getResult: () => new GoldHoe(),
        recipe: [
            [null, "Gold", "Gold"],
            [null, "stick", null],
            [null, "stick", null]
        ],

    },{
        getResult: () => new GoldShovel(),
        recipe: [
            [null, "Gold", null],
            [null, "stick", null],
            [null, "stick", null]
        ],
    },{
        getResult: () => new DiamondAxe(),
        recipe: [
            [null, "Diamond", "Diamond"],
            [null, "stick", "Diamond"],
            [null, "stick", null]
        ],
        
    },{
        getResult: () => new DiamondPickaxe(),
        recipe: [
            ["Diamond", "Diamond", "Diamond"],
            [null, "stick", null],
            [null, "stick", null]
        ],

    },{
        getResult: () => new DiamondSword(),
        recipe: [
            [null, "Diamond", null],
            [null, "Diamond", null],
            [null, "stick", null]
        ],

    },{
        getResult: () => new DiamondHoe(),
        recipe: [
            [null, "Diamond", "Diamond"],
            [null, "stick", null],
            [null, "stick", null]
        ],

    },{
        getResult: () => new DiamondShovel(),
        recipe: [
            [null, "Diamond", null],
            [null, "stick", null],
            [null, "stick", null]
        ],
    },{
        getResult: () => new StoneShovel(),
        recipe: [
            [null, "Diamond", null],
            [null, "stick", null],
            [null, "stick", null]
        ],
    },{
        getResult: () => new Torch(),
        recipe: [
            [null, null, null],
            [null, "coal", null],
            [null, "stick", null]
        ],
        amount: 4
    }
]
