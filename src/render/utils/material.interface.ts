import Ray from "./ray";
import HitRecord from "./HitRecord";
import Vec3 from "./Vec3";


export default interface Material {
    scatter: (ray_in: Ray, hitRecord: HitRecord ) => Ray
}