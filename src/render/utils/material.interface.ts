import Ray from "./Ray";
import HitRecord from "./HitRecord";
import Vec3 from "./Vec3";


export default interface Material {
    albedo:Vec3,
    scatter: (ray_in: Ray, hitRecord: HitRecord ) => Ray
}