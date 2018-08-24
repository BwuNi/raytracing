import Ray from '../base/Ray'
import HitRecord from '../shape/HitRecord'
import Vec3 from '../base/Vec3';

export default interface Material {
    getNextRay: (rayIn: Ray, hit: HitRecord) => {
		hit:HitRecord
		ray:Ray,
		attenuation:Vec3
	}
}
