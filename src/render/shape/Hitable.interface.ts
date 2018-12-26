import Ray from "../base/Ray";
import HitRecord from "./HitRecord";
import Vec3 from "../base/Vec3";
import Material from '../material/Material.interface'
import HitResult from "./HitResult";

export default interface hitable {

	material?:Material
    nextRay: (
        ray: Ray,
        t_min: number,
        t_max: number
    ) => HitResult
}