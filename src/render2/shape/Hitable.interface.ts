import Ray from "../base/Ray";
import HitRecord from "./HitRecord";
import Vec3 from "../base/Vec3";

export default interface hitable {
    hit: (
        ray: Ray,
        t_min: number,
        t_max: number
    ) => HitRecord
}