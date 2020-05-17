import { glMatrix, vec2 } from "gl-matrix";
import type { Line } from "./levels/level";

export function lineSegmentLineSegmentDistance(
  lineSegmentA: Line,
  lineSegmentB: Line
) {
  // Taken from http://geomalgorithms.com/a07-_distance.html#dist3D_Segment_to_Segment

  let u0 = lineSegmentA.end[0] - lineSegmentA.start[0];
  let v0 = lineSegmentB.end[0] - lineSegmentB.start[0];
  let w0 = lineSegmentB.start[0] - lineSegmentA.start[0];

  let u1 = lineSegmentA.end[1] - lineSegmentA.start[1];
  let v1 = lineSegmentB.end[1] - lineSegmentB.start[1];
  let w1 = lineSegmentB.start[1] - lineSegmentA.start[1];

  let a = u0 * u0 + u1 * u1; // always >= 0
  let b = u0 * v0 + u1 * v1;
  let c = v0 * v0 + v1 * v1; // always >= 0
  let d = u0 * w0 + u1 * w1;
  let e = v0 * w0 + v1 * w1;
  let D = a * c - b * b; // always >= 0
  let sN = 0,
    sD = D; // sc = sN / sD, default sD = D >= 0
  let tN = 0,
    tD = D; // tc = tN / tD, default tD = D >= 0

  // compute the line parameters of the two closest points
  if (D < glMatrix.EPSILON) {
    // the lines are almost parallel
    sN = 0.0; // force using point P0 on segment S1
    sD = 1.0; // to prevent possible division by 0.0 later
    tN = e;
    tD = c;
  } else {
    // get the closest points on the infinite lines
    sN = b * e - c * d;
    tN = a * e - b * d;
    if (sN < 0.0) {
      // sc < 0 => the s=0 edge is visible
      sN = 0.0;
      tN = e;
      tD = c;
    } else if (sN > sD) {
      // sc > 1  => the s=1 edge is visible
      sN = sD;
      tN = e + b;
      tD = c;
    }
  }

  if (tN < 0.0) {
    // tc < 0 => the t=0 edge is visible
    tN = 0.0;
    // recompute sc for this edge
    if (-d < 0.0) sN = 0.0;
    else if (-d > a) sN = sD;
    else {
      sN = -d;
      sD = a;
    }
  } else if (tN > tD) {
    // tc > 1  => the t=1 edge is visible
    tN = tD;
    // recompute sc for this edge
    if (-d + b < 0.0) sN = 0;
    else if (-d + b > a) sN = sD;
    else {
      sN = -d + b;
      sD = a;
    }
  }
  // finally do the division to get sc and tc
  let sc = Math.abs(sN) < glMatrix.EPSILON ? 0.0 : sN / sD;
  let tc = Math.abs(tN) < glMatrix.EPSILON ? 0.0 : tN / tD;

  // get the difference of the two closest points
  // =  S1(sc) - S2(tc)
  return Math.hypot(w0 + sc * u0 - tc * v0, w1 + sc * u1 - tc * v1); // return the closest distance
}

export function lineSegmentPointDistance(lineSegment: Line, point: vec2) {
  let p1x = point[0] - lineSegment.start[0];
  let p1y = point[1] - lineSegment.start[1];

  let l1x = lineSegment.end[0] - lineSegment.start[0];
  let l1y = lineSegment.end[1] - lineSegment.start[1];
  let lineLength = Math.hypot(l1x, l1y);
  let distanceAlongLine = (p1x * l1x + p1y * l1y) / lineLength;
  // Range 0 - 1 along line
  let t = Math.max(0, Math.min(1, distanceAlongLine));
  // Find the closest point on the line ==> Vector to the actual point
  let v1x = p1x - l1x * t;
  let v1y = p1y - l1y * t;
  return Math.hypot(v1x, v1y);
}
