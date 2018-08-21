import Ray from "./Ray";
import HitRecord from "./HitRecord";
import Vec3 from "./Vec3";

export default interface hitable {
    hit: (ray: Ray, t_min: number, t_max: number) => {hit:HitRecord ,rayOut:Ray,attenuation:Vec3}
}