class Point{
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }

    get pos(){
        return this;
    }

    set pos(pos){
        this.x = pos.x;
        this.y = pos.y;
    }

    set(pos){
        this.pos = pos;
    }

    get uniform(){
        const length = this.length;
        return this.clone().divide(new Point(length, length));
    }

    clone(){
        return new Point(this.x, this.y);
    }

    add(p){
        this.x+=p.x;
        this.y+=p.y;
        return this;
    }

    subtract(p){
        this.x-=p.x;
        this.y-=p.y;
        return this;
    }

    divide(p){
        this.x/=p.x;
        this.y/=p.y;
        return this;
    }

    multiply(p){
        this.x*=p.x;
        this.y*=p.y;
        return this;
    }

    distanceFrom(b){
        const x = this.x - b.x;
        const y = this.y - b.y;
        return Math.sqrt(x*x + y*y);
    }

    get length(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

class Panel {

    static LEFT_CLICK = 0;
    static MIDDLE_CLICK = 1;
    static RIGHT_CLICK = 2;

    constructor(x = 0, y = 0, width = 100, height = 100, color = "white"){
        this.color = "white";
        this.children = [];
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.border = true;
        this.image = null;
        this.textureMeta = null;
        this.padding = 0;
        this.borderColor = "black";
        this.centered = false;
        this.visible = true;
        this.gx = x;
        this.gy = y;
        this.mouseInside = false;
    }

    callEvent(name, event, payload){
        // console.log(this.children)
        for (const child of this.children) {
            if(!child){
                continue;
            }
            if(name + "1" in child){
                child[name + "1"](event, payload);
            }
        }
    }

    parseMouse(event){
        return {
            x: event.offsetX,
            y: event.offsetY,
            innerX: event.offsetX - this.globalX,
            innerY: event.offsetY - this.globalY,
        };
    }

    /**
     * event handlers
     */
     wheel1(e){
        //  e.stopPropagation();
        this.callEvent("wheel", e, e.originalEvent.deltaY < 0);
        if("wheel" in this){
            this.wheel(e, e.originalEvent.deltaY < 0);
        }
        return true;
    }

    /**
     * event handlers
     */
    mousemove1(e){
        this.callEvent("mousemove", e, this.parseMouse(e));
        this.mouseInside = false;
        if( e.offsetX > this.gx && e.offsetX < this.gx + this.width &&
            e.offsetY > this.gy && e.offsetY < this.gy + this.height) {
                this.mouseInside = true;
            if("mousemove" in this){
                this.mousemove(e, this.parseMouse(e));
            }
        }
        return true;
    }

    mousedown1(e){
        this.callEvent("mousedown", e, this.parseMouse(e));
        if(this.mouseInside){
            if("mousedown" in this){
                this.mousedown(e, this.parseMouse(e));
            }
        }
        return true;
    }

    mouseup1(e){
        this.callEvent("mouseup", e, this.parseMouse(e));
        if(this.mouseInside){
            if("mouseup" in this){
                this.mouseup(e, this.parseMouse(e));
            }
        }
        return true;
    }

    keydown1(e, keys){
        this.callEvent("keydown", e, keys);
        if(this.mouseInside){
            if("keydown" in this){
                this.keydown(e, keys);
            }
        }
        return true;
    }

    keyup1(e, keys){
        this.callEvent("keyup", e, keys);
        if(this.mouseInside){
            if("keyup" in this){
                this.keyup(e, keys);
            }
        }
        return true;
    }

    draw(drawer, x = 0, y = 0){
        // if("standartColor" in this && Math.random() > 0.99){
        //     console.log(this)
        // }
        if(!this.visible){
            return;
        }
        if(this.centered){
            x = drawer.screen.width / 2 - this.width / 2;
            y = drawer.screen.height / 2 - this.height / 2;
        }
        this.gx = this.x + x;
        this.gy = this.y + y;
        if(this.image === null || this.textureMeta === null){
            drawer.fillRect(this.x + x, this.y + y, this.width, this.height, this.color);
        } else{
            drawer.draw(this.image, this.x + x, this.y + y, this.width, this.height, this.textureMeta.x, this.textureMeta.y, this.textureMeta.width, this.textureMeta.height);
        }
        if(this.border){
            drawer.rect(this.x + x, this.y + y, this.width, this.height, this.borderColor);
        }
        for (const child of this.children) {
            if(!child){
                continue;
            }
            child.draw(drawer, this.x + x + this.padding, this.y + y + this.padding);
        }
    }

    get innerWidth(){
        return this.width - this.padding * 2;
    }

    get innerHeight(){
        return this.height - this.padding * 2;
    }

    get globalX(){
        return this.gx;
    }

    get globalY(){
        return this.gy;
    }

    add(panel){
        if(panel === undefined && panel === null){
            return;
        }
        if(this.children.includes(panel)){
            return;
        }
        this.children.push(panel);
    }

    remove(panel){
        if(panel === undefined || panel === null){
            return;
        }
        if(!this.children.includes(panel)){
            return;
        }
        this.children.splice(this.children.indexOf(panel), 1);
        if(this.children.length > 0){
            this.children.reduce(e => e !== undefined)
        }
    }
}

class Drawer{
    constructor(canvas, textureRoot = $()){
        this.canvas = canvas;
        this.ctx = $(canvas)[0].getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.loadImages(textureRoot);
        // this.draw();
    }

    get screen(){
        return {width: this.ctx.canvas.clientWidth, height: this.ctx.canvas.clientHeight}
    }

    loadImages(parentElem){
        this.textures = {};
        parentElem.children().each((i, e) => {
            const texture = $(e).attr('class').split(' ')[0]
            this.textures[texture] = e;
        });
    }



    clear(){
        this.ctx.clearRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight);
    }

    point(x, y, color = "black"){
        this.ctx.fillStyle = black;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 2, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    rect(x, y, width, height, color = "black"){
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.rect(x, y, width, height);
        this.ctx.stroke();
    }

    fillRect(x, y, width, height, color = "black"){
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    text(x, y, text, font = "15px Arial", color = "black") {
        this.ctx.fillStyle = color
        this.ctx.font = font;
        this.ctx.fillText(text, x, y)
    }

    draw(texture, x, y, width, height, tx = 0, ty = 0, twidth = 16, theight = 16, rotation = 0){
        const screen = this.screen;
        if(x > screen.width || x + width < 0 || y > screen.height || y + height < 0){
            return;
        }
        const round = false;
        if(round){
            x = Math.round(x);
            y = Math.round(y);
            width = Math.round(width);
            height = Math.round(height);
        }
        // if(rotation !== 0){
        //     this.ctx.translate(x + width / 2, y + height / 2);
        //     this.ctx.rotate(rotation);

        //     this.ctx.drawImage(this.textures[texture], tx, ty, twidth, theight, x, y, width, height);

        //     this.ctx.rotate(-rotation);
        //     this.ctx.translate(-(x + width / 2), -(y + height / 2));
        // } else{
            try {
                this.ctx.drawImage(this.textures[texture], tx, ty, twidth, theight, x, y, width + 0.6, height + 0);
            } catch (error) {
                // console.log(texture);
                // console.log(error);

            }
        // }
    }
}