<script>
  import * as LJS from "@node/littlejsengine/dist/littlejs.esm.js";
  const { tile, vec2, hsl } = LJS;

  console.log("== Hero Game ==");

  class Player extends LJS.EngineObject {
    constructor(pos) {
      super(pos, vec2(2), tile(5), 0, RED);
      this.setCollision(); // make object collide
      this.renderOrder = 1; // render player on top
    }

    update() {
      // apply movement controls
      const moveInput = keyDirection().clampLength(1).scale(0.2);
      this.velocity = this.velocity.add(moveInput);

      // move camera with player
      cameraPos = this.pos;
    }
  }

  function gameInit() {
    // setup level
    canvasClearColor = new LJS.hsl(0.3, 0.2, 0.6);
    objectDefaultDamping = 0.7;
    new Player();

    // create collision objects
    for (let i = 300; i--; ) {
      const pos = LJS.randInCircle(15 + i, 7);
      const size = LJS.vec2(rand(4, 9), rand(4, 9));
      const color = LJS.hsl(0.1, 0.5, rand(0.2));
      const o = new LJS.EngineObject(pos, size, 0, 0, color);
      o.setCollision(); // make object collide
      o.mass = 0; // make object have static physics
    }
  }

  // START
  LJS.engineInit(gameInit);
</script>
