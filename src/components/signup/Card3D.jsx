import {Html} from "@react-three/drei"
import {useRef} from "react"
import { useFrame } from "@react-three/fiber"

export default function Card3D( { children } ){
    const meshRef = useRef()

    useFrame(() => {
        meshRef.current.rotation.y += 0.002
    })

    return(
        <mesh ref={meshRef}>
            <boxGeometry args={[8, 5, 0.3]}/>
            <meshStandardMaterial color="white"
            transparent opacity={0.2}/>

            <Html center> {children} </Html>
        </mesh>
    )
}