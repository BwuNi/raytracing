import Ray from "./ray";
import HitRecord from "./HitRecord";

export default interface hitable {
    hit: (ray: Ray, t_min: number, t_max: number) => HitRecord 
}