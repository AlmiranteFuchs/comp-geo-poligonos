export class Point {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static CounterClockWise(a: Point, b: Point, c: Point) {
        // Calculates cross section between 3 points 
        return (b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y);
    }

    static onSegment(a: Point, b: Point, c: Point): boolean {
        // Return true if point c lies on segment ab
        return Math.min(a.x, b.x) <= c.x && c.x <= Math.max(a.x, b.x) &&
            Math.min(a.y, b.y) <= c.y && c.y <= Math.max(a.y, b.y);
    }

    public static isEndpointOnly(seg: Segment, pt: Point): boolean {
        return (seg.initP.x === pt.x && seg.initP.y === pt.y) ||
            (seg.finalP.x === pt.x && seg.finalP.y === pt.y);
    }


}

export class Segment {
    public initP: Point;
    public finalP: Point;

    constructor(initP: Point, finalP: Point) {
        this.initP = initP;
        this.finalP = finalP;
    }

    public Intersect(b: Segment): boolean {
        const a: Segment = this;

        const d1 = Point.CounterClockWise(a.initP, a.finalP, b.initP);
        const d2 = Point.CounterClockWise(a.initP, a.finalP, b.finalP);
        const d3 = Point.CounterClockWise(b.initP, b.finalP, a.initP);
        const d4 = Point.CounterClockWise(b.initP, b.finalP, a.finalP);

        // Proper intersection: segments cross each other
        if (d1 * d2 < 0 && d3 * d4 < 0) return true;

        // Exclude cases where intersection is a single endpoint
        if (d1 === 0 && Point.onSegment(a.initP, a.finalP, b.initP)) return !Point.isEndpointOnly(a, b.initP);
        if (d2 === 0 && Point.onSegment(a.initP, a.finalP, b.finalP)) return !Point.isEndpointOnly(a, b.finalP);
        if (d3 === 0 && Point.onSegment(b.initP, b.finalP, a.initP)) return !Point.isEndpointOnly(b, a.initP);
        if (d4 === 0 && Point.onSegment(b.initP, b.finalP, a.finalP)) return !Point.isEndpointOnly(b, a.finalP);

        return false;
    }
}

export class Polygon {
    public segments: Segment[];

    constructor(segments: Segment[]) {
        this.segments = segments;
    }

    public toString(): void {
        console.log(`Polygon: with ${this.segments.length} segments: `);
        this.segments.forEach((value: Segment, it: number) => {
            console.log(value.initP, value.finalP);
        },);
        console.log("\n");
    }

    public isSimple(): boolean {
        let isIt = true;
        this.segments.forEach((a: Segment) => {
            this.segments.forEach((b: Segment) => {
                if (a === b) { return; }
                if (a.Intersect(b)) {
                    isIt = false;
                    return;
                }
            });
        });

        return isIt;
    }

    public isConvex(): boolean {
        const points: Point[] = this.segments.map(seg => seg.initP);
    
        if (points.length < 3) return false; // Not a polygon
    
        let direction = 0;
    
        for (let i = 0; i < points.length; i++) {
            const a = points[i];
            const b = points[(i + 1) % points.length];
            const c = points[(i + 2) % points.length];
    
            const cross = Point.CounterClockWise(a, b, c);
    
            if (cross !== 0) {
                if (direction === 0) {
                    direction = cross > 0 ? 1 : -1;
                } else if ((cross > 0 && direction === -1) || (cross < 0 && direction === 1)) {
                    return false;
                }
            }
        }
    
        return true;
    }

    public containsPoint(p: Point): boolean {
        let count = 0;
    
        for (let seg of this.segments) {
            const a = seg.initP;
            const b = seg.finalP;
    
            // Check if the point lies exactly on the segment
            if (Point.CounterClockWise(a, b, p) === 0 && Point.onSegment(a, b, p)) {
                return true;
            }
    
            // Ensure a.y <= b.y
            let p1 = a;
            let p2 = b;
            if (p1.y > p2.y) [p1, p2] = [p2, p1];
    
            // Check if ray from point crosses this segment
            if (p.y > p1.y && p.y <= p2.y && p.x <= Math.max(p1.x, p2.x)) {
                const xinters = (p.y - p1.y) * (p2.x - p1.x) / (p2.y - p1.y + 1e-12) + p1.x;
                if (p.x < xinters) {
                    count++;
                }
            }
        }
    
        return count % 2 === 1;
    }
    
    
}