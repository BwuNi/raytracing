import Vec3 from './Vec3'
import Ray from './Ray';

// export default class Camera {

//     origin: Vec3
//     vertical: Vec3
//     horizontal: Vec3
//     leftBottom: Vec3

//     constructor(origin: Vec3, leftBottom: Vec3, horizontal: Vec3, vertical: Vec3) {
//         this.origin = origin
//         this.vertical = vertical
//         this.leftBottom = leftBottom
//         this.horizontal = horizontal
//     }

//     getRay(x: number, y: number): Ray {
//         return new Ray(
//             this.origin,
//             this.leftBottom
//                 .add(this.horizontal.mul(x))
//                 .add(this.vertical.mul(y))
//                 .sub(this.origin))
//     }
// }

export default class Camera{
    
    origin: Vec3
    vertical: Vec3
    horizontal: Vec3
    leftBottom: Vec3

    constructor(vfov:number,aspect:number){
        let theta = vfov*Math.PI/180
        let harf_height = Math.tan(theta/2)
        let harf_width = harf_height * aspect

        this.vertical = new Vec3(0,harf_height*2,0)
        this.horizontal = new Vec3(harf_width*2,0,0)
        this.origin = new Vec3(0,0,0)
        this.leftBottom = new Vec3(-harf_width,-harf_height,0)
    }


    getRay(x: number, y: number): Ray {
        return new Ray(
            this.origin,
            this.leftBottom
                .add(this.horizontal.mul(x))
                .add(this.vertical.mul(y))
                .sub(this.origin))
    }


}