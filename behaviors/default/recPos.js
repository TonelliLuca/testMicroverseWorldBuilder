class RecPos {
    setup() {
        this.subscribe("obj1", "pos", this.send);
        this.pos = this._translation;
        this.spinning = false; // start without spinning
        this.angle = 0; // the initial angle
        this.spinSpeed = 0.01; // how fast will we spin (in radians)

    }
    step() {
        if (!this.spinning) return;
        this.future(20).step();
        this.angle += this.spinSpeed;
        this.set({ rotation: Microverse.q_euler(0, this.angle, 0) });
        
    }
    send() {
        this.spinning = !this.spinning;
        if (this.spinning) this.step();

    }
    teardown() {
        this.removeEventListener("pointerDown", "toggle");
        this.spinning = undefined;
    }


}

export default {
    modules: [
        {
            name: "recPos",
            pawnBehaviors: [RecPos],
        }
    ]
}