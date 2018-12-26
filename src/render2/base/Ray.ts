import Vec3 from './Vec3'
import HitRecord from '../shape/HitRecord'

export default class Ray {
    origin: Vec3
    direction: Vec3
    constructor(origin: Vec3, direction: Vec3) {
        this.origin = origin
        this.direction = direction
    }

    getPoint(t: number) {
        return this.origin.add(this.direction.mul(t))
    }

    reflect(hit: HitRecord) {
        return new Ray(hit.p, reflect(this.direction.unitVec(), hit.normal))
    }

    refract(hit: HitRecord,ref_idx:number) {
        // let n = hit.normal
        // let ref = ref_idx

        // if(Vec3.dot(this.direction,n)>0 ){
        //     n =n.mul(-1)
        // }else{
        //     ref= 1/ ref
        // }
        
        // const refraction = refract(this.direction, n, ref)

        

        const refraction = refract(this.direction, hit.normal, ref_idx)

        if (refraction) 
            return new Ray(hit.p, refraction)
        else 
            return this.reflect(hit)

    }
}


function reflect(v: Vec3, n: Vec3) {
    return v.sub(n.mul(Vec3.dot(v, n)).mul(2))
}

function refract(v: Vec3, n: Vec3,ni_over_nt:number) {

    
    const uv = v.unitVec()
    const dt = Vec3.dot(uv,n)
    const discriminant = 1.0 - (ni_over_nt**2) * (1 - dt ** 2)

    if(discriminant<0) 
        return null
    else 
        return (
            uv.sub(n.mul(dt))
            .mul(ni_over_nt)
            .sub(n.mul(discriminant ** 0.5))
        )
}

// return Some((uv - n * dt) * ni_over_nt - n * Math.sqrt(discriminant))