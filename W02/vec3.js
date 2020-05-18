class Vec3 {
    // Constructor
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    // Add method
    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }
    // Sum method
    sum() {
        return this.x + this.y + this.z;
    }
    min() {
        let a = [this.x, this.y, this.z];
        a.sort( (a, b) => a-b );
        return a[0];
    }
    max() {
        let a = [this.x, this.y, this.z];
        a.sort( (a, b) => a-b );
        return a[a.length-1];
    }
    mid() {
        let a = [this.x, this.y, this.z];
        a.sort( (a, b) => a-b );
        return a[(a.length-1)/2];
    }
}