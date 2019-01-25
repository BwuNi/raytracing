import Vec3 from './Vec3'
import HitRecord from '../shape/HitRecord'

export default class Ray {
    origin: Vec3
    direction: Vec3
    time:number
    constructor(origin: Vec3, direction: Vec3,time:number) {
        this.origin = origin
        this.time = time
        this.direction = direction
    }

    getPoint(t: number) {
        return this.origin.add(this.direction.mul(t))
    }

    reflect(hit: HitRecord) {
        return new Ray(hit.p, reflect(this.direction.unitVec(), hit.normal),this.time)
    }

    refract(hit: HitRecord,ref:number){
        
        let outWard_normal: Vec3 = hit.normal
        let ni_over_nt: number = ref
        let consine :number = 0

        if (Vec3.dot(this.direction, hit.normal) > 0) {
            outWard_normal = outWard_normal.mul(-1)
            consine = ref*(Vec3.dot(this.direction, hit.normal)) / this.direction.length()
        } else {
            ni_over_nt = 1 / ni_over_nt
            consine = (-1)*(Vec3.dot(this.direction, hit.normal)) / this.direction.length()
        }
        
        const res = refract(this.direction,outWard_normal,ni_over_nt)

        if(res && (Math.random() > schlick(consine,ni_over_nt))) return new Ray(hit.p,res,this.time)
        else return this.reflect(hit)
    }
}


function reflect(v: Vec3, n: Vec3) {
    return v.sub(n.mul(Vec3.dot(v, n) * 2))
}

function refract(v:Vec3,n:Vec3,ni_over_nt:number){

    if(ni_over_nt>1){
        v.sub(1)
    }else{
        v.sub(2)
    }

    const uv = v.unitVec()
    const dt = Vec3.dot(uv,n)
    const discriminant = 1.0 - ni_over_nt **2 *(1- dt**2)

    if(discriminant >0){
        return Vec3.sub(
            uv.sub(n.mul(dt)).mul(ni_over_nt),
            n.mul(discriminant**0.5)
        )
    }else return null
}

function schlick(cosine:number,ref_idx:number):number{
    var r0 = (1-ref_idx)/(1+ref_idx)
    r0 = r0 * r0
    return (r0 + (1+r0) * (1-cosine)**5)
}