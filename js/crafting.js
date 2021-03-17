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
    },       
]
