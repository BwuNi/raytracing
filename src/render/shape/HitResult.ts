import Vec3 from "../base/Vec3"
import HitRecord from "./HitRecord";
import Ray from '../base/Ray'

type HitResult = [HitRecord,Ray,number|Vec3]

export default HitResult

