import Ray from '../base/Ray'
import HitRecord from '../shape/HitRecord'
import Vec3 from '../base/Vec3';

export default interface Material {
    scatter: (rayIn: Ray, hit: HitRecord) => [Ray,Attenuation]
}

type Attenuation = Vec3

export {
    Attenuation
}

