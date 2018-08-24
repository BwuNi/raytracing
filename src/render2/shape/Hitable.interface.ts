import Ray from "../base/Ray";
import HitRecord from "./HitRecord";
import Vec3 from "../base/Vec3";
import Material from '../material/Material.interface'

export default interface hitable {

	material?:Material
    hit: (
        ray: Ray,
        t_min: number,
        t_max: number
    ) => {
		hit:HitRecord
		ray:Ray,
		attenuation:Vec3
	}
}