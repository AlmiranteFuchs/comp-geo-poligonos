import getStdin from "get-stdin";
import { Point, Polygon, Segment } from './src/Geometry';

async function main() {
    let currLine: number = 0;

    const input = await getStdin();
    const lines = input.trim().split('\n');

    const totalPolyCount: number = parseInt(lines[0].split(' ')[0]);
    const pointsToFindCount: number = parseInt(lines[0].split(' ')[1]);
    currLine++;

    let polygons: Polygon[] = [];

    // console.log(`polyCount: ${totalPolyCount}, pointCount: ${pointsToFindCount}`);

    // Read n polygons
    for (let polygonsI = 0; polygonsI < totalPolyCount; polygonsI++) {

        // Read the points of this polygon
        const polyPointsCount: number = parseInt(lines[currLine].trim());
        currLine++;

        // console.log(`Reading ${polyPointsCount} Points`);

        let segments: Segment[] = [];

        for (let polyPoints = 0; polyPoints < polyPointsCount - 1; polyPoints++) {
            let localNextLine = currLine;

            const point1: number = parseInt(lines[localNextLine].split(' ')[0]);
            const point2: number = parseInt(lines[localNextLine].split(' ')[1]);
            localNextLine++;

            const point3: number = parseInt(lines[localNextLine].split(' ')[0]);
            const point4: number = parseInt(lines[localNextLine].split(' ')[1]);
            localNextLine++;

            segments.push(new Segment(new Point(point1, point2), new Point(point3, point4)));

            // console.log(point1, point2, point3, point4);

            currLine++;
        }
        currLine++;
        // console.log(segments[segments.length - 1].finalP, segments[segments.length - (polyPointsCount - 1)].initP);

        segments.push(new Segment(segments[segments.length - 1].finalP, segments[segments.length - (polyPointsCount - 1)].initP));

        // console.log("\n");

        polygons.push(new Polygon(segments));

        console.log(`${polygonsI + 1} ${polygons[polygonsI].isSimple() ? 'simples' : 'nao simples'} e ${polygons[polygonsI].isConvex() ? 'convexo' : 'nao convexo'}`)
    }

    for (let i = 0; i < pointsToFindCount; i++) {
        const x: number = parseInt(lines[currLine].split(' ')[0]);
        const y: number = parseInt(lines[currLine].split(' ')[1]);

        currLine++;

        let out: string = `${i + 1}:`;
        polygons.forEach((poly, l) => {
            if (poly.containsPoint(new Point(x, y))) {
                out += `${l + 1} `;
            }
        });
        console.log(out);
    }

}

main();
