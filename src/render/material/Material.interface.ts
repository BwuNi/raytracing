import Ray from '../base/Ray'
import HitRecord from '../shape/HitRecord'
import Vec3 from '../base/Vec3';
import HitResult from '../shape/HitResult';

export default interface Material {
    getNextRay: (rayIn: Ray, hit: HitRecord) => HitResult
}
